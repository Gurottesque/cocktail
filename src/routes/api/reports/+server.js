import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const params = {
    drink: url.searchParams.get('drink'),
    startDate: url.searchParams.get('startDate'),
    endDate: url.searchParams.get('endDate'),
    timeRange: url.searchParams.get('timeRange')
  };

  let query = supabase
    .from('register')
    .select(`
      id,
      bought_at,
      drinks(name, price)
    `);

  if (params.drink) {
    query = query.ilike('drinks.name', `%${params.drink}%`);
  }

  if (params.startDate && params.endDate) {
    query = query
      .gte('bought_at', params.startDate)
      .lte('bought_at', params.endDate);
  }

  if (params.timeRange) {
    const now = new Date();
    switch(params.timeRange) {
      case 'today':
        query = query.gte('bought_at', now.toISOString().split('T')[0]);
        break;
      case 'week':
        const startWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        query = query.gte('bought_at', startWeek.toISOString());
        break;
      case 'month':
        query = query.gte('bought_at', new Date(now.getFullYear(), now.getMonth(), 1).toISOString());
        break;
    }
  }
  
  const { data } = await query.order('bought_at', { ascending: false }).limit(500);
  
  return json(data.map(r => ({
    id: r.id,
    bought_at: new Date(r.bought_at).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }),
    drink_name: r.drinks.name,
    price: r.drinks.price
  })));
}