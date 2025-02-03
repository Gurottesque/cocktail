<script>
  import { onMount } from 'svelte';
  import BackButton from '$lib/components/BackButton.svelte';

  let searchTerm = '';
  let searchResults = [];
  let selectedDrinks = [];
  let salesHistory = [];

  // Cargar historial solo en el cliente
  onMount(async () => {
    await loadSalesHistory();
  });

  const searchDrinks = async () => {
    if (searchTerm.length === 0) {
      searchResults = [];
      return;
    }
    const res = await fetch(`/api/drinks/search?q=${encodeURIComponent(searchTerm)}`);
    searchResults = await res.json();
  };

  const addToSale = (drink) => {
    selectedDrinks = [...selectedDrinks, { ...drink, quantity: 1 }];
  };

  const processSale = async () => {
    for (const item of selectedDrinks) {
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drinkId: item.id })
      });
    }
    selectedDrinks = [];
    await loadSalesHistory();
  };

  const loadSalesHistory = async () => {
    const res = await fetch('/api/register');
    salesHistory = await res.json();
  };

  const undoSale = async (saleId) => {
    await fetch(`/api/register/${saleId}`, { method: 'DELETE' });
    await loadSalesHistory();
  };
</script>
<div class="min-h-screen bg-gray-100 p-8">
  <BackButton />
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
    
    <!-- Panel izquierdo - Caja -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold mb-6">Caja Registradora</h2>
      
      <!-- Búsqueda -->
      <div class="mb-6">
        <input
        type="text"
        bind:value={searchTerm}
        on:input={searchDrinks}
        placeholder="Buscar bebida por nombre o ID..."
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      </div>

      <!-- Resultados de búsqueda -->
      <div class="mb-6 space-y-2">
        {#each searchResults as drink}
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span class="font-medium">{drink.name}</span>
              <span class="text-gray-500 ml-2">${drink.price}</span>
            </div>
            <button
              on:click={() => addToSale(drink)}
              class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Agregar
            </button>
          </div>
        {/each}
      </div>

      <!-- Venta actual -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-semibold mb-4">Venta Actual</h3>
        {#each selectedDrinks as drink, index (index)}
          <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg mb-2">
            <div class="flex items-center gap-2">
              <span>{drink.name} x{drink.quantity}</span>
              <button
                on:click={() => selectedDrinks = selectedDrinks.filter((_, i) => i !== index)}
                class="text-red-500 hover:text-red-700 text-sm"
              >
                ✕
              </button>
            </div>
            <span>${drink.price * drink.quantity}</span>
          </div>
        {/each}
        
        <button
          on:click={processSale}
          class="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          disabled={selectedDrinks.length === 0}
        >
          Cobrar (Total: ${selectedDrinks.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)})
        </button>

        
      </div>
    </div>

    <!-- Panel derecho - Historial -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold mb-6">Registro del Día</h2>
      
      <div class="space-y-4">
        {#each salesHistory as sale}
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span class="font-medium">{sale.drink_name}</span>
              <span class="text-gray-500 text-sm ml-2">
                {new Date(sale.bought_at).toLocaleTimeString()}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span>${sale.price}</span>
              <button
                on:click={() => undoSale(sale.id)}
                class="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>