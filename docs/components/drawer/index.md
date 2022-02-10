# 抽屉 Drawer

### 基础用法
:::demo
```vue
<template>
  <el-button @click="open" type="text">click to open this Drawer</el-button>
   <v3-drawer v-model="drawerVisible"  title="Modal" :onOk="onOk" >
    
    <div>content</div>

   </v3-drawer>
    
</template>

<script>
import { defineComponent, ref } from 'vue'
  export default defineComponent({
      setup() {
        const drawerVisible = ref(false)
        const open = ()=> {
            drawerVisible.value = true
        }
        const onOk = ()=> {
            drawerVisible.value = false

        }
        return {
            drawerVisible,
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

import Drawer from "./modal.vue";

import { DrawerService } from "zyy-v3-ui";

const drawerservice = inject(DrawerService.token);

const openDrawer = drawerservice.create(Modal);

export default defineComponent({
    setup() {
       openDrawer.open({
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

`drawer.js`

```html
<v3-drawer ref="modal"> ... </v3-drawer>
```



### Attributes
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|...props|（参考<a href="https://element-plus.gitee.io/zh-CN/component/drawer.html" target="_blank">element-plus Drawer</a>）|Object&lt;DrawerProps&gt;|-|-|
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
