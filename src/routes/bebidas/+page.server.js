import db from '$lib/db';

export async function load() {
  const drinks = db.prepare(`
    SELECT d.*,
    JSON_GROUP_ARRAY(JSON_OBJECT(
      'product_id', dc.product_id,
      'name', p.name,
      'product_quantity', dc.product_quantity
    )) as ingredients
    FROM drinks d
    LEFT JOIN drink_craft dc ON d.id = dc.drink_id
    LEFT JOIN products p ON dc.product_id = p.id
    GROUP BY d.id
  `).all();

  const products = db.prepare('SELECT * FROM products').all();

  return {
    drinks: drinks.map(d => ({
      ...d,
      ingredients: d.ingredients ? JSON.parse(d.ingredients) : []
    })),
    products
  };
}