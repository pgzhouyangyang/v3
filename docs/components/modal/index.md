# 弹出框 Modal

### 基础用法
:::demo
```vue
<template>
  <el-button @click="open" type="text">click to open this Modal</el-button>
   <v3-modal v-model="modalVisible"  title="Modal" :onOk="onOk" >
    
    <div>content</div>

   </v3-modal>
    
</template>

<script>
import { defineComponent, ref } from 'vue'
  export default defineComponent({
      setup() {
        const modalVisible = ref(false)
        const open = ()=> {
            modalVisible.value = true
        }
        const onOk = ()=> {
            modalVisible.value = false

        }
        return {
            modalVisible,
            open,
            onOk
        }
      }
  })
</script>
```
:::

### 以服务方式调用

`index.js`

```js 
import { inject, defineComponent, ref } from "vue";

import Modal from "./modal.vue";

import { ModalService } from "zyy-v3-ui";

const modalservice = inject(ModalService.token);

const openModal = modalservice.create(Modal);

export default defineComponent({
    setup() {
       openModal.open({
          props: {
            title: "弹窗",
            width: "80%",
          },
          $onOk: async (res: any) => {
            return true;
          },
      });
    }
   
})

```

`modal.js`

```html
<v3-modal ref="modal"> ... </v3-modal>
```



### Attributes
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|...props|（参考<a href="https://element-plus.gitee.io/zh-CN/component/dialog.html" target="_blank">element-plus Dialog</a>）|Object&lt;DialogProps&gt;|-|-|
|confirmText|确定按钮文本|String|-|确 定|
|confirmType|确定按钮类型|String|primary / success / warning / danger / info / text|primary|
|cancelText|取消按钮文本|String|-|取 消|
|confirmType|取消按钮类型|String|primary / success / warning / danger / info / text|-|
|showCancel|是否显示取消按钮|Boolean|-|true|
|showFooter|是否显示footer|Boolean|-|true|
|onOpen|打开后的事件|Function|-|-|
|onOk|点击确定按钮的事件,返回false阻止弹窗关闭|Function|-|-|
|onCancel|点击取消按钮的事件,返回false阻止弹窗关闭|Function|-|-|
|onClose|关闭后的事件|Function|-|-|
|$onOpen|服务方式调用，open方法参数， 返回值可通过onOpen接收|Function|-|-|
|$onOk|服务方式调用，onOk事件返回true后执行，返回false阻止弹窗关闭|Function|-|-|
|$onCancel|服务方式调用，onCancel事件返回true后执行，返回false阻止弹窗关闭|Function|-|-|
