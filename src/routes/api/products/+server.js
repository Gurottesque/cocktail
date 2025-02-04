import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function GET() {
  const { data } = await supabase.from('products').select('*');
  return json(data);
}

export async function POST({ request }) {
  const rawData = await request.json();
  
  // Eliminar campos que no deben enviarse
  const { id, total_quantity, ...cleanData } = rawData;
  
  // No necesitas calcular total_quantity manualmente (ya es GENERATED)
  const { data: product, error } = await supabase
    .from('products')
    .insert(cleanData)  // <-- Usar solo los campos necesarios
    .select()
    .single();

  if (error) {
    console.error('Error en inserción:', error);
    return json(
      { error: error.message },
      { status: 400 }
    );
  }

  return json(
    { id: product.id },
    { status: 201 }
  );
}