<template>
  <router-link :to="'/charasheetsix/' + _id" class="card-link">
    <v-card class="hover-card pa-3">
      <v-row align="center">
        <v-col>
          <v-card-title>{{ version }}</v-card-title>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-card-subtitle>最後更新時間：{{ formatDate(updatedAt) }}</v-card-subtitle>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col>
          <v-card-title>{{ investigator_name || '未設定' }}</v-card-title>
        </v-col>
        <v-col>
          <v-card-subtitle>{{ occupation }}</v-card-subtitle>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-img :src="image" height="80" max-width="100" contain></v-img>
        </v-col>
      </v-row>
    </v-card>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString()
}

defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: {
    type: String,
    default: '',
  },
  // eslint-disable-next-line vue/prop-name-casing
  investigator_name: {
    type: String,
    default: '',
  },
  occupation: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  version: {
    type: String,
    default: '',
  },
  updatedAt: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.hover-card {
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}
.hover-card:hover {
  background-color: #333333; /* 懸停時變淡灰色 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 增加陰影 */
}
</style>
