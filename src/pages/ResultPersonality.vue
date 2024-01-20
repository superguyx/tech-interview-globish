<template>
  <div class="Layout-result">
    <div class="wrapper-result">
      <p class="title-result">ผลลัพธ์ของคุณคือ</p>
      <img
        class="result-image"
        v-if="score <= 90"
        src="../assets/hobbyist.png"
        alt=""
      />
      <img
        class="result-image"
        v-else-if="score <= 130"
        src="../assets/Enthusiastic.png"
        alt=""
      />
      <img class="result-image" v-else src="../assets/Gradual.png" alt="" />
      <p class="bottom-result">คุณรู้จัก Globish ผ่าน</p>
      <div class="wrapper-bottom-result">
        <p
          class="bottom-result"
          :key="index"
          v-for="(text, index) in store.Asking"
        >
          {{ text }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMyStore } from "../Store/store";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useMyStore();

const score = ref(store.getTotalScore());
onMounted(() => {
  if (store.currentPage != 7) {
    router.push({ path: "/" });
  }
});
</script>
<style scoped>
.Layout-result {
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 90px;
}
.wrapper-result {
  height: "auto";
  margin-top: 50px;
  padding-top: 25px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 50px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #000;
  background: #fff;
}
.title-result {
  color: var(--Gray-1, #333);
  text-align: center;
  font-family: "IBM Plex Sans Thai";
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.result-image {
  max-width: 100%;
  height: auto;
}
.wrapper-bottom-result {
  display: flex;
}
.bottom-result {
  color: var(--Gray-1, #333);
  text-align: center;
  font-family: "IBM Plex Sans Thai";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
