<template>
	<v3-ellipsis
		:line-clamp="2"
		:tooltip="{ placement: 'bottom' }"
		style="max-width: 240px"
	>
		带弹出提示基本的单行省略;带弹出提示基本的单行省略;带弹出提示基本的单行省略;带弹出提示基本的单行省略;</v3-ellipsis
	>

	<v3-timer></v3-timer>
	<el-affix :offset="120">
		<el-button type="primary">Offset top 120px</el-button>
	</el-affix>
	<el-button>222</el-button>
	<el-alert title="success alert" type="success" />
	
	<!-- <el-tooltip>
		<el-button>eee</el-button>
	</el-tooltip> -->
	
</template>

<script setup lang="ts"></script>
