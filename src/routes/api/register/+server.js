import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function GET() {
  const { data } = await supabase
    .from('register')
    .select(`
      id,
      bought_at,
      drinks(name, price)
    `)
    .gte('bought_at', new Date().toISOString().split('T')[0]);

  return json(data.map(sale => ({
    id: sale.id,
    bought_at: sale.bought_at,
    drink_name: sale.drinks.name,
    price: sale.drinks.price
  })));
}

export async function POST({ request }) {
  const { drinkId } = await request.json();
  
  const { data: sale } = await supabase
    .from('register')
    .insert({ drink_id: drinkId })
    .select()
    .single();

  const { data: ingredients } = await supabase
    .from('drink_craft')
    .select('product_id, product_quantity')
    .eq('drink_id', drinkId);

  await Promise.all(ingredients.map(async ({ product_id, product_quantity }) => {
    await supabase.rpc('update_product_quantity', {
      product_id,
      quantity_change: -1,
      total_change: -product_quantity
    });
  }));

  return json({ id: sale.id });
}

export async function DELETE({ params }) {
  const { data: sale } = await supabase
    .from('register')
    .select('drink_id')
    .eq('id', params.id)
    .single();

  const { data: ingredients } = await supabase
    .from('drink_craft')
    .select('product_id, product_quantity')
    .eq('drink_id', sale.drink_id);

  await Promise.all(ingredients.map(async ({ product_id, product_quantity }) => {
    await supabase.rpc('update_product_quantity', {
      product_id,
      quantity_change: 1,
      total_change: product_quantity
    });
  }));

  await supabase
    .from('register')
    .delete()
    .eq('id', params.id);

  return json({ success: true });
}