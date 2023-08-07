<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="bg-white flex justify-around items-center fixed top-0 left-0 right-0 py-4"
  >
    <div class="w-44 overflow-hidden">
      <img
        class="w-44"
        src="https://theme.hstatic.net/200000384051/1000742014/14/logo.png?v=1609"
        alt=""
      />
    </div>
    <ul class="flex w-2/3 justify-around items-center">
      <li>
        <div class="px-4 py-1 border rounded-full">
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
      </li>
      <li v-for="navItem in navItems" :key="navItem.name">
        <router-link
          :to="{ name: navItem.name, param: {} }"
          class="text-[16px] font-semibold"
          >{{ navItem.name }}</router-link
        >
      </li>
      <li>
        <font-awesome-icon
          class="text-[18px]"
          :icon="['fas', 'cart-shopping']"
        />
      </li>

      <li v-if="!store.user" class="parent relative cursor-pointer">
        <font-awesome-icon class="text-[18px]" :icon="['fas', 'user']" />
        <div
          class="child shadow-lg py-3 px-1 absolute w-36 bg-white right-[-60px] rounded hidden"
        >
          <ul class="">
            <li
              class="border-slate-300 p-1 rounded hover:bg-emerald-100 font-semibold text-center"
            >
              <router-link to="/register"> Đăng kí </router-link>
            </li>
            <li
              class="border-slate-300 p-1 rounded hover:bg-emerald-100 font-semibold text-center"
            >
              <router-link to="/login"> Đăng nhập </router-link>
            </li>
          </ul>
        </div>
      </li>
      <li v-if="store.user" class="group relative cursor-pointer">
        <div class="flex items-center">
          <div
            class="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-400"
          >
            <img
              class="w-full"
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
          <p class="font-semibold text-base ml-2">
            {{ store.user.name }}
          </p>
        </div>
        <div
          class="shadow-lg py-3 px-1 absolute w-36 bg-white right-[-60px] rounded hidden group-hover:block"
        >
          <ul class="" @click="onHandleLogout">
            <li
              class="border-slate-300 p-1 rounded hover:bg-emerald-100 font-semibold"
            >
              <router-link to="/register">
                <font-awesome-icon
                  :icon="['fas', 'right-from-bracket']"
                  class="mr-2"
                />Đăng xuất
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { NAV_HEADER_BASE_ITEMS } from "@/constants";
import { reactive } from "vue";
import { useAuth } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const navItems = reactive(NAV_HEADER_BASE_ITEMS);
const store = useAuth();

const onHandleLogout = async () => {
  await store.logout();
  localStorage.removeItem("user");
  router.push("/");
};
</script>
