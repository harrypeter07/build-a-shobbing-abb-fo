import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { INITIAL_SHOES } from '@/data/mockShoes';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        success: false,
        message: 'MongoDB is not connected. Serving static catalog.',
        count: INITIAL_SHOES.length,
      });
    }

    await Product.deleteMany({});
    const inserted = await Product.insertMany(INITIAL_SHOES);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${inserted.length} kicks into MongoDB.`,
      count: inserted.length,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
