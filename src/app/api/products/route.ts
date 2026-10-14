import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { INITIAL_SHOES } from '@/data/mockShoes';
import { Shoe } from '@/types/shoe';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const category = searchParams.get('category') || 'All';
    const brand = searchParams.get('brand') || 'All';
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice')) || 10000;
    const sort = searchParams.get('sort') || 'featured';
    const badge = searchParams.get('badge') || '';
    const size = searchParams.get('size') ? Number(searchParams.get('size')) : null;

    let shoes: Shoe[] = [];
    const conn = await connectToDatabase();

    if (conn) {
      try {
        const count = await Product.countDocuments();
        if (count === 0) {
          // Auto-seed if database is empty
          await Product.insertMany(INITIAL_SHOES);
        }

        const query: any = {};
        if (category && category !== 'All') {
          query.category = category;
        }
        if (brand && brand !== 'All') {
          query.brand = brand;
        }
        if (badge) {
          query.badge = badge;
        }
        if (size) {
          query.sizes = size;
        }
        query.price = { $gte: minPrice, $lte: maxPrice };

        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { brand: { $regex: search, $options: 'i' } },
            { technology: { $in: [new RegExp(search, 'i')] } },
          ];
        }

        let sortOption: any = { isFeatured: -1, createdAt: -1 };
        if (sort === 'price-asc') sortOption = { price: 1 };
        if (sort === 'price-desc') sortOption = { price: -1 };
        if (sort === 'rating') sortOption = { rating: -1 };
        if (sort === 'newest') sortOption = { releaseYear: -1, createdAt: -1 };

        const dbShoes = await Product.find(query).sort(sortOption).lean();
        shoes = dbShoes.map((item: any) => ({
          ...item,
          id: item._id ? item._id.toString() : item.id,
        }));
      } catch (dbErr) {
        console.warn('MongoDB query failed, falling back to mock dataset:', dbErr);
        shoes = filterMockShoes(INITIAL_SHOES, { search, category, brand, minPrice, maxPrice, sort, badge, size });
      }
    } else {
      shoes = filterMockShoes(INITIAL_SHOES, { search, category, brand, minPrice, maxPrice, sort, badge, size });
    }

    return NextResponse.json({
      success: true,
      count: shoes.length,
      data: shoes,
    });
  } catch (error: any) {
    console.error('API /api/products error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch products',
        data: INITIAL_SHOES,
      },
      { status: 500 }
    );
  }
}

function filterMockShoes(allShoes: Shoe[], filters: any): Shoe[] {
  let result = [...allShoes];

  if (filters.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(s) ||
        item.brand.toLowerCase().includes(s) ||
        item.description.toLowerCase().includes(s) ||
        item.technology.some((t) => t.toLowerCase().includes(s))
    );
  }

  if (filters.category && filters.category !== 'All') {
    result = result.filter((item) => item.category === filters.category);
  }

  if (filters.brand && filters.brand !== 'All') {
    result = result.filter((item) => item.brand === filters.brand);
  }

  if (filters.badge) {
    result = result.filter((item) => item.badge === filters.badge);
  }

  if (filters.size) {
    result = result.filter((item) => item.sizes.includes(filters.size));
  }

  result = result.filter((item) => item.price >= filters.minPrice && item.price <= filters.maxPrice);

  if (filters.sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (filters.sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (filters.sort === 'newest') {
    result.sort((a, b) => b.releaseYear - a.releaseYear);
  } else {
    result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    if (conn) {
      const newShoe = await Product.create(body);
      return NextResponse.json({ success: true, data: newShoe }, { status: 201 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: `custom-${Date.now()}`,
        ...body,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
