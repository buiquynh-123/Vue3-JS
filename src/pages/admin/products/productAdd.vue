<template>
  <h2 class="text-center text-4xl font-bold">Product Add</h2>
  <div class="border rounded mx-auto my-10">
    <form action="" class="p-8" @submit.prevent="onSubmit">
      <div>
        <label for="" class="block pb-2 text-lg">Name</label>
        <input
          type="text"
          placeholder=""
          class="border w-full py-1 px-3"
          v-model="formValue.name"
          id="name"
        />
        <span
          class="text-red-500"
          v-for="error in v$.name.$errors"
          :key="error.$uid"
          >{{ error.$message }}</span
        >
      </div>
      <div class="my-6">
        <label for="" class="block pb-2 text-lg">Price</label>
        <input
          type="text"
          placeholder=""
          class="border w-full py-1 px-3"
          v-model="formValue.price"
          id="price"
        />
        <span
          class="text-red-500"
          v-for="error in v$.price.$errors"
          :key="error.$uid"
          >{{ error.$message }}</span
        >
      </div>
      <div class="my-6">
        <label for="" class="block pb-2 text-lg">Quantity</label>
        <input
          type="text"
          placeholder=""
          class="border w-full py-1 px-3"
          v-model="formValue.quantity"
          id="quantity"
        />
        <span
          class="text-red-500"
          v-for="error in v$.quantity.$errors"
          :key="error.$uid"
          >{{ error.$message }}</span
        >
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

        <span
          class="text-red-500"
          v-for="error in v$.image.$errors"
          :key="error.$uid"
          >{{ error.$message }}</span
        >
      </div>
      <div>
        <label for="" class="block pb-2 text-lg">Description</label>
        <input
          type="text"
          placeholder=""
          class="border w-full py-1 px-3"
          v-model="formValue.description"
          id="description"
        />
        <span
          class="text-red-500"
          v-for="error in v$.description.$errors"
          :key="error.$uid"
          >{{ error.$message }}</span
        >
      </div>
      <div>
        <button
          class="bg-blue-600 py-2 px-4 mt-10 text-white text-lg rounded"
          type="submit"
        >
          Add Product
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useProducts } from "@/stores/products.js";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { showAlert } from "@/utils/sweetalertMixin";
import { required, between } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const router = useRouter();
const store = useProducts();

const formValue = reactive({
  name: "",
  price: "",
  description: "",
  quantity: "",
  image: [],
  categoryId: "64b2817c540a40454dc40e1c",
});

const rules = computed(() => {
  return {
    name: { required },
    price: { required, between: between(0, 1000000) },
    description: { required },
    quantity: { required, between: between(1, 1000) },
    image: { required },
    categoryId: { required },
  };
});

const v$ = useVuelidate(rules, formValue);
const handleFileChange = (e) => {
  const files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
    formValue.image.push(files[i]);
  }
};
const onSubmit = async () => {
  const result = await v$.value.$validate();
  if (result) {
    const newData = {
      name: formValue.name,
      price: formValue.price,
      description: formValue.description,
      quantity: formValue.quantity,
      category_id: formValue.categoryId,
    };
    const formData = new FormData();
    Object.keys(newData).forEach((key) => formData.append(key, newData[key]));
    formValue.image.forEach((file) => {
      console.log(file);
      formData.append("image", file);
    });
    console.log(newData);
    const product = await store.addProduct(formData);
    console.log(product);

    if (store.error) {
      showAlert("Add Product ", "Thêm sản phẩm thất bại", "error", "OK");
    } else {
      showAlert("Add Product", "Thêm sản phẩm thành công", "success", "OK");
      router.push("/admin/productlist");
    }
  }
};
</script>
