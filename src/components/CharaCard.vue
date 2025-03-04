<template>
  <v-card max-width="800" class="mx-auto" variant="text">
    <v-card-text>
      <v-form :disabled="isSubmitting" @submit.prevent="submit" @keydown.enter.prevent>
        <v-card-actions>
          <v-btn type="submit" :loading="isSubmitting"> 儲存 </v-btn>
        </v-card-actions>
        <v-row>
          <v-col cols="3">
            <!-- <label>名前</label> -->
            <v-text-field v-model="investigatorname.value.value" label="名前" type="text"></v-text-field>
          </v-col>
          <v-col cols="3">
            <label>職業</label>
            <v-text-field v-model="occupation.value.value" type="text"></v-text-field>
          </v-col>
          <v-col cols="3">
            <label>学校・学位</label>
            <v-text-field v-model="collegesdegrees.value.value" type="text"></v-text-field>
          </v-col>
          <v-col cols="3">
            <label>出身</label>
            <v-text-field v-model="birthplace.value.value" type="text"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <label>精神的な障害</label>
            <v-text-field v-model="mentaldisorders.value.value" type="text"></v-text-field>
          </v-col>
          <v-col cols="3">
            <label>性別</label>
            <v-text-field v-model="sex.value.value" type="text"></v-text-field>
          </v-col>
          <v-col cols="3">
            <label>年齢</label>
            <v-text-field v-model="age.value.value" type="text"></v-text-field>
          </v-col>
          <v-col cols="3">
            <label>探索者画像</label>
            <VueFileAgent
              ref="fileAgent"
              v-model="fileRecords"
              v-model:raw-model-value="rawFileRecords"
              accept="image/jpeg, image/png"
              deletable
              max-size="1MB"
              :help-text="'fileAgent.helpText'"
            ></VueFileAgent>
          </v-col>

          <v-col cols="2">
            <label>STR</label>
            <v-text-field v-model="str.value.value" type="number"></v-text-field>
          </v-col>
          <v-col cols="2">
            <label>CON</label>
            <v-text-field v-model="con.value.value" type="number"></v-text-field>
          </v-col>
          <v-col cols="2">
            <label>POW</label>
            <v-text-field v-model="pow.value.value" type="number"></v-text-field>
          </v-col>
          <v-col cols="2">
            <label>DEX</label>
            <v-text-field v-model="dex.value.value" type="number"></v-text-field>
          </v-col>
          <v-col cols="2">
            <label>APP</label>
            <v-text-field v-model="app.value.value" type="number"></v-text-field>
          </v-col>
          <v-col cols="2">
            <label>SIZ</label>
            <v-text-field v-model="siz.value.value" type="number"></v-text-field>
          </v-col>
          <v-col cols="2">
            <label>INT</label>
            <v-text-field v-model="int.value.value" type="number"></v-text-field>
          </v-col>
          <v-col cols="2">
            <label>EDU</label>
            <v-text-field v-model="edu.value.value" type="number"></v-text-field>
          </v-col>

          <v-col cols="2">
            <label>HP</label>
            <v-text-field v-model="hp.value.value" type="number"></v-text-field>
          </v-col>
          <v-col cols="2">
            <label>MP</label>
            <v-text-field v-model="mp.value.value" type="number"></v-text-field>
          </v-col>
          <v-col cols="2">
            <label>Idea</label>
            <v-text-field v-model="idea.value.value" type="number"></v-text-field>
          </v-col>
          <v-col cols="2">
            <label>Know</label>
            <v-text-field v-model="know.value.value" type="number"></v-text-field>
          </v-col>

          <v-col cols="2">
            <label>Luck</label>
            <v-text-field v-model="luck.value.value" type="number"></v-text-field>
          </v-col>
          <v-col cols="2">
            <label>SAN</label>
            <v-text-field v-model="san.value.value" type="number"></v-text-field>
          </v-col>
          <v-col cols="2">
            <label>DB</label>
            <v-text-field v-model="db.value.value" type="text"></v-text-field>
          </v-col>
        </v-row>

        <!-- 技能 -->
        目星
        <v-text-field v-model="spothidden.value.value" type="number"></v-text-field>
        聞き耳
        <v-text-field v-model="listen.value.value" type="number"></v-text-field>
        図書館
        <v-text-field v-model="libraryuse.value.value" type="number"></v-text-field>

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
import { useSnackbar } from 'vuetify-use-dialog'
import * as yup from 'yup'

const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

// 要給 useForm 的 schema
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
  san: yup.number().integer().default(0),
  db: yup.string().default('0'),
  spothidden: yup.number().integer().default(0),
  listen: yup.number().integer().default(0),
  libraryuse: yup.number().integer().default(0),
})

// useForm 要在 useField之前
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
// 定義所有 `useField` 來綁定表單欄位
// useField 要在 useForm之後
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

// 圖片的上傳
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
  try {
    console.log('按完送出:', values)
    const fd = new FormData()

    fd.append('investigatorname', values.investigatorname)
    fd.append('occupation', values.occupation)
    fd.append('collegesdegrees', values.collegesdegrees)
    fd.append('birthplace', values.birthplace)
    fd.append('mentaldisorders', values.mentaldisorders)
    fd.append('sex', values.sex)
    fd.append('age', values.age)

    fd.append('str', values.str)
    fd.append('con', values.con)
    fd.append('pow', values.pow)
    fd.append('dex', values.dex)
    fd.append('app', values.app)
    fd.append('siz', values.siz)
    fd.append('int', values.int)
    fd.append('edu', values.edu)
    fd.append('idea', values.idea)
    fd.append('know', values.know)
    fd.append('luck', values.luck)
    fd.append('hp', values.hp)
    fd.append('mp', values.mp)
    fd.append('san', values.san)
    fd.append('db', values.db)

    fd.append('spothidden', values.spothidden)
    fd.append('listen', values.listen)
    fd.append('libraryuse', values.libraryuse)

    if (fileRecords.value.length > 0 && fileRecords.value[0]?.file) {
      fd.append('image', fileRecords.value[0].file)
    }
    await apiAuth.post('/charasheetsix', fd)
    createSnackbar({
      text: '表單提交成功',
      snackbarProps: { color: 'green' },
    })
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || 'unknownError',
      snackbarProps: { color: 'red' },
    })
  }
})
</script>
