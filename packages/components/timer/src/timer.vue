<template>
  <div>
    <slot name="default" v-bind="timeData"></slot>
    {{ $slots.default ? '' : formattedTime }}
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from 'vue'
import dayjs from 'dayjs'
import { CreatTimer, parseTimeData, parseFormat } from '../../../utils/utils'
interface Props {
  autoStart?: boolean
  format?: string
  startTime?: string | number | Date
}
const props = withDefaults(defineProps<Props>(), {
  autoStart: true,
  format: 'HH:mm:ss',
})

const time = ref<number>(0)
const timer = ref<CreatTimer>()

const timeData = computed(() => {
  return parseTimeData(time.value)
})
const formattedTime = computed(() => {
  return parseFormat(props.format, timeData.value)
})
const start = () => {
  if (!timer.value) {
    timer.value = new CreatTimer(dayjs(props.startTime || new Date()).valueOf())
  }
  timer.value.start((t) => {
    time.value = t
  })
}
const pause = () => {
  timer.value && timer.value.pause()
}

const clear = () => {
  timer.value && timer.value.clear()
  timer.value = undefined
  time.value = 0
}
if (props.autoStart) {
  start()
}

onBeforeUnmount(() => {
  clear()
})

defineExpose({
  start,
  pause,
  clear,
})
</script>

<script lang="ts">
export default {
  name: 'V3Timer',
}
</script>
