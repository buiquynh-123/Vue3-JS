import axios from "axios";
import { defineStore } from "pinia";
export const useAuth = defineStore("auth", {
  state: () => ({
    error: null,

    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    isLoading: false,
  }),

  actions: {
    async register(newData) {
      try {
        this.isLoading = true;
        const { data } = await axios.post(
          "http://localhost:8080/api/signup",
          newData
        );
        console.log(data);
      } catch (err) {
        this.error = err.message;
      }
    },
    async login(newData) {
      try {
        this.isLoading = true;
        const { data } = await axios.post(
          "http://localhost:8080/api/signin",
          newData
        );
        localStorage.setItem("user", JSON.stringify(data));

        console.log(this.user);
      } catch (err) {
        this.error = err.message;
      }
    },
    async logout() {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          this.user = null;
        }
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
