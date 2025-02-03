import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET() {
  const sales = db.prepare(`
    SELECT r.*, d.name as drink_name, d.price
    FROM register r
    JOIN drinks d ON r.drink_id = d.id
    WHERE DATE(r.bought_at) = DATE('now')
    ORDER BY r.bought_at DESC
  `).all();
  
  return json(sales);
}

export async function POST({ request }) {
  const { drinkId } = await request.json();

  try {
    const transaction = db.transaction(() => {
      // Registrar la venta
      const sale = db.prepare(`
        INSERT INTO register (drink_id) VALUES (?)
      `).run(drinkId);

      // Consumir ingredientes
      const ingredients = db.prepare(`
        SELECT product_id, product_quantity 
        FROM drink_craft 
        WHERE drink_id = ?
      `).all(drinkId);

      ingredients.forEach(({ product_id, product_quantity }) => {
        db.prepare(`
          UPDATE products 
          SET quantity = quantity - 1,
              total_quantity = total_quantity - ?
          WHERE id = ?
        `).run(product_quantity, product_id);
      });

      return { id: sale.lastInsertRowid };
    });

    return json(transaction());
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE({ params }) {
  
  try {
    const transaction = db.transaction(() => {
      // Recuperar ingredientes
      const ingredients = db.prepare(`
        SELECT product_id, product_quantity 
        FROM drink_craft 
        WHERE drink_id = (
          SELECT drink_id FROM register WHERE id = ?
        )
      `).all(params.id);

      ingredients.forEach(({ product_id, product_quantity }) => {
        db.prepare(`
          UPDATE products 
          SET quantity = quantity + 1,
              total_quantity = total_quantity + ?
          WHERE id = ?
        `).run(product_quantity, product_id);
      });

      // Eliminar registro
      db.prepare('DELETE FROM register WHERE id = ?').run(params.id);
    });

    return json({ success: true });
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
}