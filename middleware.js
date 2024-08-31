import { NextResponse } from 'next/server';
import NextCors from 'nextjs-cors';
export async  function middleware(request) {
  NextCors()

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}

