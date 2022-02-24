<template>
  <el-tooltip
    v-bind="typeof tooltip === 'boolean' ? defaultTooltip : tooltip"
    :disabled="!tooltip"
  >
    <template v-if="$slots.tooltip" #content>
      <slot name="tooltip"></slot>
    </template>
    <template v-else #content>
      <slot></slot>
    </template>
    <div
      class="v3-ellipsis"
      :class="[
        lineClamp ? 'v3-ellipsis--line-clamp' : '',
        maxHeight ? 'v3-ellipsis__max_height' : '',
        expanded ? 'v3-ellipsis__open' : 'v3-ellipsis__fold',
      ]"
      :style="ellipsisStyleRef"
      @click="props.expandTrigger == 'click' ? (expanded = !expanded) : null"
    >
      <slot></slot>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElTooltip } from 'element-plus'

import { parseStyleSize } from '../../../utils/utils'
import type { StyleValue } from '../../../utils/types'

const expanded = ref<boolean>(false)

interface IProps {
  lineClamp?: string | number
  expandTrigger?: string
  tooltip?: boolean | object
  maxHeight?: string | number
}
const props = withDefaults(defineProps<IProps>(), {
  tooltip: true,
})

interface IDefaultTooltip {
  placement: string
}
const defaultTooltip = reactive<IDefaultTooltip>({
  placement: 'top',
})

const ellipsisStyleRef = computed<StyleValue>(() => {
  const style: any = {
    'max-height': expanded.value
      ? ''
      : `${parseStyleSize(props.maxHeight || '')}px`,
  }
  if (!expanded.value) {
    style['-webkit-line-clamp'] = Number(props.lineClamp)
  }
  return style
})
</script>
<script lang="ts">
export default {
  name: 'V3Ellipsis',
}
</script>
