<script>
  import DrinkForm from './DrinkForm.svelte';
  import BackButton from '$lib/components/BackButton.svelte';

  export let data;
  let drinks = data.drinks;
  let showModal = false;
  let selectedDrink = null;

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar coctel?')) {
      await fetch(`/api/drinks/${id}`, { method: 'DELETE' });
      window.location.reload();
    }
  };
</script>

<svelte:head>
  <title>Cocteles - BarMix</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-6">
    <BackButton />
    <h1 class="text-3xl font-bold text-gray-800">Cocteles</h1>
    <button
      onclick={() => {
        showModal = true;
        selectedDrink = null;
      }}
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      Nuevo Coctel
    </button>
  </div>

  <div class="bg-white rounded-lg shadow overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ingredientes</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each drinks as drink (drink.id)}
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">{drink.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${drink.price}</td>
            <td class="px-6 py-4">
              {#each drink.ingredients as ingredient}
              <div class="text-sm text-gray-600">
                {ingredient.name} - {ingredient.product_quantity}ml
                {#if ingredient.product_id}
                  (ID: {ingredient.product_id})
                {/if}
              </div>
            {/each}
            </td>
            <td class="px-6 py-4 whitespace-nowrap space-x-2">
              <button
                onclick={() => {
                  showModal = true;
                  selectedDrink = drink;
                }}
                class="text-indigo-600 hover:text-indigo-900"
              >
                Editar
              </button>
              <button
                onclick={() => handleDelete(drink.id)}
                class="text-red-600 hover:text-red-900"
              >
                Eliminar
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#if showModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
        <DrinkForm
          drink={selectedDrink}
          products={data.products}
          onClose={() => showModal = false}
          onSuccess={() => window.location.reload()}
        />
      </div>
    </div>
  {/if}
</div>