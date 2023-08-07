<template>
  <tr v-for="product in store.products" :key="product?._id" class="loading-row">
    <td class="border border-slate-300">
      <p class="p-3 bg-slate-200 w-1/2 mx-2 text-lg text-white rounded-lg"></p>
    </td>
    <td class="border border-slate-300">
      <p class="p-3 bg-slate-200 w-1/2 mx-2 text-lg text-white rounded-lg"></p>
    </td>
    <td class="border border-slate-300">
      <p class="p-3 bg-slate-200 w-1/2 mx-2 text-lg text-white rounded-lg"></p>
    </td>
    <td class="border border-slate-300">
      <p class="p-3 bg-slate-200 w-1/2 mx-2 text-lg text-white rounded-lg"></p>
    </td>

    <td class="flex justify-around p-2">
      <button
        class="p-3 bg-slate-200 w-1/2 mx-2 text-lg text-white rounded-lg"
      ></button>
      <button
        class="p-3 bg-slate-200 w-1/2 mx-2 text-lg text-white rounded-lg"
      ></button>
    </td>
  </tr>
</template>

<script setup>
import { useProducts } from "@/stores/products";
const store = useProducts();
</script>
