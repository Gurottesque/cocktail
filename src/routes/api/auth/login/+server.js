import { json, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { db } from '$lib/db';

export async function POST({ request, cookies }) {
  const { username, password } = await request.json();
  
  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    cookies.set('session_token', user.id, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 día
    });

    return json({ success: true });
  } catch (error) {
    return json({ error: 'Error en el servidor' }, { status: 500 });
  }
}