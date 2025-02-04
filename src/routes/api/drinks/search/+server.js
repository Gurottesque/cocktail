import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const query = url.searchParams.get('q') || '';
  const isNumeric = !isNaN(query);

  let queryBuilder = supabase
    .from('drinks')
    .select('*')
    .ilike('name', `%${query}%`)
    .limit(10);

  if (isNumeric) {
    queryBuilder = queryBuilder.or(`id.eq.${query}`);
  }

  const { data } = await queryBuilder;
  return json(data);
}