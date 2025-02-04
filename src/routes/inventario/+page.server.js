import { supabase } from '$lib/supabaseClient';

export async function load() {
  const { data: products } = await supabase
    .from('products')
    .select('*');

  return { products };
}