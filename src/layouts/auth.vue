<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Header />
    <div class="mt-20">
      <slot />
    </div>
  </div>
</template>
<script>
import Header from "@/components/base/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>
