import { NextResponse } from 'next/server';

export async function GET(request) {
  const response = NextResponse.json(
    { message: 'Logout succeed' },
    { status: 200 }
  );

  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date().getTime(),
  });
  response.cookies.set('username', '', {
    httpOnly: true,
    expires: new Date().getTime(),
  });
  return response;
}
