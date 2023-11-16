import { NextResponse } from 'next/server';

export async function POST(request) {
  const response = NextResponse.json(
    { message: 'Logout succeed' },
    { status: 200 }
  );

  response.cookies.set('token', '');
  response.cookies.set('username', '');
  return response;
}
