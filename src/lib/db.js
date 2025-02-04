import { createClient } from '@supabase/supabase-js';

// Configuración
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Simular métodos de better-sqlite3
export default {
  prepare: (sql) => ({
    run: async (params = []) => {
      const { error } = await supabase.rpc('execute_sql', { 
        query: sql, 
        params: params 
      });
      if (error) throw error;
    },
    all: async (params = []) => {
      const { data, error } = await supabase.rpc('execute_sql', { 
        query: sql, 
        params: params 
      });
      if (error) throw error;
      return data;
    }
  }),
  transaction: (queries) => supabase.rpc('execute_transaction', { queries })
};