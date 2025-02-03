<script>
  import ProductForm from './ProductForm.svelte';
  import BackButton from '$lib/components/BackButton.svelte';

  export let data;
  let products = data.products;
  let showModal = false;
  let selectedProduct = null;

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar producto?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      window.location.reload();
    }
  };
</script>

<svelte:head>
  <title>Inventario - BarMix</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-6">
    <BackButton />
    <h1 class="text-3xl font-bold text-gray-800">Inventario</h1>
    <button
      on:click={() => {
        showModal = true;
        selectedProduct = null;
      }}
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      Agregar Producto
    </button>
  </div>

  <div class="bg-white rounded-lg shadow overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio Compra</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad Unitaria</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each products as product (product.id)}
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">{product.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${product.buy_price}</td>
            <td class="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
            <td class="px-6 py-4 whitespace-nowrap">{product.unit_quantity}ml</td>
            <td class="px-6 py-4 whitespace-nowrap">{product.total_quantity}ml</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {product.category}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap space-x-2">
              <button
                on:click={() => {
                  showModal = true;
                  selectedProduct = product;
                }}
                class="text-indigo-600 hover:text-indigo-900"
              >
                Editar
              </button>
              <button
                on:click={() => handleDelete(product.id)}
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
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <ProductForm
          product={selectedProduct}
          onClose={() => showModal = false}
          onSuccess={() => window.location.reload()}
        />
      </div>
    </div>
  {/if}
</div>