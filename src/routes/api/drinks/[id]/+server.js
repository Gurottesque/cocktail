import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
  const { data: drinks } = await supabase
    .from('drinks')
    .select(`
      *,
      drink_craft(
        product_id,
        product_quantity,
        products(name, buy_price, unit_quantity)
      )
    `);

  const { data: products } = await supabase
    .from('products')
    .select('*');

  return {
    drinks: drinks.map(d => ({
      ...d,
      ingredients: d.drink_craft.map(i => ({
        product_id: i.product_id,
        name: i.products.name,
        product_quantity: i.product_quantity,
        buy_price: i.products.buy_price,         // Nuevo
        unit_quantity: i.products.unit_quantity  // Nuevo
      }))
    })),
    products
  };
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