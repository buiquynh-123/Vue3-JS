<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex">
    <div class="w-1/4">
      <Sidebar />
    </div>
    <div class="w-full px-16">
      <Header />
      <slot />
    </div>
  </div>
</template>
<script>
import Header from "../components/admin/Header.vue";
import Sidebar from "../components/admin/Sidebar.vue";
export default {
  components: { Header, Sidebar },
};
</script>
