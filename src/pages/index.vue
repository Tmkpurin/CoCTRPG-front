<template>
  <v-container class="d-flex justify-center align-center full-height bg-image">
    <div class="content">在人類興起的遙遠以前，這片大地便已受舊日支配<br><br>
      今時星辰再度歸位，沉眠許久的祂們即將重臨世間</div>
  </v-container>
</template>

<style scoped>
html,
body {
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
}
/* 讓背景圖片只影響首頁 */
.bg-image {
  background: url('https://github.com/Tmkpurin/CoCTRPG-front/blob/main/src/assets/Cthulhu-50%25.png?raw=true')
    center/cover no-repeat fixed;
  width: 100vw;
  height: 100vh;
  background-position: top center;
  max-width: 100%;
}

/* 確保內容不被背景影響 */
.content {
  position: relative;
  z-index: 1;
  color: white;
  font-size: 24px;
  font-weight: bold;
}
</style>

<route lang="yaml">
meta:
  title: '首頁'
</route>
