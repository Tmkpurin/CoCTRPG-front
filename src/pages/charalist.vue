<template>
  <v-container width="800px" fluid>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" hide-details></v-text-field>
      </v-col>
      <v-col v-for="charasheetsix in filteredCharas" :key="charasheetsix._id" cols="12">
        <list-card v-bind="charasheetsix"></list-card>
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="totalPage"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'
import ListCard from '@/components/ListCard.vue'

const { apiAuth } = useAxios()

const ITEMS_PER_PAGE = 5
const currentPage = ref(1)
const charas = ref([])
const search = ref('')

const totalPage = computed(() => Math.ceil(charas.value.length / ITEMS_PER_PAGE))

const filteredCharas = computed(() => {
  if (!charas.value.length) return [] // 確保資料存在

  const searchTerm = search.value.toLowerCase()

  return charas.value
    .filter(
      (charasheetsix) =>
        charasheetsix.investigator_name?.toLowerCase().includes(searchTerm) ||
        charasheetsix.investigator_name.includes(search.value),
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // 按 updatedAt 降序排列
    .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE)
})

const getCharas = async () => {
  try {
    const { data } = await apiAuth.get('/charasheetsix')
    console.log('API 回應數據:', data)
    charas.value = data.result
    // charas.value.unshift(...data.result)
  } catch (error) {
    console.log('API 請求錯誤:', error)
  }
}
console.log('角色數據:', charas.value)
getCharas()
</script>

<route lang="yaml">
meta:
  login: true
  title: '角色列表'
</route>
