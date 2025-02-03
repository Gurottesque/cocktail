import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
  cookies.delete('session_token', { path: '/' });
  return json({ success: true });
}