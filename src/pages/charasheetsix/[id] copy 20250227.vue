<template>
  <v-container>
    <v-card max-width="800" class="mx-auto" variant="text">
      <v-card-text>
        <v-form :disabled="isSubmitting" @submit.prevent="submit" @keydown.enter.prevent>
          <v-card-actions>
            <v-btn type="submit" :loading="isSubmitting" variant="outlined"> 儲存 </v-btn>
            <v-spacer />
            <v-btn color="red" :loading="isSubmitting" variant="outlined" @click="handleDelete"> 刪除 </v-btn>
          </v-card-actions>
          <v-divider></v-divider>
          <section class="my-6">
            <v-row align="center" justify="center">
              <v-col v-for="field in fields" :key="field.label" cols="12" class="d-flex align-center">
                <label class="text-h6 mr-2">{{ field.label }}</label>
                <v-text-field
                  v-model="field.model.value.value"
                  type="text"
                  density="compact"
                  variant="outlined"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <label class="text-h6">調查員圖像</label>
                <VueFileAgent
                  ref="fileAgent"
                  v-model="fileRecords"
                  v-model:raw-model-value="rawFileRecords"
                  accept="image/jpeg, image/png"
                  deletable
                  max-size="1MB"
                  :help-text="'點擊選取圖片或拖曳圖片'"
                ></VueFileAgent>
              </v-col>
            </v-row>
          </section>
          <section class="my-6">
            <v-table class="border">
              <thead>
                <tr>
                  <th v-for="(characteristic, index) in characteristics" :key="index" class="text-h6">
                    {{ characteristic.label }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-for="(characteristic, index) in characteristics" :key="index">
                    <v-text-field
                      v-model="characteristic.model.value.value"
                      type="number"
                      density="compact"
                      variant="outlined"
                      :hide-spin-buttons="true"
                      hide-details
                    ></v-text-field>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </section>
          <section class="my-6">
            <v-row>
              <v-col cols="2">
                <label class="text-h6">Idea：{{ computedValues.idea }}</label>
                <!-- <v-text-field v-model="idea.value.value" type="number"></v-text-field> -->
              </v-col>
              <v-col cols="2">
                <label class="text-h6">Know：{{ computedValues.know }}</label>
                <!-- <v-text-field v-model="know.value.value" type="number"></v-text-field> -->
              </v-col>
              <v-col cols="2">
                <label class="text-h6">Luck：{{ computedValues.luck }}</label>
                <!-- <v-text-field v-model="luck.value.value" type="number"></v-text-field> -->
              </v-col>
              <v-col cols="2">
                <label class="text-h6">DB：{{ damageBonus }}</label>
                <!-- <v-text-field v-model="db.value.value" type="text"></v-text-field> -->
              </v-col>
            </v-row>
          </section>
          <section class="my-6">
            <v-row>
              <v-col cols="2">
                <label class="text-h6">HP：{{ computedValues.hp }}</label>
                <v-text-field
                  v-model="hp.value.value"
                  type="number"
                  density="compact"
                  variant="outlined"
                  :hide-spin-buttons="true"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="text-h6">
                <label>MP：{{ computedValues.mp }}</label>
                <v-text-field
                  v-model="mp.value.value"
                  type="number"
                  density="compact"
                  variant="outlined"
                  :hide-spin-buttons="true"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <label class="text-h6">SAN：{{ computedValues.san }}</label>
                <v-text-field
                  v-model="san.value.value"
                  type="number"
                  density="compact"
                  variant="outlined"
                  :hide-spin-buttons="true"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </section>
          <v-divider></v-divider>
          <section class="my-6">
            <v-row justify="start" align="center">
              <v-col cols="2">
                <label class="text-h4">技能</label>
              </v-col>
              <v-col cols="4">
                <label class="text-h6"
                  >職業技能點數：{{ computedValues.occupationpoints }}/{{ computedValues.moveoccupationpoints }}</label
                >
              </v-col>
              <v-col cols="4"
                ><label class="text-h6"
                  >興趣技能點數：{{ computedValues.interestpoints }}/{{ computedValues.moveinterestpoints }}</label
                ></v-col
              >
            </v-row>
          </section>

          <section class="my-6">
            <v-table class="border">
              <thead>
                <tr>
                  <th>技能</th>
                  <th>初始值</th>
                  <th>職業P</th>
                  <th>興趣P</th>
                  <th>成長P</th>
                  <th>合計</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>偵查</td>
                  <td>{{ fixedSpothidden }}</td>
                  <td>
                    <v-text-field
                      v-model="opspothidden.value.value"
                      type="number"
                      density="compact"
                      variant="outlined"
                      :hide-spin-buttons="true"
                      hide-details
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      v-model="ipspothidden.value.value"
                      type="number"
                      density="compact"
                      variant="outlined"
                      :hide-spin-buttons="true"
                      hide-details
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      v-model="gpspothidden.value.value"
                      type="number"
                      density="compact"
                      variant="outlined"
                      :hide-spin-buttons="true"
                      hide-details
                    ></v-text-field>
                  </td>
                  <td>{{ computedValues.totalspothidden }}</td>
                </tr>
              </tbody>
            </v-table>
          </section>

          <v-card-actions>
            <v-btn type="submit" :loading="isSubmitting" variant="outlined"> 儲存 </v-btn>
            <v-spacer />
            <v-btn color="red" :loading="isSubmitting" variant="outlined" @click="handleDelete"> 刪除 </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useAxios()
const route = useRoute()
const router = useRouter()
const user = useUserStore()
const createSnackbar = useSnackbar()

const charasheetsix = ref({
  _id: '',
  version: '',
  investigator_name: '',
  occupation: '',
  colleges_degrees: '',
  birthplace: '',
  mental_disorders: '',
  sex: '',
  age: '',
  str: 0,
  con: 0,
  pow: 0,
  dex: 0,
  app: 0,
  siz: 0,
  int: 0,
  edu: 0,
  idea: 0,
  know: 0,
  luck: 0,
  hp: 0,
  mp: 0,
  san: 0,
  db: '0',
  opspothidden: 0,
  ipspothidden: 0,
  gpspothidden: 0,
  image: '',
})

const getChara = async () => {
  try {
    const { data } = await apiAuth.get('/charasheetsix/' + route.params.id)
    console.log(data)
    charasheetsix.value = data.result
    document.title = charasheetsix.value.investigator_name + ' | 調查員之家'

    // 將 API 回傳的資料同步到 useField 綁定的變數
    investigator_name.setValue(charasheetsix.value.investigator_name)
    occupation.setValue(charasheetsix.value.occupation)
    colleges_degrees.setValue(charasheetsix.value.colleges_degrees)
    birthplace.setValue(charasheetsix.value.birthplace)
    mental_disorders.setValue(charasheetsix.value.mental_disorders)
    sex.setValue(charasheetsix.value.sex)
    age.setValue(charasheetsix.value.age)

    str.setValue(charasheetsix.value.str)
    con.setValue(charasheetsix.value.con)
    pow.setValue(charasheetsix.value.pow)
    dex.setValue(charasheetsix.value.dex)
    app.setValue(charasheetsix.value.app)
    siz.setValue(charasheetsix.value.siz)
    int.setValue(charasheetsix.value.int)
    edu.setValue(charasheetsix.value.edu)
    idea.setValue(charasheetsix.value.idea)
    know.setValue(charasheetsix.value.know)
    luck.setValue(charasheetsix.value.luck)
    hp.setValue(charasheetsix.value.hp)
    mp.setValue(charasheetsix.value.mp)
    san.setValue(charasheetsix.value.san)
    db.setValue(charasheetsix.value.db)
    opspothidden.setValue(charasheetsix.value.opspothidden)
    ipspothidden.setValue(charasheetsix.value.ipspothidden)
    gpspothidden.setValue(charasheetsix.value.gpspothidden)
  } catch (error) {
    console.log(error)
    router.push('/')
  }
}

getChara()

// 要給 useForm 的 schema
const schema = yup.object({
  investigator_name: yup.string().default(''),
  occupation: yup.string().default(''),
  colleges_degrees: yup.string().default(''),
  birthplace: yup.string().default(''),
  mental_disorders: yup.string().default(''),
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
  db: yup.string().default(''),

  opspothidden: yup.number().integer().default(0),
  ipspothidden: yup.number().integer().default(0),
  gpspothidden: yup.number().integer().default(0),
})

// useForm 要在 useField之前
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
// 定義所有 `useField` 來綁定表單欄位
// useField 要在 useForm之後
const investigator_name = useField('investigator_name')
const occupation = useField('occupation')
const colleges_degrees = useField('colleges_degrees')
const birthplace = useField('birthplace')
const mental_disorders = useField('mental_disorders')
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

const opspothidden = useField('opspothidden')
const ipspothidden = useField('ipspothidden')
const gpspothidden = useField('gpspothidden')

const fields = [
  { label: '姓名', model: investigator_name },
  { label: '職業', model: occupation },
  { label: '學校・學位', model: colleges_degrees },
  { label: '出身', model: birthplace },
  { label: '精神障害', model: mental_disorders },
  { label: '性別', model: sex },
  { label: '年齡', model: age },
]

const characteristics = [
  { label: 'STR', model: str },
  { label: 'CON', model: con },
  { label: 'POW', model: pow },
  { label: 'DEX', model: dex },
  { label: 'APP', model: app },
  { label: 'SIZ', model: siz },
  { label: 'INT', model: int },
  { label: 'EDU', model: edu },
]

// 圖片的上傳
const fileRecords = ref([])
const rawFileRecords = ref([])

//固定值設定
const fixedSpothidden = 25

// 顯示出來的的值
const computedValues = computed(() => ({
  hp: Math.ceil(((parseFloat(con.value.value) || 0) + (parseFloat(siz.value.value) || 0)) / 2),
  mp: parseFloat(pow.value.value) || 0,
  idea: parseFloat(int.value.value * 5) || 0,
  know: parseFloat(edu.value.value * 5) || 0,
  luck: parseFloat(pow.value.value * 5) || 0,
  san: parseFloat(pow.value.value * 5) || 0,

  occupationpoints: parseFloat(edu.value.value) * 20 || 0,
  moveoccupationpoints: parseFloat(opspothidden.value.value) || 0,
  interestpoints: parseFloat(int.value.value) * 10 || 0,
  moveinterestpoints: parseFloat(ipspothidden.value.value) || 0,
  totalspothidden:
    fixedSpothidden +
    (parseFloat(opspothidden.value.value) || 0) +
    (parseFloat(ipspothidden.value.value) || 0) +
    (parseFloat(gpspothidden.value.value) || 0),
}))
const damageBonus = computed(() => {
  const total = (parseFloat(str.value.value) || 0) + (parseFloat(siz.value.value) || 0)

  if (total <= 12) return '-1D6'
  if (total <= 16) return '-1D4'
  if (total <= 24) return '0'
  if (total <= 32) return '+1D4'
  if (total <= 40) return '+1D6'

  return `+${Math.floor((total - 25) / 16) + 1}D6`
})

// 提交表單
const submit = handleSubmit(async (values) => {
  if (!user.isLoggedIn) {
    router.push('/login')
    return
  }
  try {
    console.log('按完送出:', values)
    const fd = new FormData()

    fd.append('investigator_name', values.investigator_name)
    fd.append('occupation', values.occupation)
    fd.append('colleges_degrees', values.colleges_degrees)
    fd.append('birthplace', values.birthplace)
    fd.append('mental_disorders', values.mental_disorders)
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

    fd.append('opspothidden', values.opspothidden)
    fd.append('ipspothidden', values.ipspothidden)
    fd.append('gpspothidden', values.gpspothidden)

    if (fileRecords.value.length > 0 && fileRecords.value[0]?.file) {
      fd.append('image', fileRecords.value[0].file)
    }
    const id = charasheetsix.value._id
    await apiAuth.patch(`/charasheetsix/${id}`, fd)
    createSnackbar({
      text: '保存成功',
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

const handleDelete = async () => {
  if (!confirm(`確定要刪除角色卡「${charasheetsix.value.investigator_name}」嗎？`)) return

  isSubmitting.value = true // 設定 loading 狀態

  try {
    const id = charasheetsix.value._id
    // console.log('開始刪除', id)
    await apiAuth.delete(`/charasheetsix/${id}`)
    router.push('/charalist')
    // alert('刪除成功！')
  } catch (error) {
    console.log('刪除失敗', error)
    alert('刪除失敗，請稍後再試！')
  } finally {
    isSubmitting.value = false // 取消 loading
  }
}
</script>

<style scoped>
.v-table {
  table-layout: fixed; /* 使表格的列寬平分 */
  width: 100%; /* 可選，設定表格寬度為100% */
}
.v-table thead th,
.v-table tbody td {
  border: 1px solid rgb(119, 119, 119);
  width: 12.5%; /* 設定每列寬度為100%的1/8 */
  text-align: center; /* 讓文字或內容居中 */
}
</style>

<!-- <style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style> -->
<route lang="yaml">
meta:
  login: true
  title: '角色卡'
</route>
