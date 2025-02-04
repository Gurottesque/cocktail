import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

const SESSION_COOKIE_NAME = 'session_token';

// hooks.server.js
export async function handle({ event, resolve }) {
  const session = event.cookies.get(SESSION_COOKIE_NAME);

  if (session) {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session)
      .single();

    if (user && !error) {
      event.locals.user = user;
    }
  }

  // Permitir acceso a /login y rutas de API sin autenticación
  if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/api')) {
    if (event.url.pathname.startsWith('/login') && event.locals.user) {
      throw redirect(302, '/');
    }
    // No redirigir rutas de API
  } else {
    if (!event.locals.user) {
      throw redirect(302, '/login');
    }
  }

  return await resolve(event);
}