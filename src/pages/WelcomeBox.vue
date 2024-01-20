<template>
  <div class="background">
    <div class="wrapper-body">
      <button class="btn-start" @click="startExam">เริ่มเลย</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const startExam = () => {
  router.push({ name: "examination" });
};
</script>
<style lang="scss" scoped>
.background {
  background-image: url("../assets/WelcomeBackground.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  .wrapper-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-left: 40px;
    padding-right: 40px;
    height: 100vh;
    .btn-start {
      width: 100%;
      height: 40px;
      margin-bottom: 84px;
      border-radius: 20px;
      border: 1px solid #000;
      background: #f7c116;
      cursor: pointer;
    }
  }
}
</style>
