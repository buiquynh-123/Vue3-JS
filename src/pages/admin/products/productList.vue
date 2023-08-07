<template>
  <h2 class="text-center text-4xl font-bold">Product List</h2>

  <div class="flex justify-center mt-10">
    <table
      class="w-full text-center border-collapse border border-slate-400 caption-top loading-table"
    >
      <thead>
        <tr>
          <th class="border border-slate-300">STT</th>
          <th class="border border-slate-300">Name</th>
          <th class="border border-slate-300">Price</th>
          <th class="flex justify-between items-center">
            Quantity
            <div class="cursor-pointer relative">
              <font-awesome-icon
                :icon="['fas', 'filter']"
                @click="showFilter"
              />
              <div
                v-if="show"
                class="shadow-lg py-3 px-1 absolute w-40 bg-white right-3 rounded"
              >
                <ul class="">
                  <li
                    @click="quantityIsMoreThan60"
                    class="border-slate-300 p-1 rounded hover:bg-emerald-100 font-semibold text-center"
                  >
                    Lớn hơn 60
                  </li>
                  <li
                    @click="quantityIsLessThan60"
                    class="border-slate-300 p-1 rounded hover:bg-emerald-100 font-semibold text-center"
                  >
                    Nhỏ hơn 60
                  </li>
                  <li
                    @click="getAll"
                    class="border-slate-300 p-1 rounded hover:bg-emerald-100 font-semibold text-center"
                  >
                    Tất cả
                  </li>
                </ul>
              </div>
            </div>
          </th>
          <th class="border border-slate-300">Action</th>
        </tr>
      </thead>

      <tbody>
        <template v-if="!store.isLoading">
          <tr v-for="(product, index) in items.reverse()" :key="product?._id">
            <td class="border border-slate-300">
              {{ index + 1 }}
            </td>
            <td class="border border-slate-300">
              <router-link :to="`product/${product?._id}`">
                {{ product?.name }}
              </router-link>
            </td>
            <td class="border border-slate-300">{{ product?.price }}đ</td>
            <td class="border border-slate-300">
              {{ product?.quantity }}
            </td>
            <td class="flex justify-around p-2">
              <button
                class="p-2 bg-red-500 w-1/2 mx-2 text-lg text-white rounded-lg"
                @click="handleDeleteProduct(product?._id)"
              >
                Delete
              </button>
              <button
                class="p-2 bg-green-500 w-1/2 mx-2 text-lg text-white rounded-lg"
              >
                <router-link :to="`/admin/productedit/${product?._id}`"
                  >Update</router-link
                >
              </button>
            </td>
          </tr>
        </template>
        <LoadingTable v-if="store.isLoading" />
      </tbody>
    </table>
  </div>
  <div v-if="store.error" class="text-xl font-bold text-center my-5">
    {{ store.error }}
  </div>
  <div class="w-1/2 mx-auto flex gap-3 justify-center items-center my-4">
    <font-awesome-icon
      :icon="['fas', 'chevron-left']"
      class="cursor-pointer text-slate-400"
      v-if="totalPages"
      @click="handlePrevPages()"
    />
    <button
      class="w-10 h-10 p-1 shadow-md"
      @click="loadMore(index + 1)"
      v-for="(totalPage, index) in totalPages"
      :key="index"
    >
      {{ index + 1 }}
    </button>
    <font-awesome-icon
      :icon="['fas', 'chevron-right']"
      class="cursor-pointer text-slate-400"
      v-if="totalPages"
      @click="handleNextPages()"
    />
  </div>
</template>
<script>
export default {
  components: {
    LoadingTable,
  },
};
</script>
<script setup>
import { useProducts } from "@/stores/products";
import { onMounted, ref, watchEffect } from "vue";
import { showAlert } from "@/utils/sweetalertMixin";
import LoadingTable from "@/components/admin/LoadingTable.vue";

const store = useProducts();
const items = ref([]);
// dữ liệu hiển thị trên giao diện
const itemsPerPage = ref(4);
// Số mục hiển thị trên mỗi trang
const currentIndex = ref(1);
// trang hiện tại
const totalPages = ref("");
const show = ref(false);

onMounted(async () => {
  await store.getProducts();
});

const handleDeleteProduct = async (id) => {
  const isConfirm = confirm("Bạn có thực sự muốn sản phẩm này không ?");
  if (isConfirm) {
    await store.deleteProduct(id);
    if (store.error) {
      showAlert("Delete Product ", "Xóa sản phẩm thất bại", "error", "OK");
    } else {
      showAlert("Delete Product", "Xóa sản phẩm thành công", "success", "OK");
    }
  }
};
console.log();

watchEffect(() => {
  items.value = [...store.products.reverse().slice(0, 4)];
});

watchEffect(() => {
  totalPages.value = Math.ceil(store.products.length / itemsPerPage.value);
});

function showFilter() {
  console.log("show filter");
  console.log(show.value);
  show.value = !show.value;
}
function quantityIsLessThan60() {
  items.value = store.products.filter((item) => item.quantity <= 60);
  show.value = !show.value;
}
function quantityIsMoreThan60() {
  items.value = store.products.filter((item) => item.quantity >= 60);
  show.value = !show.value;
}
function getAll() {
  items.value = store.products;
  show.value = !show.value;
}
function loadMore(currentPage) {
  const start = (currentPage - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  items.value = store.products.slice(start, end);
  console.log(store.products.slice(start, end));
}
function handleNextPages() {
  if (currentIndex.value >= 1) {
    currentIndex.value++;
    loadMore(currentIndex.value);
    if (currentIndex.value > totalPages.value) {
      currentIndex.value = 0;
      currentIndex.value++;
      loadMore(currentIndex.value);
    }
  }
}
function handlePrevPages() {
  console.log(currentIndex.value);

  if (1 <= currentIndex.value) {
    currentIndex.value--;
    loadMore(currentIndex.value);
  }
  if (currentIndex.value == 0) {
    currentIndex.value--;
    currentIndex.value = totalPages.value;
    loadMore(currentIndex.value);
  }
}
</script>

<style scoped>
.loading-table {
  width: 100%;
  border-collapse: collapse;
}

.loading-table th,
.loading-table td {
  border: 1px solid rgb(235, 233, 233);
  padding: 8px;
  text-align: left;
}

.loading-row {
  background-color: #f2f2f2;
  animation: loading-animation 1.5s infinite;
}

@keyframes loading-animation {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
