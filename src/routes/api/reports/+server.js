import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const params = {
    drink: url.searchParams.get('drink') || '',
    startDate: url.searchParams.get('startDate'),
    endDate: url.searchParams.get('endDate'),
    timeRange: url.searchParams.get('timeRange')
  };

  // Construir query dinámica
  let query = `
    SELECT r.id, d.name as drink_name, d.price, 
           STRFTIME('%Y-%m-%d %H:%M', r.bought_at) as bought_at 
    FROM register r
    JOIN drinks d ON r.drink_id = d.id
    WHERE 1=1
  `;

  const conditions = [];
  const queryParams = [];

  // Filtrar por nombre de bebida
  if (params.drink) {
    conditions.push('d.name LIKE ?');
    queryParams.push(`%${params.drink}%`);
  }

  // Filtrar por rango de fecha
  if (params.startDate && params.endDate) {
    conditions.push('DATE(r.bought_at) BETWEEN ? AND ?');
    queryParams.push(params.startDate, params.endDate);
  }

  // Filtrar por rangos predefinidos
  if (params.timeRange) {
    const now = new Date();
    switch(params.timeRange) {
      case 'today':
        conditions.push("DATE(r.bought_at) = DATE('now')");
        break;
      case 'week':
        conditions.push("STRFTIME('%Y-%W', r.bought_at) = STRFTIME('%Y-%W', 'now')");
        break;
      case 'month':
        conditions.push("STRFTIME('%Y-%m', r.bought_at) = STRFTIME('%Y-%m', 'now')");
        break;
    }
  }

  // Combinar condiciones
  if (conditions.length > 0) {
    query += ' AND ' + conditions.join(' AND ');
  }

  query += ' ORDER BY r.bought_at DESC LIMIT 500';

  const stmt = db.prepare(query);
  const results = stmt.all(...queryParams);

  return json(results);
}