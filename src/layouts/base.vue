<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/base/Header.vue";
import Footer from "@/components/base/Footer.vue";
export default {
  components: { Header, Footer },
};
</script>
