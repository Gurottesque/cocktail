import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET() {
  const drinks = db.prepare('SELECT * FROM drinks').all();
  return json(drinks);
}

export async function POST({ request }) {
  const { drinkData, ingredients } = await request.json();
  const transaction = db.transaction(() => {
    try {
      // Insertar drink
      const drinkStmt = db.prepare(`
        INSERT INTO drinks (name, price)
        VALUES (?, ?)
      `);
      const result = drinkStmt.run(drinkData.name, drinkData.price);
      const drinkId = result.lastInsertRowid;

      // Insertar ingredientes
      const craftStmt = db.prepare(`
        INSERT INTO drink_craft (drink_id, product_id, product_quantity)
        VALUES (?, ?, ?)
      `);
      
      ingredients.forEach(ingredient => {
        craftStmt.run(drinkId, ingredient.product_id, ingredient.quantity);
      });

      return { id: drinkId };
    } catch (error) {
      throw new Error(error.message);
    }
  });

  try {
    const result = transaction();
    return json(result, { status: 201 });
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
}