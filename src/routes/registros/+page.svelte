<script>
    import { onMount } from 'svelte';
    import BackButton from '$lib/components/BackButton.svelte';
    let filters = $state({
      drink: '',
      startDate: '',
      endDate: '',
      timeRange: ''
    });
    
    let salesData = $state([]);
    let isLoading = $state(false);
  
    const fetchReport = async () => {
      isLoading = true;
      try {
        const params = new URLSearchParams();
        if (filters.drink) params.append('drink', filters.drink);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (filters.timeRange) params.append('timeRange', filters.timeRange);
        
        const res = await fetch(`/api/reports?${params}`);
        salesData = await res.json();
      } finally {
        isLoading = false;
      }
    };
  
    const resetFilters = () => {
      filters = { drink: '', startDate: '', endDate: '', timeRange: '' };
      fetchReport();
    };
  
    onMount(fetchReport);
  </script>
  
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <BackButton />
      <h1 class="text-3xl font-bold mb-8">Reportes de Ventas</h1>
      
      <!-- Filtros -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            bind:value={filters.drink}
            placeholder="Buscar bebida..."
            class="p-2 border rounded"
          />
          
          <select bind:value={filters.timeRange} class="p-2 border rounded">
            <option value="">Todos los tiempos</option>
            <option value="today">Hoy</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
          </select>
          
          <div class="space-y-1">
            <label for="startDate" class="block text-sm font-medium text-gray-700">
              Fecha inicial
            </label>
            <input
              type="date"
              id="startDate"
              bind:value={filters.startDate}
              class="p-2 border rounded w-full"
            />
          </div>
        
          <div class="space-y-1">
            <label for="endDate" class="block text-sm font-medium text-gray-700">
              Fecha final
            </label>
            <input
              type="date"
              id="endDate"
              bind:value={filters.endDate}
              class="p-2 border rounded w-full"
            />
          </div>
        </div>
        
        <div class="flex gap-4 mt-4">
          <button
            on:click={fetchReport}
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Filtrar
          </button>
          <button
            on:click={resetFilters}
            class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Limpiar
          </button>
        </div>
      </div>
  
      <!-- Tabla de resultados -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        {#if isLoading}
          <div class="p-6 text-center text-gray-500">Cargando...</div>
        {:else}
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha y Hora</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bebida</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Precio</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each salesData as sale}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">{sale.bought_at}</td>
                  <td class="px-6 py-4">{sale.drink_name}</td>
                  <td class="px-6 py-4 text-right">${sale.price}</td>
                </tr>
              {/each}
            </tbody>
          </table>
          
          {#if salesData.length === 0 && !isLoading}
            <div class="p-6 text-center text-gray-500">No se encontraron registros</div>
          {/if}
        {/if}
      </div>
    </div>
  </div>