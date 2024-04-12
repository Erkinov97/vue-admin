<script setup lang="ts">
import { reactive } from "vue";
import { ElNotification } from "element-plus";
import { useAuthStore } from "@/store";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const loginForm = reactive({
  email: "john@mail.com",
  password: "changeme",
});

const router = useRouter();

const login = async () => {
  await authStore.authenticateUser(loginForm);
  if (authStore.errorMessage) {
    ElNotification({
      title: "Error",
      message: authStore.errorMessage,
      type: "error",
    });
  } else if (authStore.authenticated) {
    ElNotification({
      title: "Success",
      message: "Login successful",
      type: "success",
    });
    router.push({
      name: "dashboard",
    });
  }
};
</script>
<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <h1 class="text-center">Log in DeviceShopMaster Admin dashboard</h1>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-card>
            <el-form label-position="top">
              <el-form-item label="Username">
                <el-input
                  v-model="loginForm.email"
                  placeholder="Username"
                ></el-input>
              </el-form-item>
              <el-form-item label="Password">
                <el-input
                  v-model="loginForm.password"
                  placeholder="Password"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login">Login</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped>
.text-center {
  text-align: center;
}
</style>
