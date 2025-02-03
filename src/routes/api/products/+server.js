import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET() {
  const products = db.prepare('SELECT * FROM products').all();
  return json(products);
}

export async function POST({ request }) {
  const data = await request.json();
  
  try {
    const stmt = db.prepare(`
      INSERT INTO products 
      (name, buy_price, quantity, unit_quantity, total_quantity, category)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      data.name,
      data.buy_price,
      data.quantity,
      data.unit_quantity,
      data.quantity * data.unit_quantity, // Calcula total_quantity
      data.category
    );
    
    return json({ id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
}