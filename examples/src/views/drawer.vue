<template>
    <v3-drawer ref="modal" :onOpen="onOpen">
      <div style="height: 2000px;">v3-drawer</div>
    </v3-drawer>
</template>

<script lang="ts" setup>

interface iRequest {
  name: string,
  age: number
}



const props = withDefaults(defineProps(), {});

const onOk = () => {
  return false;
};

const onOpen = (data: iRequest)=> {
}
</script>
<style lang="scss" scoped></style>
