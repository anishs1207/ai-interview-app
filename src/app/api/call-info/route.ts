// app/api/call-info/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest, res: NextResponse) {
    const response = await axios.get('https://api.vapi.ai/call/', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PRIVATE_VAPI_API_KEY}`,
      },
    });

    return NextResponse.json(response.data)
  }

  // app/api/call-info/route.ts (you can rename to remove dynamic [id] if not needed)

export async function DELETE(req: NextRequest) {
  try {
    const id = req.headers.get('callId');

    console.log("id", id)

    console.log('Received call ID from headers:', id);

    if (!id) {
      return NextResponse.json({ error: 'Missing call Id in headers' }, { status: 400 });
    }

    const response = await axios.delete(`https://api.vapi.ai/call/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PRIVATE_VAPI_API_KEY}`,
      },
    });

    console.log('Deleted call:', response.data);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error deleting call:', error?.response?.data || error);
    return NextResponse.json(
      { error: error?.response?.data || 'Something went wrong' },
      { status: error?.response?.status || 500 }
    );
  }
}



