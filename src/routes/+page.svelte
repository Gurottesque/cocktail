<script>
    export let data;
  </script>

{#if data.user}


  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 mb-12 text-center">*insertar nombre cocteleria*</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Tarjeta Inventario -->
        <a href="/inventario" class="group">
          <div class="bg-blue-500 hover:bg-blue-600 rounded-xl p-6 h-48 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div>
              <div class="bg-white/20 w-fit p-3 rounded-lg mb-4">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-white mb-2">Inventario</h2>
              <p class="text-white/90 text-sm">Gestión de productos y existencias</p>
            </div>
            <div class="flex justify-end">
              <svg class="h-6 w-6 text-white transform group-hover:translate-x-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </a>
  
        <!-- Tarjeta Bebidas -->
        <a href="/bebidas" class="group">
          <div class="bg-green-500 hover:bg-green-600 rounded-xl p-6 h-48 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div>
              <div class="bg-white/20 w-fit p-3 rounded-lg mb-4">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-white mb-2">Bebidas</h2>
              <p class="text-white/90 text-sm">Creación y edición de cocteles</p>
            </div>
            <div class="flex justify-end">
              <svg class="h-6 w-6 text-white transform group-hover:translate-x-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </a>
  
        <!-- Tarjeta Caja -->
        <a href="/caja" class="group">
          <div class="bg-purple-500 hover:bg-purple-600 rounded-xl p-6 h-48 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div>
              <div class="bg-white/20 w-fit p-3 rounded-lg mb-4">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-white mb-2">Caja</h2>
              <p class="text-white/90 text-sm">Registro de ventas y cobros</p>
            </div>
            <div class="flex justify-end">
              <svg class="h-6 w-6 text-white transform group-hover:translate-x-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </a>
  
        <!-- Tarjeta Registros -->
        <a href="/registros" class="group">
          <div class="bg-orange-500 hover:bg-orange-600 rounded-xl p-6 h-48 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div>
              <div class="bg-white/20 w-fit p-3 rounded-lg mb-4">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-white mb-2">Registros</h2>
              <p class="text-white/90 text-sm">Historial y reportes de ventas</p>
            </div>
            <div class="flex justify-end">
              <svg class="h-6 w-6 text-white transform group-hover:translate-x-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>

  {:else}

  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 mb-12 text-center">*insertar nombre cocteleria*</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Tarjeta Inventario -->
        <a href="/inventario" class="group">
          <div class="bg-blue-500 hover:bg-blue-600 rounded-xl p-6 h-48 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div>
              <div class="bg-white/20 w-fit p-3 rounded-lg mb-4">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-white mb-2">Inventario</h2>
              <p class="text-white/90 text-sm">Gestión de productos y existencias</p>
            </div>
            <div class="flex justify-end">
              <svg class="h-6 w-6 text-white transform group-hover:translate-x-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </a>
  
        <!-- Tarjeta Bebidas -->
        <a href="/bebidas" class="group">
          <div class="bg-green-500 hover:bg-green-600 rounded-xl p-6 h-48 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div>
              <div class="bg-white/20 w-fit p-3 rounded-lg mb-4">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-white mb-2">Bebidas</h2>
              <p class="text-white/90 text-sm">Creación y edición de cocteles</p>
            </div>
            <div class="flex justify-end">
              <svg class="h-6 w-6 text-white transform group-hover:translate-x-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </a>
  
        <!-- Tarjeta Caja -->
        <a href="/caja" class="group">
          <div class="bg-purple-500 hover:bg-purple-600 rounded-xl p-6 h-48 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div>
              <div class="bg-white/20 w-fit p-3 rounded-lg mb-4">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-white mb-2">Caja</h2>
              <p class="text-white/90 text-sm">Registro de ventas y cobros</p>
            </div>
            <div class="flex justify-end">
              <svg class="h-6 w-6 text-white transform group-hover:translate-x-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </a>
  
        <!-- Tarjeta Registros -->
        <a href="/registros" class="group">
          <div class="bg-orange-500 hover:bg-orange-600 rounded-xl p-6 h-48 flex flex-col justify-between transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div>
              <div class="bg-white/20 w-fit p-3 rounded-lg mb-4">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-white mb-2">Registros</h2>
              <p class="text-white/90 text-sm">Historial y reportes de ventas</p>
            </div>
            <div class="flex justify-end">
              <svg class="h-6 w-6 text-white transform group-hover:translate-x-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>

{/if}