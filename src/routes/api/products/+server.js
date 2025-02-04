import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function GET() {
  const { data } = await supabase.from('products').select('*');
  return json(data);
}

export async function POST({ request }) {
  const data = await request.json();
  data.total_quantity = data.quantity * data.unit_quantity;

  const { data: product, error } = await supabase
    .from('products')
    .insert(data)
    .select()
    .single();

  return json(
    { id: product.id }, 
    { status: error ? 400 : 201 }
  );
}