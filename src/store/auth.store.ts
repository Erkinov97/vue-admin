import { useFetch } from "@/composable/useFetch";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = localStorage.getItem("user");
  const authenticated = ref(!!user);
  const loading = ref(false);
  const errorMessage = ref("");
  const tokenValid = ref<boolean>(false);

  // Actions
  async function authenticateUser(payload: {
    email: string;
    password: string;
  }) {
    loading.value = true;
    try {
      const { data } = await useFetch.post("/auth/login", payload);
      console.log(data);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      authenticated.value = true;
    } catch (error) {
      errorMessage.value = (error as Error).message;
      console.error(error);
    } finally {
      loading.value = false;
    }
  }

  async function getUserMe() {
    try {
      const res = await useFetch.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (res.status === 200) {
        tokenValid.value = true;
      }
    } catch (error) {
      errorMessage.value = (error as Error).message;
      console.error(error);
      refreshToken();
    } finally {
      loading.value = false;
    }
  }

  async function refreshToken() {
    try {
      const { data } = await useFetch.post("/auth/refresh-token", {
        refreshToken: localStorage.getItem("refresh_token"),
      });
      const { access_token, refresh_token } = data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      tokenValid.value = true;
    } catch (error) {
      errorMessage.value = (error as Error).message;
      console.error(error);
    }
  }

  function logUserOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    authenticated.value = false;
    errorMessage.value = "";
    window.location.href = "/login";
  }

  return {
    authenticated,
    loading,
    tokenValid,
    errorMessage,
    getUserMe,
    refreshToken,
    authenticateUser,
    logUserOut,
  };
});
