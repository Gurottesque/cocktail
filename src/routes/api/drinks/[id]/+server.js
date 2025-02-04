import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
  const { data: drink, error } = await supabase
    .from('drinks')
    .select('*')
    .eq('id', params.id)
    .single();

  const { data: ingredients } = await supabase
    .from('drink_craft')
    .select('products(name, id), product_quantity')
    .eq('drink_id', params.id);

  return json({ 
    ...drink, 
    ingredients: ingredients.map(i => ({
      name: i.products.name,
      product_quantity: i.product_quantity,
      product_id: i.products.id
    }))
  });
}

export async function PUT({ request, params }) {
  const { drinkData, ingredients } = await request.json();

  const { error } = await supabase
    .from('drinks')
    .update(drinkData)
    .eq('id', params.id);

  await supabase
    .from('drink_craft')
    .delete()
    .eq('drink_id', params.id);

  const { error: craftError } = await supabase
    .from('drink_craft')
    .insert(ingredients.map(i => ({
      drink_id: params.id,
      product_id: i.product_id,
      product_quantity: i.quantity
    })));

  return json({ success: !error && !craftError });
}

export async function DELETE({ params }) {
  const { error } = await supabase
    .from('drinks')
    .delete()
    .eq('id', params.id);

  return json({ success: !error });
}