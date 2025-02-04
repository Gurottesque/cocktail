import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function PUT({ request, params }) {
  const data = await request.json();
  data.total_quantity = data.quantity * data.unit_quantity;

  const { error } = await supabase
    .from('products')
    .update(data)
    .eq('id', params.id);

  return json({ success: !error });
}

export async function DELETE({ params }) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', params.id);

  return json({ success: !error });
}