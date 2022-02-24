<template>
  <v3-drawer ref="modal" :on-open="onOpen" :on-ok="onOk">
    <div style="height: 2000px">v3-drawer</div>
  </v3-drawer>
</template>

<script lang="ts" setup>
interface iRequest {
  name: string
  age: number
}

const props = defineProps<iRequest>()

console.log(props)

const onOk = () => {
  return false
}

const onOpen = (data: iRequest) => {
  console.log(data)
}
</script>
<style lang="scss" scoped></style>
