import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
  const drink = db.prepare('SELECT * FROM drinks WHERE id = ?').get(params.id);
  const ingredients = db.prepare(`
    SELECT p.name, dc.product_quantity, p.id as product_id 
    FROM drink_craft dc
    JOIN products p ON dc.product_id = p.id
    WHERE dc.drink_id = ?
  `).all(params.id);

  return json({ ...drink, ingredients });
}

export async function PUT({ request, params }) {
    const { drinkData, ingredients } = await request.json();
  
    // Validación adicional en el backend
    if (!drinkData.name || !drinkData.price || !ingredients?.length) {
      return json({ error: "Datos incompletos" }, { status: 400 });
    }
  const transaction = db.transaction(() => {
    try {
      // Actualizar drink
      const drinkStmt = db.prepare(`
        UPDATE drinks SET
        name = ?,
        price = ?
        WHERE id = ?
      `);
      drinkStmt.run(drinkData.name, drinkData.price, params.id);

      // Eliminar ingredientes antiguos
      db.prepare('DELETE FROM drink_craft WHERE drink_id = ?').run(params.id);

      // Insertar nuevos ingredientes
      const craftStmt = db.prepare(`
        INSERT INTO drink_craft (drink_id, product_id, product_quantity)
        VALUES (?, ?, ?)
      `);
      
      ingredients.forEach(ingredient => {
        craftStmt.run(params.id, ingredient.product_id, ingredient.quantity);
      });

      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  });

  try {
    const result = transaction();
    return json(result);
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE({ params }) {
  db.prepare('DELETE FROM drinks WHERE id = ?').run(params.id);
  return json({ success: true });
}