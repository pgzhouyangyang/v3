# 计时器 Timer

### 基础用法
:::demo
```vue
<template>
    <v3-timer></v3-timer>
</template>
```
:::


### 自定义格式
通过 `format` 属性设置计时器文本的内容格式。
:::demo
```vue
<template>
    <v3-timer format="DD 天 HH 时 mm 分 ss 秒"></v3-timer>
</template>
```
:::

### 自定义显示内容
通过插槽自定义显示内容， `timeData` 对象格式见下方表格
:::demo
```vue
<template>
    <v3-timer>
        <template #default="timeData">
            <span>{{timeData.hours}}</span>
            <span>:</span>
            <span>{{timeData.minutes}}</span>
            <span>:</span>
            <span>{{timeData.seconds}}</span>
        </template>
    </v3-timer>
</template>
```
:::



### 手动控制
通过 `ref` 获取组件实例后，可调用`start`， `pause`，`clear` 方法。
:::demo `auto-start`设置为fasle， 可使用 `start-time` 指定计时开始时间。
```vue
<template>
   <v3-timer ref="timer" :auto-start="false" start-time="2021-10-29"></v3-timer>
     <div style="margin-top: 20px">
            <el-button @click="start">开始</el-button>
            <el-button @click="pause">暂停</el-button>
            <el-button @click="clear">清除</el-button>
        </div>
</template>

<script>
  export default {
      methods: {
          start() {
              this.$refs.timer.start()
          },
          pause() {
              this.$refs.timer.pause() 
          },
           clear() {
              this.$refs.timer.clear() 
          }
      }
  }
</script>
```
:::


### Attributes
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|auto-start|是否自动开始|Boolean|-|true|
|start-time|计时的开始时间|String, Number, Date|-|当前时间|
|format|时间格式|String|-|HH:mm:ss|


### Slot
|name|说明|
|---|---|
|-|自定义内容，参数为timeData|


### timeData 格式
|名称|说明|类型|
|---|---|---|
|days|天数|number|
|hours|小时|number|
|minutes|分钟|number|
|seconds|秒数|number|
|milliseconds|剩余秒数|number|

### format 格式
|格式|说明|
|---|---|
|DD|天数|
|HH|小时|
|mm|分钟|
|ss|秒数|
|S|毫秒（1位）|
|SS|毫秒（2位）|
|SSS|毫秒（3位）|


### Methods
|方法名|说明|参数|
|---|---|---|
|start|开始计时|-|
|pause|暂停计时|-|
|clear|清除计时|-|