<script>
    import { goto } from '$app/navigation';
  </script>
  
  <button
    on:click={() => goto('/')}
    class="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    <span class="font-medium">Volver al inicio</span>
  </button>