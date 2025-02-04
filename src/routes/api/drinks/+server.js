import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function GET() {
  const { data } = await supabase.from('drinks').select('*');
  return json(data);
}

export async function POST({ request }) {
  const { drinkData, ingredients } = await request.json();
  
  const { data: drink, error } = await supabase
    .from('drinks')
    .insert(drinkData)
    .select()
    .single();

  const { error: craftError } = await supabase
    .from('drink_craft')
    .insert(ingredients.map(i => ({
      drink_id: drink.id,
      product_id: i.product_id,
      product_quantity: i.quantity
    })));

  return json(
    { id: drink.id }, 
    { status: craftError ? 400 : 201 }
  );
}