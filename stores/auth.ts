import { createAuthClient } from 'better-auth/vue';
import { defineStore } from 'pinia';

const authClient = createAuthClient();

export const useAuthStore = defineStore('useAuthStore', () => {
  const session = authClient.useSession();
  const user = computed(() => session.value.data?.user);
  const isLoading = computed(
    () => session.value.isPending || session.value.isRefetching
  );

  const signIn = async () => {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
    });
  };

  return { signIn, user, isLoading };
});
