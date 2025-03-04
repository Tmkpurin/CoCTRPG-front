<template>
  <v-navigation-drawer :width="300">
    <v-list-item class="d-flex flex-column align-center text-center">
      <v-list-item-title>My Application</v-list-item-title>
      <v-list-item-subtitle>Vuetify</v-list-item-subtitle>
    </v-list-item>

    <v-list-item class="text-center" link title="List Item 1"></v-list-item>
    <v-list-item class="text-center" link title="List Item 2"></v-list-item>
    <v-list-item class="text-center" link title="List Item 3"></v-list-item>
  </v-navigation-drawer>
  <v-container> 你好 </v-container>
</template>

<route lang="yaml">
meta:
  title: '數值一覽'
</route>
