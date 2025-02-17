<script>
    const { drink, products, onClose, onSuccess } = $props();
  
    let formData = $state({
      name: drink?.name || '',
      price: drink?.price?.toString() || ''
    });
  
    // Ingredientes existentes y nuevos
    let existingIngredients = $state(drink?.ingredients?.map(i => ({
        product_id: i.product_id,  // Mantenemos como número
        quantity: i.product_quantity,
        name: products.find(p => p.id === i.product_id)?.name
    })) || []);
    let newIngredient = $state({ product_id: '', quantity: '' });
    
    let availableProducts = $derived(
        products.filter(p => 
            !existingIngredients.some(i => i.product_id === p.id)
        )
    );
  
    const addNewIngredient = () => {
      if (newIngredient.product_id && newIngredient.quantity) {
        existingIngredients = [
          ...existingIngredients,
          {
            product_id: parseInt(newIngredient.product_id),
            quantity: parseInt(newIngredient.quantity),
            name: products.find(p => p.id === parseInt(newIngredient.product_id))?.name
          }
        ];
        newIngredient = { product_id: '', quantity: '' };
      }
    };
  
    const removeIngredient = (index) => {
      existingIngredients = existingIngredients.filter((_, i) => i !== index);
    };
  
    const handleSubmit = async () => {
      if (!formData.name || !formData.price || existingIngredients.length === 0) {
        alert('Nombre, precio y al menos un ingrediente son requeridos');
        return;
      }
  
      const payload = {
        drinkData: {
          name: formData.name,
          price: parseInt(formData.price)
        },
        ingredients: existingIngredients.map(i => ({
          product_id: i.product_id,
          quantity: i.quantity
        }))
      };
  
      try {
        const url = drink ? `/api/drinks/${drink.id}` : '/api/drinks';
        const method = drink ? 'PUT' : 'POST';
  
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
    <h2 class="text-xl font-bold mb-4">{drink ? 'Editar' : 'Nuevo'} Coctel</h2>
    
    <div class="space-y-4">
      <!-- Campos principales -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre del coctel</label>
          <input
            bind:value={formData.name}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Precio de venta</label>
          <input
            type="number"
            bind:value={formData.price}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>
  
      <!-- Lista de ingredientes existentes -->
      <div class="border-t pt-4">
        <h3 class="text-lg font-medium mb-4">Ingredientes Actuales</h3>
        
        <div class="max-h-[300px] overflow-y-auto"> 
          {#each existingIngredients as ingredient, index (index)}
            <div class="flex gap-4 mb-3 items-center">
              <div class="flex-1">
                <input
                  value={ingredient.name}
                  class="block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                  disabled
                />
              </div>
              
              <div class="w-32">
                <input
                  type="number"
                  bind:value={ingredient.quantity}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  min="1"
                />
              </div>
      
              <button
                on:click={() => removeIngredient(index)}
                class="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          {/each}
        </div>
      </div>
  
      <!-- Sección para agregar nuevos ingredientes -->
      <div class="border-t pt-4">
        <h3 class="text-lg font-medium mb-4">Agregar Ingrediente</h3>
        
        <div class="flex gap-4 mb-3 items-end">
          <div class="flex-1">
            <select
              bind:value={newIngredient.product_id}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Seleccionar producto...</option>
              {#each availableProducts as product}
                <option value={product.id}>{product.name} ({product.total_quantity}ml disponible)</option>
              {/each}
            </select>
          </div>
  
          <div class="w-32">
            <input
              type="number"
              bind:value={newIngredient.quantity}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Cantidad"
              min="1"
            />
          </div>
  
          <button
            on:click={addNewIngredient}
            class="mb-1 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Agregar
          </button>
        </div>
      </div>
  
      <!-- Botones de acción -->
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
          {drink ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </div>
  </div>