<template>
    <v3-modal ref="modal" :onOk="onOk">
      <div>v3-modal</div>
    </v3-modal>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps(), {});

const onOk = () => {
  return false;
};
</script>
<style lang="scss" scoped></style>
