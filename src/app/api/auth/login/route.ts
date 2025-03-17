// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

const IDP_URL = process.env.IDP_URL || 'http://localhost:3000';

export async function GET(request: NextRequest) {
  // Generate a state parameter for CSRF protection
  const state = Math.random().toString(36).substring(2, 15);
  
  // Get the callback URL for the Service Provider
  const callbackUrl = `${process.env.SP_URL || 'http://localhost:3001'}/api/auth/callback`;
  
  // Construct the redirect URL to the IdP
  const redirectUrl = `${IDP_URL}/api/sso/initiate?callbackUrl=${encodeURIComponent(callbackUrl)}&state=${state}`;
  
  // Return a redirect response
  return NextResponse.redirect(redirectUrl);
}