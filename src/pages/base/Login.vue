<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h2 class="text-center text-4xl font-bold mt-10">Đăng nhập</h2>
  <div class="border rounded mx-auto my-10 w-1/2">
    <form action="" class="p-8" @submit.prevent="onSubmit">
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
          type="password"
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

      <div class="flex">
        <button
          class="bg-blue-600 py-2 px-4 mt-10 text-white text-lg rounded"
          type="submit"
        >
          Đăng nhập
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import { required, email, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useAuth } from "@/stores/auth";
import { showAlert } from "@/utils/sweetalertMixin";
import { useRouter } from "vue-router";

const store = useAuth();
const router = useRouter();

const formValue = reactive({
  email: "",
  password: "",
});
const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(7) },
  };
});

const v$ = useVuelidate(rules, formValue);
console.log(v$.value);
const onSubmit = async () => {
  const result = await v$.value.$validate();
  console.log(result);
  if (result) {
    const newData = {
      email: formValue.email,
      password: formValue.password,
    };
    console.log(newData);
    const user = await store.login(newData);

    console.log(store.user);
    console.log(user);
    if (store.error) {
      showAlert("Đăng nhập ", "Đăng nhập tài khoản thất bại", "error", "OK");
    } else {
      showAlert("Đăng nhập", "Đăng nhập tài khoản thành công", "success", "OK");
      if (localStorage.getItem("user")) {
        const { user } = JSON.parse(localStorage.getItem("user"));
        if (user.roles === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    }
  }
};
</script>
