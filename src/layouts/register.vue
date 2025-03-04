<template>
  <div class="layout">
    <v-main class="content">
      <router-view></router-view>
    </v-main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.image {
  flex: 1;
  background: url('https://source.unsplash.com/600x400') center/cover no-repeat;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  padding: 20px;
}
</style>
