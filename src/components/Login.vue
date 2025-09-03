<template>
  <div class="login-page">
    <h2>Welcome — Please sign in</h2>
    <form @submit.prevent="doLogin">
      <input v-model="email" placeholder="email" required />
      <input v-model="password" type="password" placeholder="password" required />
      <button type="submit">Sign in</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "../router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const { login } = useAuth();
    const router = useRouter();

    async function doLogin() {
      error.value = "";
      try {
        await login(email.value, password.value);
        router.push("/invite");
      } catch (e) {
        error.value = e.message;
      }
    }
    return { email, password, doLogin, error };
  }
};
</script>