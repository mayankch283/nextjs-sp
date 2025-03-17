// src/lib/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const IDP_URL = process.env.IDP_URL || 'http://localhost:3000';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function getAuthCookie(req: NextApiRequest) {
  const cookies = cookie.parse(req.headers.cookie || '');
  return cookies.session || null;
}

export function setAuthCookie(res: NextApiResponse, token: string) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      path: '/',
      maxAge: 3600, // 1 hour
    })
  );
}

export function verifyLocalToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function verifyTokenWithIdP(token: string) {
  try {
    const response = await axios.post(`${IDP_URL}/api/auth/verify`, { token });
    return response.data;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export function redirectToIdP(res: NextApiResponse, originalUrl: string) {
  const state = Math.random().toString(36).substring(2, 15);
  const callbackUrl = `${process.env.SP_URL}/api/auth/callback`;
  res.redirect(
    `${IDP_URL}/api/sso/initiate?callbackUrl=${encodeURIComponent(callbackUrl)}&state=${state}`
  );
}