<template>
  <v-btn to="/" elevation="0" variant="text" size="small" class="home-btn">回首頁</v-btn>
  <v-container class="d-flex justify-center align-center" style="min-height: 100vh">
    <v-row justify="center" align="center" class="w-100">
      <v-col cols="12" sm="8" md="6" lg="4">
        <h1 class="text-center" block>登入</h1>
        <v-divider></v-divider>
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
            :label="'帳號'"
            minlength="4"
            maxlength="20"
            variant="outlined"
            counter
          />
          <v-text-field
            v-model="password.value.value"
            type="password"
            :error-messages="password.errorMessage.value"
            :label="'密碼'"
            minlength="4"
            maxlength="20"
            variant="outlined"
            counter
          />
          <div class="text-center">
            <v-btn :loading="isSubmitting" type="submit" color="primary">登入</v-btn>
            <v-btn to="/register" elevation="0" variant="text" size="small">還沒有帳號嗎？</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()
const user = useUserStore()

const schema = yup.object({
  account: yup
    .string()
    .required('使用者帳號必填')
    .min(4, '使用者帳號太短')
    .max(20, '使用者帳號太長')
    .test('isAlphanumeric', '使用者帳號格式不符', (value) => validator.isAlphanumeric(value)),
  password: yup.string().required('使用者密碼必填').min(4, '使用者密碼太短').max(20, '使用者密碼太長'),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
const account = useField('account')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  try {
    const { data } = await api.post('/user/login', {
      account: values.account,
      password: values.password,
    })
    user.login(data.result)
    createSnackbar({
      text: '登入成功',
      snackbarProps: {
        color: 'green',
      },
    })
    router.push('/')
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生未知錯誤',
      snackbarProps: {
        color: 'red',
      },
    })
  }
})
</script>

<style scoped>
.home-btn {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1;
}
</style>

<route lang="yaml">
meta:
  layout: register
  title: '登入'
</route>
