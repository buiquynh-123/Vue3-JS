import axios from "axios";
import { defineStore } from "pinia";
export const useProducts = defineStore("products", {
  state: () => ({
    error: null,
    products: [],
    product: {},
    isLoading: false,
  }),
  actions: {
    async getProducts() {
      try {
        this.isLoading = true;
        const { data } = await axios.get("http://localhost:8080/api/products");
        this.products = [...data];
        this.isLoading = false;
      } catch (err) {
        this.error = err.message;
      }
    },
    async getProductById(id) {
      try {
        this.isLoading = true;
        const { data } = await axios.get(
          `http://localhost:8080/api/products/${id}`
        );
        this.product = data;
        this.isLoading = false;
        console.log(this.product);
      } catch (err) {
        this.error = err.message;
      }
    },
    async addProduct(newData) {
      try {
        this.isLoading = true;
        const { data } = await axios.post(
          `http://localhost:8080/api/products`,
          newData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const { product } = data;
        this.isLoading = false;
        this.error = null;
        this.products = [...this.products, product];
      } catch (err) {
        this.error = err.message;
      }
    },
    async editProduct(id, newData) {
      this.isLoading = true;
      try {
        const { data } = await axios.put(
          `http://localhost:8080/api/products/${id}`,
          newData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.products = this.products.map((item) =>
          item._id === id ? data : item
        );
        this.isLoading = false;
        this.error = null;
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteProduct(id) {
      try {
        this.isLoading = true;
        await axios.delete(`http://localhost:8080/api/products/${id}`);
        this.products = this.products.filter((product) => product._id !== id);
        this.isLoading = false;
        this.error = null;
      } catch (err) {
        this.error = err.message;
      }
    },
    async searchProduct(value) {
      try {
        this.isLoading = true;
        console.log(value);
        if (value) {
          const { data } = await axios.post(
            "http://localhost:8080/api/search",
            value
          );
          console.log(data.cursor.length);
          if (data.cursor.length >= 1) {
            console.log("fjklj");
            this.isLoading = false;
            this.error = null;
            this.products = [...data.cursor];
          } else if (data.cursor.length === 0) {
            this.isLoading = false;
            this.error = "Không tìm thấy sản phẩm...";
            this.products = [];
          }
        }
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
