<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h2 class="text-center text-4xl font-bold mt-10">Đăng kí</h2>
  <div class="border rounded mx-auto my-10 w-1/2">
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
        <label for="" class="block pb-2 text-lg">Email</label>
        <input
          type="text"
          placeholder=""
          class="border w-full py-1 px-3"
          v-model="formValue.email"
          id="email"
        />
        <span
          class="text-red-500"
          v-for="error in v$.email.$errors"
          :key="error.$uid"
          >{{ error.$message }}</span
        >
      </div>
      <div class="my-6">
        <label for="" class="block pb-2 text-lg">Password</label>
        <input
          type="text"
          placeholder=""
          class="border w-full py-1 px-3"
          v-model="formValue.password"
          id="password"
        />
        <span
          class="text-red-500"
          v-for="error in v$.password.$errors"
          :key="error.$uid"
          >{{ error.$message }}</span
        >
      </div>
      <div class="my-6">
        <label for="" class="block pb-2 text-lg">Confirm Password</label>
        <input
          type="text"
          placeholder=""
          class="border w-full py-1 px-3"
          v-model="formValue.confirm"
          id="confirm"
        />
        <span
          class="text-red-500"
          v-for="error in v$.confirm.$errors"
          :key="error.$uid"
          >{{ error.$message }}</span
        >
      </div>

      <div class="flex">
        <button
          class="bg-blue-600 py-2 px-4 mt-10 text-white text-lg rounded"
          type="submit"
        >
          Đăng kí
        </button>
        <div class="flex items-end mb-3 ml-6">
          <p>Bạn đã có tài khoản?</p>
          <p class="ml-1 text-blue-500">
            <router-link to="/login"> Đăng nhập ngay </router-link>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useAuth } from "@/stores/auth.js";
import { showAlert } from "@/utils/sweetalertMixin";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useAuth();

const formValue = reactive({
  name: "",
  email: "",
  password: "",
  confirm: "",
});
const rules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(7) },
    confirm: { required, saveAs: sameAs(formValue.password) },
  };
});

const v$ = useVuelidate(rules, formValue);
console.log(v$.value);
const onSubmit = async () => {
  const result = await v$.value.$validate();
  console.log(result);
  if (result) {
    const newData = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirm,
    };

    console.log(newData);
    const user = await store.register(newData);
    console.log(user);
    if (store.error) {
      showAlert("Đăng kí ", "Đăng kí tài khoản thất bại", "error", "OK");
    } else {
      showAlert("Đăng kí", "Đăng kí tài khoản thành công", "success", "OK");
      router.push("/");
    }
  }
};
</script>
