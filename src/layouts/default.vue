<template>
  <v-app-bar>
    <v-container fluid class="d-flex align-center">
      <v-btn to="/" :active="false" class="text-h5">調查員之家</v-btn>
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn to="/rulebook" v-bind="props">規則書</v-btn>
        </template>
        <v-list>
          <template v-for="rulebook in rulebooks" :key="rulebook.text">
            <!-- 有子選單的項目 -->
            <v-menu v-if="rulebook.children" open-on-hover location="end">
              <template #activator="{ props }">
                <v-list-item v-bind="props" :to="rulebook.to">
                  {{ rulebook.text }}<v-icon icon="mdi-menu-right" size="x-small"></v-icon>
                </v-list-item>
              </template>
              <v-list>
                <v-list-item v-for="child in rulebook.children" :key="child.text" :to="child.to">
                  {{ child.text }}
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-list>
      </v-menu>

      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn to="/aboutinvestigators" v-bind="props">關於調查員</v-btn>
        </template>
        <v-list>
          <template v-for="aboutinvestigator in aboutinvestigators" :key="aboutinvestigator.text">
            <!-- 有子選單的項目 -->
            <v-menu v-if="aboutinvestigator.children" open-on-hover location="end">
              <template #activator="{ props }">
                <v-list-item v-bind="props" :to="aboutinvestigator.to">
                  {{ aboutinvestigator.text }}<v-icon icon="mdi-menu-right" size="x-small"></v-icon>
                </v-list-item>
              </template>
              <v-list>
                <v-list-item v-for="child in aboutinvestigator.children" :key="child.text" :to="child.to">
                  {{ child.text }}
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
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

const rulebooks = [
  {
    text: '遊戲系統',
    to: '/rulebook#gamesystem',
    children: [{ text: '桌上角色扮演遊戲', to: '/rulebook#r1-1' }],
  },
  {
    text: '導言',
    to: '/rulebook#introduction',
    children: [
      { text: '何謂克蘇魯神話', to: '/rulebook#r2-1' },
      { text: '何謂TRPG', to: '/rulebook#r2-2' },
      { text: '遊玩的目的', to: '/rulebook#r2-3' },
      { text: '守秘人', to: '/rulebook#r2-4' },
      { text: '玩家', to: '/rulebook#r2-5' },
      { text: '玩家之間的合作', to: '/rulebook#r2-6' },
      { text: '遊戲的背景世界', to: '/rulebook#r2-7' },
    ],
  },
]
const aboutinvestigators = [
  {
    text: '能力値',
    to: '/aboutinvestigators#characteristics',
    children: [
      { text: 'STR', to: '/aboutinvestigators#str' },
      { text: 'CON', to: '/aboutinvestigators#con' },
      { text: 'SIZ', to: '/aboutinvestigators#siz' },
      { text: 'INT', to: '/aboutinvestigators#int' },
      { text: 'POW', to: '/aboutinvestigators#pow' },
      { text: 'DEX', to: '/aboutinvestigators#dex' },
      { text: 'APP', to: '/aboutinvestigators#app-1' },
      { text: 'EDU', to: '/aboutinvestigators#edu' },
      { text: 'SAN', to: '/aboutinvestigators#san' },
    ],
  },
  {
    text: '能力值檢定',
    to: '/aboutinvestigators#characteristicrolls',
    children: [
      { text: '〈靈感〉檢定', to: '/aboutinvestigators#idea' },
      { text: '〈幸運〉檢定', to: '/aboutinvestigators#luck' },
      { text: '〈知識〉檢定', to: '/aboutinvestigators#know' },
      { text: '傷害獎勵', to: '/aboutinvestigators#db' },
      { text: '耐久力', to: '/aboutinvestigators#hp' },
      { text: '魔力點數', to: '/aboutinvestigators#mp' },
    ],
  },
  {
    text: '背景',
    to: '/aboutinvestigators#background',
    children: [
      { text: '調查員的性別', to: '/aboutinvestigators#sex' },
      { text: '姓名與年齡', to: '/aboutinvestigators#nameage' },
      { text: '出身地', to: '/aboutinvestigators#birthplace' },
      { text: '傷痕與精神障礙', to: '/aboutinvestigators#mentaldisorders' },
      { text: '肖像畫', to: '/aboutinvestigators#image' },
    ],
  },
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
