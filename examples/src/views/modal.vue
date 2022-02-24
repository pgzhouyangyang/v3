<template>
  <v3-modal ref="modal" :on-ok="onOk">
    <el-form :model="form">
      <el-form-item>
        <el-input v-model="form.username"> </el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
    </el-form>
  </v3-modal>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

interface IForm {
  [key: string]: any
}

const form = reactive<IForm>({})

const onOk = () => {
  return false
}
</script>
