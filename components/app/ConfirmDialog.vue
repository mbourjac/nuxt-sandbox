<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router';

const {
  needsConfim,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
} = defineProps<{
  needsConfim: boolean;
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
}>();

const isDialogOpen = ref(false);
let leaveResolver: ((shouldLeave: boolean) => void) | null = null;

const promptLeaveConfirmation = (): Promise<boolean> => {
  isDialogOpen.value = true;
  return new Promise((resolve) => {
    leaveResolver = resolve;
  });
};

const confirmLeave = () => {
  isDialogOpen.value = false;
  leaveResolver?.(true);
};

const cancelLeave = () => {
  isDialogOpen.value = false;
  leaveResolver?.(false);
};

onBeforeRouteLeave(async () => {
  if (needsConfim) {
    return await promptLeaveConfirmation();
  }

  return true;
});
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription v-if="description">
          {{ description }}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="flex justify-end gap-2">
        <Button variant="outline" @click="cancelLeave">{{
          cancelLabel
        }}</Button>
        <Button @click="confirmLeave">{{ confirmLabel }}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
