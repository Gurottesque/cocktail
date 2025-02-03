<script>
    const { product, onClose, onSuccess } = $props();
    
    let formData = $state({
      name: product?.name || '',
      buy_price: product?.buy_price || '',
      quantity: product?.quantity || '',
      unit_quantity: product?.unit_quantity || '',
      category: product?.category || ''
    });
  
    const categories = ['Licor', 'Jugo', 'Fruta', 'Especia', 'Otro'];
  
    const handleSubmit = async () => {
      if (!Object.values(formData).every(Boolean)) {
        alert('Todos los campos son obligatorios');
        return;
      }
  
      const payload = {
        ...formData,
        buy_price: parseInt(formData.buy_price),
        quantity: parseInt(formData.quantity),
        unit_quantity: parseInt(formData.unit_quantity)
      };
  
      try {
        const url = product ? `/api/products/${product.id}` : '/api/products';
        const method = product ? 'PUT' : 'POST';
  
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
  
        if (!response.ok) throw new Error(await response.text());
        onSuccess();
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
  </script>
  
  
  <div>
    <h2 class="text-xl font-bold mb-4">{product ? 'Editar' : 'Nuevo'} Producto</h2>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          bind:value={formData.name}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
  
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Precio de Compra</label>
          <input
            type="number"
            bind:value={formData.buy_price}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Cantidad</label>
          <input
            type="number"
            bind:value={formData.quantity}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>
  
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Cantidad Unitaria (ml)</label>
          <input
            type="number"
            bind:value={formData.unit_quantity}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            bind:value={formData.category}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccionar...</option>
            {#each categories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>
      </div>
  
      <div class="flex justify-end space-x-2 mt-6">
        <button
          on:click={onClose}
          type="button"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          on:click={handleSubmit}
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {product ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </div>
  </div>