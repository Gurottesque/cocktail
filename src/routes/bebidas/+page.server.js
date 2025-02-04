import { supabase } from '$lib/supabaseClient';

export async function load() {
  // Obtener bebidas con sus ingredientes
  const { data: drinks } = await supabase
    .from('drinks')
    .select(`
      *,
      drink_craft(
        product_id,
        product_quantity,
        products(name)
      )
    `);

  // Obtener todos los productos
  const { data: products } = await supabase
    .from('products')
    .select('*');

  return {
    drinks: drinks.map(d => ({
      ...d,
      ingredients: d.drink_craft.map(i => ({
        product_id: i.product_id,
        name: i.products.name,
        product_quantity: i.product_quantity
      }))
    })),
    products
  };
}