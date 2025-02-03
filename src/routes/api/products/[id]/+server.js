import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function PUT({ request, params }) {
  const data = await request.json();
  
  try {
    const stmt = db.prepare(`
      UPDATE products SET
      name = ?, 
      buy_price = ?,
      quantity = ?,
      unit_quantity = ?,
      total_quantity = ?,
      category = ?
      WHERE id = ?
    `);
    
    stmt.run(
      data.name,
      data.buy_price,
      data.quantity,
      data.unit_quantity,
      data.quantity * data.unit_quantity,
      data.category,
      params.id
    );
    
    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE({ params }) {
  db.prepare('DELETE FROM products WHERE id = ?').run(params.id);
  return json({ success: true });
}