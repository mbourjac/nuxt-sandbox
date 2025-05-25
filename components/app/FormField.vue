<script lang="ts" setup>
import { FormField } from '../ui/form';

const {
  name,
  label,
  placeholder,
  type = 'text',
} = defineProps<{
  name: string;
  type?: 'text' | 'number' | 'textarea';
  label: string;
  placeholder?: string;
}>();
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Input
          v-if="type === 'text' || type === 'number'"
          :type="type"
          :placeholder="placeholder"
          v-bind="componentField"
        />
        <Textarea v-else :placeholder="placeholder" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
