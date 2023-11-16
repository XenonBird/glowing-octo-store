import { NextResponse } from 'next/server';

export async function POST(request) {
  const response = NextResponse.json(
    { message: 'Logout succeed' },
    { status: 200 }
  );

  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date().getTime() - 1000,
  });
  response.cookies.set('username', '', {
    httpOnly: true,
    expires: new Date().getTime() - 1000,
  });
  return response;
}
