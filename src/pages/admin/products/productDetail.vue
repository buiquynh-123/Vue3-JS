<template>
  <div class="my-2">
    <div class="flex gap-4">
      <div
        class="rounded-md overflow-hidden w-32"
        v-for="(img, index) in store.product.images"
        :key="index"
      >
        <img class="w-full" :src="img.url" alt="" />
      </div>
    </div>
    <div class="my-4">
      <div>
        <span class="text-base font-bold mr-2">Name:</span>
        <span class="text-base font-medium">{{ store.product.name }}</span>
      </div>
      <div>
        <span class="text-base font-bold mr-2">Giá sản phẩm:</span>
        <span class="text-base font-medium">{{ store.product.price }}</span>
      </div>
      <div>
        <span class="text-base font-bold mr-2">Số lượng sản phẩm:</span>
        <span class="text-base font-medium">{{ store.product.quantity }}</span>
      </div>
      <div>
        <span class="text-base font-bold mr-2">Mô tả sản phẩm:</span>
        <span class="text-base font-medium">{{
          store.product.description
        }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { useProducts } from "@/stores/products";
import { onMounted } from "vue";

const route = useRoute();
const store = useProducts();

const productId = route.params.id;

onMounted(async () => {
  if (productId) {
    await store.getProductById(productId);
  }
});
console.log(store.product);
</script>
