import db from '$lib/db';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    const query = url.searchParams.get('q') || '';
    
    // Permitir búsqueda desde 1 carácter
    const searchTerm = query.trim();
    
    // Buscar por ID exacto si es numérico
    const isNumericQuery = !isNaN(searchTerm) && searchTerm !== '';
    
    const drinks = db.prepare(`
      SELECT * FROM drinks 
      WHERE 
        (name LIKE ? OR 
        ${isNumericQuery ? 'id = ?' : '1 = 0'})
      LIMIT 10
    `).all(
      `%${searchTerm}%`,
      ...(isNumericQuery ? [parseInt(searchTerm)] : [])
    );
  
    return json(drinks);
  }