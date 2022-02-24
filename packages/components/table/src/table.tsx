import { computed, defineComponent, reactive, toRefs } from 'vue'
import draggable from 'vuedraggable'
import { Setting } from '@element-plus/icons-vue'
import { TableProps } from './table-types'
import type { Col } from './table-types'
export default defineComponent({
  name: 'V3Table',
  components: {
    Setting,
    draggable,
  },
  props: TableProps,
  setup(props) {
    function* flatten(array, depth) {
      if (depth === undefined) {
        depth = 1
      }
      for (const item of array) {
        yield item
        if (item.children && item.children.length && depth > 0) {
          yield* flatten(
            item.children.map((c) => ({ ...c, isChild: true })),
            depth - 1
          )
        }
      }
    }

    const tableHeader = [...flatten(props.headers, Infinity)]
    const state = reactive<{
      checkAll: boolean
      checkList: string[]
      isIndeterminate: boolean
      tableHeader: Col[]
    }>({
      checkAll: true,
      checkList: tableHeader.map((item: Col) => item.label),
      isIndeterminate: false,
      tableHeader,
    })

    const getCheckedCol = (data) => {
      return data.reduce((arr, cur) => {
        if (state.checkList.includes(cur.label)) {
          const item = { ...cur }
          if (item.children && item.children.length) {
            item.children = getCheckedCol(item.children)
          }
          arr.push(item)
        }
        return arr
      }, [])
    }

    const columns = computed(() => {
      const headers = state.tableHeader.filter((item) => {
        return state.checkList.includes(item.label) && !item.isChild
      })

      console.log(headers)
      return getCheckedCol(headers)
    })

    const handleCheckAllChange = (val) => {
      state.checkList = val ? tableHeader.map((item: Col) => item.label) : []
      state.isIndeterminate = false
    }

    const handleCheckedItemChange = (val) => {
      const checkedCount = val.length

      state.checkAll = checkedCount === tableHeader.length

      state.isIndeterminate =
        checkedCount > 0 && checkedCount < tableHeader.length
    }

    const reset = () => {
      state.checkList = tableHeader.map((item: Col) => item.label)
    }

    const dragChange = (val) => {
      state.tableHeader = val
    }

    return {
      ...toRefs(state),
      handleCheckAllChange,
      handleCheckedItemChange,
      reset,
      dragChange,
      columns,
    }
  },
  methods: {
    renderColumn(data) {
      if (data.children && data.children.length) {
        const { children, ...props } = data
        return (
          <el-table-column {...props}>
            {children.map((item) => {
              return this.renderColumn(item)
            })}
          </el-table-column>
        )
      }
      return <el-table-column {...data}></el-table-column>
    },
  },
  render() {
    const popoverSlot = {
      reference: () => (
        <el-button size="small" circle icon={Setting}></el-button>
      ),
    }
    return (
      <div class="v3-table">
        <div class="v3-table-toolbar">
          <div>
            <slot name="toolbar"></slot>
          </div>
          <div>
            <div>
              <el-popover v-slots={popoverSlot}>
                <div style="display:flex;justify-content: space-between;align-items: center;margin-bottom:5px">
                  <el-checkbox
                    size="mini"
                    v-model={this.checkAll}
                    indeterminate={this.isIndeterminate}
                    onChange={this.handleCheckAllChange}
                  >
                    全选
                  </el-checkbox>
                  <div>
                    <el-button type="text" size="mini" onClick={this.reset}>
                      重置
                    </el-button>
                  </div>
                </div>
                <div style="height: 300px">
                  <el-scrollbar style="height: 100%">
                    <el-checkbox-group
                      v-model={this.checkList}
                      onChange={this.handleCheckedItemChange}
                    >
                      <draggable
                        modelValue={this.tableHeader}
                        onUpdate:modelValue={this.dragChange}
                        itemKey="prop"
                        animation={300}
                        v-slots={{
                          item: ({ element }) => (
                            <div key={element.prop}>
                              <el-checkbox
                                size="mini"
                                label={element.label}
                              ></el-checkbox>
                            </div>
                          ),
                        }}
                      ></draggable>
                    </el-checkbox-group>
                  </el-scrollbar>
                </div>
              </el-popover>
            </div>
          </div>
        </div>
        <el-table data={this.data}>
          {this.columns.map((item: Col) => {
            return this.renderColumn(item)
          })}
        </el-table>
      </div>
    )
  },
})
