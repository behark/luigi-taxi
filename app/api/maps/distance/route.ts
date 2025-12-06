import { NextRequest, NextResponse } from 'next/server';
import { calculateDistance } from '@/services/maps';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination } = body;

    if (!origin || !destination) {
      return NextResponse.json(
        { success: false, error: 'Origin and destination are required' },
        { status: 400 }
      );
    }

    const result = await calculateDistance(origin, destination);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Distance API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to calculate distance' },
      { status: 500 }
    );
  }
}
