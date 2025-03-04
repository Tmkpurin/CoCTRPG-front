<template>
  <router-link :to="'/charasheetsix/' + _id" class="card-link">
    <v-list-item class="list-item">
      <v-container>
        <!-- 上排：version & updatedAt -->
        <v-row class="align-center">
          <v-col>
            <v-list-item-subtitle class="text-truncate">
              {{ version }}
            </v-list-item-subtitle>
          </v-col>
          <v-col class="text-right">
            <v-list-item-subtitle v-if="updatedAt" class="text-truncate">
              最後更新：{{ formatDate(updatedAt) }}
            </v-list-item-subtitle>
          </v-col>
        </v-row>

        <!-- 下排：圖片 + investigator_name & occupation -->
        <v-row class="align-center">
          <v-col cols="1">
            <v-avatar size="50">
              <v-img v-if="image" :src="image"></v-img>
              <v-icon v-else>mdi-account</v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="11">
            <v-list-item-title class="text-truncate">
              {{ investigator_name || '未設定' }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-truncate">
              {{ occupation }}
            </v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-list-item>
  </router-link>
</template>

<script setup>
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
  border: 1px solid rgb(100, 100, 100);
}
.list-item {
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}
.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-item:hover {
  background-color: #333333; /* 懸停時變淡灰色 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 增加陰影 */
}
.v-row + .v-row {
  margin-top: 0px;
}
</style>
