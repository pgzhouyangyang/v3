# 表格 Table


:::demo
```vue
<template>
    <v3-table :data="data" :headers="headers"></v3-table>
</template>

<script setup lang="ts">
const data = [

	{
		name: "张三",
		age: "20",
		address: "威海"
	},
	{
		name: "李四",
		age: "30",
		address: "威海"
		
	},
	{
		name: "王五",
		age: "40",
		address: "威海"
	},
	{
		name: "赵六",
		age: "50"
	},
	{
		name: "钱七",
		age: "60",
		address: "威海"
	}
]
const headers = [
	{
		label: "序号",
		prop: "",
		type: "index",
		align: "center"
	},
	{
		label: "基本信息",
		align: "center",
		children: [
			{
				label: "姓名",
				prop: "name",
				align: "center"
			},
			{
				label: "年龄",
				prop: "age",
				align: "center",
				formatter: (row: any) => {
					return row.age + "岁"
				}
			}
		]
	},
	{
		label: "住址",
		align: "center",
		prop: "address",
	},
	{
		label: "ID",
		align: "center",
		prop: "id",

	}
]


</script>
<style scoped>
   .v3-table table{
        margin: 0
    }

</style>

```
:::