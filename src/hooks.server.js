import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

const SESSION_COOKIE_NAME = 'session_token';

export async function handle({ event, resolve }) {
  // Obtener la sesión de la cookie
  const session = event.cookies.get(SESSION_COOKIE_NAME);

  // Verificar si hay una sesión activa
  if (session) {
    // Obtener el usuario desde Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session)
      .single();

    // Si el usuario existe, agregarlo a event.locals
    if (user && !error) {
      event.locals.user = user;
    }
  }

  // Redireccionar si el usuario está autenticado y trata de acceder a /login
  if (event.url.pathname.startsWith('/login')) {
    if (event.locals.user) throw redirect(302, '/');
  } 
  // Redireccionar si el usuario no está autenticado y trata de acceder a otras rutas
  else {
    if (!event.locals.user) throw redirect(302, '/login');
  }

  // Continuar con la solicitud
  return await resolve(event);
}