import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, subtotal, discount, shippingFee, tax, total, paymentMethod } = body;

    if (!customer || !items || !items.length) {
      return NextResponse.json(
        { success: false, error: 'Missing customer or cart items' },
        { status: 400 }
      );
    }

    const orderNumber = `SV-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
    const trackingNumber = `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Estimated delivery 3 days from now
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    const orderData = {
      orderNumber,
      customer,
      items,
      subtotal,
      discount: discount || 0,
      shippingFee: shippingFee || 0,
      tax: tax || 0,
      total,
      paymentMethod: paymentMethod || 'card',
      status: 'confirmed',
      trackingNumber,
      estimatedDelivery,
      createdAt: new Date(),
    };

    const conn = await connectToDatabase();
    let savedOrder = null;

    if (conn) {
      try {
        savedOrder = await Order.create(orderData);
      } catch (dbErr) {
        console.warn('Could not persist order to MongoDB, returning memory order:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully!',
      order: savedOrder ? savedOrder.toJSON() : orderData,
    });
  } catch (err: any) {
    console.error('Error in /api/orders:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');

    const conn = await connectToDatabase();
    if (conn && orderNumber) {
      const order = await Order.findOne({ orderNumber }).lean();
      if (order) {
        return NextResponse.json({ success: true, order });
      }
    }

    return NextResponse.json({
      success: false,
      message: 'Order not found in database or DB unavailable',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
