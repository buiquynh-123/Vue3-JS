<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-white flex justify-between items-center py-4">
    <div class="py-3 px-10 border rounded-full">
      <font-awesome-icon
        :icon="['fas', 'magnifying-glass']"
        class="text-xl text-slate-300 font-thin mr-2"
      />
      <input
        type="text"
        placeholder="Search"
        class="border-none outline-none text-lg text-slate-500 font-normal"
        v-model="valueInput"
        v-on:keyup.enter="onSubmit"
      />
      <p>{{ valueInput }}</p>
    </div>
    <div class="flex">
      <div class="w-14 h-14 border rounded-full overflow-hidden mr-5">
        <img
          class="w-full"
          src="https://templates.iqonic.design/aprycot/html/dashboard/dist/assets/images/avatars/01.png"
          alt=""
        />
      </div>
      <div>
        <p>Admin</p>
        <p>Ten nhan vien</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useProducts } from "../../stores/products";

const store = useProducts();
const valueInput = ref("");

const onSubmit = async () => {
  if (valueInput.value) {
    await store.searchProduct({ searchQuery: valueInput.value });
  }
};
</script>
