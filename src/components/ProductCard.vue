<template>
  <v-card max-width="800" class="mx-auto">
    <v-card-title>角色卡</v-card-title>
    <v-card-text>
      <v-form :disabled="isSubmitting" @submit.prevent="submit" @keydown.enter.prevent>
        <!-- 文字資料 -->
        名前
        <v-text-field v-model="investigatorname.value.value" type="text"></v-text-field>
        職業
        <v-text-field v-model="occupation.value.value" type="text"></v-text-field>
        学校・学位
        <v-text-field v-model="collegesdegrees.value.value" type="text"></v-text-field>
        出身
        <v-text-field v-model="birthplace.value.value" type="text"></v-text-field>
        精神的な障害
        <v-text-field v-model="mentaldisorders.value.value" type="text"></v-text-field>
        性別
        <v-text-field v-model="sex.value.value" type="text"></v-text-field>
        年齢
        <v-text-field v-model="age.value.value" type="text"></v-text-field>

        <!-- 數值屬性 -->
        STR
        <v-text-field v-model="str.value.value" type="number"></v-text-field>
        CON
        <v-text-field v-model="con.value.value" type="number"></v-text-field>
        POW
        <v-text-field v-model="pow.value.value" type="number"></v-text-field>
        DEX
        <v-text-field v-model="dex.value.value" type="number"></v-text-field>
        APP
        <v-text-field v-model="app.value.value" type="number"></v-text-field>
        SIZ
        <v-text-field v-model="siz.value.value" type="number"></v-text-field>
        INT
        <v-text-field v-model="int.value.value" type="number"></v-text-field>
        EDU
        <v-text-field v-model="edu.value.value" type="number"></v-text-field>
        HP
        <v-text-field v-model="hp.value.value" type="number"></v-text-field>
        MP
        <v-text-field v-model="mp.value.value" type="number"></v-text-field>
        Idea
        <v-text-field v-model="idea.value.value" type="number"></v-text-field>
        Know
        <v-text-field v-model="know.value.value" type="number"></v-text-field>
        Luck
        <v-text-field v-model="luck.value.value" type="number"></v-text-field>
        SAN
        <v-text-field v-model="san.value.value" type="number"></v-text-field>
        DB
        <v-text-field v-model="db.value.value" type="text"></v-text-field>

        <!-- 技能 -->
        目星
        <v-text-field v-model="spothidden.value.value" type="number"></v-text-field>
        聞き耳
        <v-text-field v-model="listen.value.value" type="number"></v-text-field>
        図書館
        <v-text-field v-model="libraryuse.value.value" type="number"></v-text-field>

        <VueFileAgent
          ref="fileAgent"
          v-model="fileRecords"
          v-model:raw-model-value="rawFileRecords"
          accept="image/jpeg, image/png"
          deletable
          max-size="1MB"
          :help-text="'fileAgent.helpText'"
        ></VueFileAgent>
        <v-card-actions>
          <v-btn type="submit" :loading="isSubmitting"> 儲存 </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import { useAxios } from '@/composables/axios'
import * as yup from 'yup'

const { apiAuth } = useAxios()

const schema = yup.object({
  investigatorname: yup.string().default(''),
  occupation: yup.string().default(''),
  collegesdegrees: yup.string().default(''),
  birthplace: yup.string().default(''),
  mentaldisorders: yup.string().default(''),
  sex: yup.string().default(''),
  age: yup.string().default(''),
  str: yup.number().integer().default(0),
  con: yup.number().integer().default(0),
  pow: yup.number().integer().default(0),
  dex: yup.number().integer().default(0),
  app: yup.number().integer().default(0),
  siz: yup.number().integer().default(0),
  int: yup.number().integer().default(0),
  edu: yup.number().integer().default(0),
  idea: yup.number().integer().default(0),
  know: yup.number().integer().default(0),
  luck: yup.number().integer().default(0),
  hp: yup.number().integer().default(0),
  mp: yup.number().integer().default(0),
  db: yup.string().default('0'),
  spothidden: yup.number().integer().default(0),
  listen: yup.number().integer().default(0),
  libraryuse: yup.number().integer().default(0),
})

// useForm要在useField之前
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
// 定義所有 `useField` 來綁定表單欄位
// useField要在useForm之後
const investigatorname = useField('investigatorname')
const occupation = useField('occupation')
const collegesdegrees = useField('collegesdegrees')
const birthplace = useField('birthplace')
const mentaldisorders = useField('mentaldisorders')
const sex = useField('sex')
const age = useField('age')

const str = useField('str')
const con = useField('con')
const pow = useField('pow')
const dex = useField('dex')
const app = useField('app')
const siz = useField('siz')
const int = useField('int')
const edu = useField('edu')
const idea = useField('idea')
const know = useField('know')
const luck = useField('luck')
const hp = useField('hp')
const mp = useField('mp')
const san = useField('san')
const db = useField('db')

const spothidden = useField('spothidden')
const listen = useField('listen')
const libraryuse = useField('libraryuse')

const fileRecords = ref([])
const rawFileRecords = ref([])

// const createChara = async () => {
//   const response = await apiAuth.post('/charasheetsix')
//   const data = response.data
//   data.forEach((item) => {
//     charasheetsix.push(item)
//   })
// }

// 提交表單
const submit = handleSubmit(async (values) => {
  console.log('Submitting form values', values)
  // 確保有選擇圖片
  if (fileRecords.value[0]?.error) return
  if (fileRecords.value.length === 0) {
    return // 直接返回，不顯示錯誤訊息
  }

  try {
    console.log(values)
    const fd = new FormData()
    fd.append('sex', values.sex)

    // 將所有表單數據加入 FormData
    // Object.entries(values).forEach(([key, value]) => {
    //   fd.append(key, value)
    // })

    // // 如果有圖片，加入圖片檔案
    // if (fileRecords.value.length > 0) {
    //   fd.append('image', fileRecords.value[0].file)
    // }

    // 發送 POST 請求到 /charasheetsix 新增角色卡
    await apiAuth.post('/charasheetsix', fd)
    // await apiAuth.post('/charasheetsix', {
    //   fd,
    // })

    console.log('新增成功')
    console.log(fd)
    // 可依需求在這裡重置表單、清空圖片等操作
  } catch (error) {
    console.error('提交失敗', error)
  }
})
</script>
