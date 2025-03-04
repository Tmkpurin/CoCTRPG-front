<template>
  <v-app-bar>
    <v-container fluid class="d-flex align-center">
      <v-btn to="/" :active="false" class="text-h5">調查員之家</v-btn>
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn to="/rulebook" v-bind="props">規則書</v-btn>
        </template>
        <v-list>
          <template v-for="lang in langs" :key="lang.text">
            <!-- 有子選單的項目 -->
            <v-menu v-if="lang.children" open-on-hover location="end">
              <template #activator="{ props }">
                <v-list-item v-bind="props" :to="lang.to">
                  {{ lang.text }}<v-icon icon="mdi-menu-right" size="x-small"></v-icon>
                </v-list-item>
              </template>
              <v-list>
                <v-list-item v-for="child in lang.children" :key="child.text" :to="child.to">
                  {{ child.text }}
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-list>
      </v-menu>

      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn to="/data" v-bind="props">關於調查員</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="apple in apples" :key="apple.value" :to="apple.to">
            {{ apple.text }}
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
      <v-btn v-if="!user.isLoggedIn" to="/register" :active="false">註冊</v-btn>
      <v-btn v-if="!user.isLoggedIn" to="/login" :active="false">登入</v-btn>
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn v-if="user.isLoggedIn" v-bind="props">{{ user.account }}<v-icon icon="mdi-menu-down"></v-icon></v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="banana in bananas"
            :key="banana.value"
            :to="banana.to"
            @click="banana.text === '登出' ? logout() : null"
          >
            {{ banana.text }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()

const langs = [
  {
    text: '開始',
    to: '/rulebook#start',
    children: [
      { text: 'AAAA', to: '/rulebook#start-aaaa' },
      { text: 'BBBB', to: '/rulebook#start-bbbb' },
    ],
  },
  {
    text: '玩家',
    to: '/rulebook#player',
    children: [
      { text: 'CCCC', to: '/rulebook#player-cccc' },
      { text: 'DDDD', to: '/rulebook#player-dddd' },
    ],
  },
  {
    text: '主持人',
    to: '/rulebook#host',
    children: [
      { text: 'EEEE', to: '/rulebook#host-eeee' },
      { text: 'FFFF', to: '/rulebook#host-ffff' },
    ],
  },
]

const apples = [
  { to: '/data', text: '你好' },
  { to: '/data', text: '不好' },
]

const bananas = [
  { to: '/charalist', text: '角色列表' },
  { to: '/charasheetNew', text: '創建角色' },
  { to: '/schedule', text: '日程表' },
  { text: '登出' },
]

const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
  } catch (error) {
    console.log(error)
  }
  user.logout()
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'green',
    },
  })
  router.push('/')
}
</script>
