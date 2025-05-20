import { useFetch } from '#app';
import { createAuthClient } from 'better-auth/vue';
import { defineStore } from 'pinia';

const authClient = createAuthClient();

export const useAuthStore = defineStore('useAuthStore', () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(
    null
  );

  const init = async () => {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  };

  const user = computed(() => session.value?.data?.user);
  const isLoading = computed(() => session.value?.isPending);

  const signIn = async () => {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
    });
  };

  const signOut = async () => {
    await authClient.signOut();
    navigateTo('/');
  };

  return { init, signIn, signOut, user, isLoading };
});
