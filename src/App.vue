<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
// import { PUBLIC_LAYOUT } from "./constants/index.js";
export default {
  setup() {
    const route = useRoute();
    console.log(route);
    return {
      layout: computed(() => route.meta.layout + "-layout"),
    };
  },
};
</script>
