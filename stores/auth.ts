import { createAuthClient } from 'better-auth/client';
import { defineStore } from 'pinia';

const authClient = createAuthClient();

export const useAuthStore = defineStore('useAuthStore', () => {
  const isLoading = ref(false);

  const signIn = async () => {
    isLoading.value = true;

    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
    });

    isLoading.value = false;
  };

  return { isLoading, signIn };
});
