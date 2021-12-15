# 文本省略 Ellipsis


### 基础用法
带弹出提示基本的单行省略。
:::demo

```vue
<template>
   <v3-ellipsis style="max-width: 240px"> 带弹出提示基本的单行省略;带弹出提示基本的单行省略;带弹出提示基本的单行省略;带弹出提示基本的单行省略;</v3-ellipsis>
</template>
```

:::

### 最大行数
基于 `-webkit-line-clamp` 的多行省略。
::: demo
```vue
<template>
  <v3-ellipsis :line-clamp="2">
      基于 -webkit-line-clamp 的多行省略;基于 -webkit-line-clamp 的多行省略;
      <br/>
      基于 -webkit-line-clamp 的多行省略;基于 -webkit-line-clamp 的多行省略;
      <br/>
      基于 -webkit-line-clamp 的多行省略;基于 -webkit-line-clamp 的多行省略;
      <br/>
      基于 -webkit-line-clamp 的多行省略;基于 -webkit-line-clamp 的多行省略;
  </v3-ellipsis>
</template>
```
:::



### 展开完整内容
使用 `expand-trigger="click"` 搭配 `line-clamp` 参数可以实现点击缩略文本展开完整文本的功能
::: demo
```vue
<template>
  <v3-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false">
    使用 expand-trigger="click" 搭配 line-clamp 参数可以实现点击缩略文本展开完整文本的功能<br />
    使用 expand-trigger="click" 搭配 line-clamp 参数可以实现点击缩略文本展开完整文本的功能<br />
    使用 expand-trigger="click" 搭配 line-clamp 参数可以实现点击缩略文本展开完整文本的功能<br />
    使用 expand-trigger="click" 搭配 line-clamp 参数可以实现点击缩略文本展开完整文本的功能<br />
  </v3-ellipsis>
</template>
```
:::

### 最大高度
使用 `max-height` 设置显示区的最大高度。
::: demo
```vue
<template>
  <v3-ellipsis expand-trigger="click" max-height="40" :tooltip="false">
      基于 -webkit-line-clamp 的多行省略;基于 -webkit-line-clamp 的多行省略;
      <br/>
      基于 -webkit-line-clamp 的多行省略;基于 -webkit-line-clamp 的多行省略;
      <br/>
      基于 -webkit-line-clamp 的多行省略;基于 -webkit-line-clamp 的多行省略;
      <br/>
      基于 -webkit-line-clamp 的多行省略;基于 -webkit-line-clamp 的多行省略;
  </v3-ellipsis>
</template>
```
:::


### 定制 Tooltip 内容
使用 tooltip slot 定制 tooltip 内容。
::: demo
```vue
<template>
  <v3-ellipsis style="max-width: 240px">
      使用 tooltip slot 定制 tooltip 内容;使用 tooltip slot 定制 tooltip 内容;
      使用 tooltip slot 定制 tooltip 内容;使用 tooltip slot 定制 tooltip 内容。
      <template #tooltip>
          <div style="text-align: center">
            《沁园春·雪》<br/>
            北国风光，千里冰封，万里雪飘。<br/>
            望长城内外，惟余莽莽；大河上下，顿失滔滔。<br/>
            山舞银蛇，原驰蜡象，欲与天公试比高。<br/>
            须晴日，看红装素裹，分外妖娆。<br/>
            江山如此多娇，引无数英雄竞折腰。<br/>
            惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。<br/>
            一代天骄，成吉思汗，只识弯弓射大雕。<br/>
            俱往矣，数风流人物，还看今朝。
          </div>
      </template>
  </v3-ellipsis>
</template>
```
:::

### Attributes
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|expand-trigger|展开的触发方式|String|-|click|
|line-clamp|最大行数|Number，String|-|-|
|max-height|最大高度，合法的值为数字或者单位为 px 的高度。|Number，String|-|true|
|tooltip|tooltip 的属性（参考<a href="https://element.eleme.cn/#/zh-CN/component/tooltip" target="_blank">element-ui tooltip</a>）|Boolean，Object&lt;TooltipProps&gt;|-|-|


### Slot
|name|说明|
|---|---|
|-|文本省略的内容|
|tooltip|tooltip 的内容|