<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mt-[68px]">
    <img
      src="https://theme.hstatic.net/200000687053/1001083219/14/slide_1_img.jpg?v=102"
      alt=""
    />
  </div>
  <div
    class="my-10 xl:max-w-[1200px] mx-auto lg:max-w-[1024px] md:max-w-[768px] max-w-[640px]"
  >
    <div class="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-7">
      <div v-for="itemBanner in listBanner" :key="itemBanner.title">
        <div>
          <img :src="itemBanner.img" alt="" />
        </div>
        <p class="text-4xl font-serif text-center my-6">
          {{ itemBanner.title }}
        </p>
        <p class="font-serif text-center my-2 text-xl">
          {{ itemBanner.content }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  setup() {
    const listBanner = reactive([
      {
        title: "Dành cho phái đẹp",
        content:
          "Cùng với sự phát triển không ngừng, nhu cầu chăm sóc sắc đẹp, dưỡng da cũng phát triển cho phù hợp, giúp phái đẹp tự tin hơn để thành công trong công việc",
        img: "https://theme.hstatic.net/200000687053/1001083219/14/img_home_banner_desktop_1.jpg?v=102",
      },
      {
        title: "Dành cho phái mạnh",
        content:
          "Ngày nay, không chỉ riêng phái đẹp mới có nhu cầu chăm sóc cơ thể, phái mạnh cũng cần chăm sóc để có cơ thể khoẻ mạnh hơn",
        img: "https://theme.hstatic.net/200000687053/1001083219/14/img_home_banner_desktop_2.jpg?v=102",
      },
    ]);
    return { listBanner };
  },
};
</script>
