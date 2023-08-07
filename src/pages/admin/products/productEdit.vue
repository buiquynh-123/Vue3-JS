<template>
  <div>
    <h2 class="text-center text-4xl font-bold">Product Edit</h2>
    <div class="border rounded mx-auto my-10">
      <form action="" class="p-8" @submit.prevent="onSubmit">
        <div>
          <label for="" class="block pb-2 text-lg">Name</label>
          <input
            type="text"
            placeholder=""
            class="border w-full py-1 px-3"
            v-model="name"
            id="name"
          />
          <p>name: {{ name }}</p>
        </div>
        <div class="my-6">
          <label for="" class="block pb-2 text-lg">Price</label>
          <input
            type="text"
            placeholder=""
            class="border w-full py-1 px-3"
            v-model="price"
            id="price"
          />
        </div>
        <div class="my-6">
          <label for="" class="block pb-2 text-lg">Quantity</label>
          <input
            type="text"
            placeholder=""
            class="border w-full py-1 px-3"
            v-model="quantity"
            id="quantity"
          />
        </div>
        <div class="my-6">
          <label for="" class="block pb-2 text-lg">Image</label>
          <input
            type="file"
            placeholder=""
            class="border w-full py-1 px-3"
            multiple
            @change="handleFileChange"
            id="image"
          />
          <div class="my-2 flex gap-2">
            <div
              class="rounded-md overflow-hidden w-32"
              v-for="(img, index) in store.product.images"
              :key="index"
            >
              <img class="w-full" :src="img.url" alt="" />
            </div>
          </div>
        </div>
        <div>
          <label for="" class="block pb-2 text-lg">Description</label>
          <input
            type="text"
            placeholder=""
            class="border w-full py-1 px-3"
            v-model="description"
            id="description"
          />
        </div>
        <div>
          <button
            class="bg-blue-600 py-2 px-4 mt-10 text-white text-lg rounded"
            type="submit"
          >
            Edit Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useProducts } from "@/stores/products";
import { ref, onMounted } from "vue";
import { showAlert } from "@/utils/sweetalertMixin";

const route = useRoute();
const store = useProducts();
const router = useRouter();
const productId = route?.params?.id;

const name = ref("");
const price = ref("");
const description = ref("");
const quantity = ref("");
const image = ref([]);
const categoryId = ref("64b2817c540a40454dc40e1c");

onMounted(async () => {
  if (productId) {
    await store.getProductById(productId);
    name.value = store.product.name;
    price.value = store.product.price;
    description.value = store.product.description;
    quantity.value = store.product.quantity;
  }
});

const handleFileChange = (e) => {
  const files = e.target.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      image.value.push(files[i]);
    }
  } else {
    image.value = store.product.images;
  }
};

const onSubmit = async () => {
  const newData = {
    name: name.value,
    price: price.value,
    description: description.value,
    quantity: quantity.value,
    category_id: categoryId.value,
  };

  const formData = new FormData();

  Object.keys(newData).forEach((key) => formData.append(key, newData[key]));
  image.value.forEach((file) => {
    formData.append("image", file);
  });

  const product = await store.editProduct(productId, formData);
  console.log(product);
  if (store.error) {
    showAlert("Update Product ", "Sửa sản phẩm thất bại", "error", "OK");
  } else {
    showAlert("Update Product", "Sửa sản phẩm thành công", "success", "OK");
    router.push("/admin/productlist");
  }
};
</script>
