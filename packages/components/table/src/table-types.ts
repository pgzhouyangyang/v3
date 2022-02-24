import type { PropType } from 'vue'

export interface Col {
  label: string
  prop: string
  [key: string]: any
}

export const TableProps = {
  data: {
    type: Array,
    default: () => {
      return []
    },
  },
  headers: {
    type: Array as PropType<Col[]>,
    default: () => {
      return []
    },
  },
}
