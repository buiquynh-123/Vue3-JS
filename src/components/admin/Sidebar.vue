<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-[#2a3352] h-full pr-4 py-4">
    <ul>
      <li
        v-for="navItem in navItems"
        :key="navItem.name"
        class="bg-white rounded-r-full py-3 my-2 pl-6 font-semibold"
      >
        <router-link :to="{ name: navItem.name, param: {} }">
          {{ navItem.text }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive } from "vue";
import { NAV_HEADER_ITEMS } from "../../constants/index";
export default {
  setup() {
    const navItems = reactive(NAV_HEADER_ITEMS);
    return { navItems };
  },
};
</script>
<style></style>
