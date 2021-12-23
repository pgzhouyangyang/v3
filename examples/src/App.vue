<template>
  <el-button @click="handleClick">click</el-button>
</template>

<script setup lang="ts">


import { inject } from "vue";
import Modal from "./views/modal.vue";

import { ModalService } from "../../packages/src";
const modalservice = inject(ModalService.token) as ModalService;
const openModal = modalservice.create(Modal);

const handleClick = () => {
  openModal.open({
	  props: {
		title: "标题1",
		width: "80%"
	  },
	  onOk: async (res: any) => {
		  
		  return true
	  }
  });
};
</script>
