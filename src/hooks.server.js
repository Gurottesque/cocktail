import { redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import bcrypt from 'bcrypt';

const SESSION_SECRET = import.meta.env.VITE_API_KEY.SESSION_SECRET
const SESSION_COOKIE_NAME = 'session_token';

export async function handle({ event, resolve }) {
  const session = event.cookies.get(SESSION_COOKIE_NAME);
  
  if (session) {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(session);
    if (user) event.locals.user = user;
  }

  if (event.url.pathname.startsWith('/login')) {
    if (event.locals.user) throw redirect(302, '/');
  } else {
    if (!event.locals.user) throw redirect(302, '/login');
  }

  return await resolve(event);
}