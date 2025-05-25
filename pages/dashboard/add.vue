<script setup lang="ts">
import { insertLocationSchema } from '~/lib/db/schema';
import { toast } from 'vue-sonner';
import { toTypedSchema } from '@vee-validate/zod';
import { FetchError } from 'ofetch';
import { onBeforeRouteLeave } from 'vue-router';

const router = useRouter();
const { $csrfFetch } = useNuxtApp();

const { handleSubmit, meta, setErrors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(insertLocationSchema),
});

const isSubmitted = ref(false);

const onSubmit = handleSubmit(async (values) => {
  try {
    await $csrfFetch('/api/locations', {
      method: 'post',
      body: values,
    });

    isSubmitted.value = true;
    navigateTo('/dashboard');
  } catch (error) {
    let message = 'An unknown error occured.';

    if (error instanceof FetchError) {
      const errorData = error.data?.data;

      if (errorData) {
        setErrors(errorData);
      }

      message = error.statusMessage ?? message;
    }

    toast(message);
  }
});

onBeforeRouteLeave(() => {
  if (!isSubmitted.value && meta.value.dirty) {
    const confirm = window.confirm(
      'Are you sure you want to leave? All unsaved changes will be lost.'
    );

    if (!confirm) {
      return false;
    }
  }

  return true;
});
</script>

<template>
  <div class="flex max-w-[32rem] flex-col gap-8">
    <div class="flex flex-col gap-4">
      <h1 class="text-xl font-medium">Add location</h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to. It can be a
        city, country, state or point of interest. You can add specific times
        you visited this location after adding it.
      </p>
    </div>
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <AppFormField name="name" label="Name" />
      <AppFormField name="description" label="Description" type="textarea" />
      <AppFormField name="lat" label="Latitude" type="number" />
      <AppFormField name="long" label="Longitude" type="number" />
      <div class="flex justify-end gap-2">
        <Button
          class="cursor-pointer"
          type="button"
          variant="outline"
          @click="router.back()"
        >
          <span>Cancel</span>
          <Icon name="tabler:circle-x" />
        </Button>
        <Button class="cursor-pointer" type="submit">
          <span>Add</span>
          <Icon
            v-if="isSubmitting"
            name="tabler:loader-2"
            class="animate-spin text-white dark:text-black"
          />
          <Icon
            v-else
            name="tabler:circle-plus"
            class="text-white dark:text-black"
          />
        </Button>
      </div>
    </form>
  </div>
</template>
