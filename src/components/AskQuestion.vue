<template>
  <div>
    <div>Q 7</div>
    <div class="question">
      "คุณรู้จัก Globish ผ่านช่องทางใด(เลือกได้มากกว่า 1 ข้อ)"
    </div>
    <div
      class="choices"
      :class="{ 'active-choice': checked.Facebook }"
      @click="() => toggleCheckbox('Facebook')"
    >
      facebook
    </div>
    <div
      class="choices"
      :class="{ 'active-choice': checked.Instagram }"
      @click="() => toggleCheckbox('Instagram')"
    >
      instagram
    </div>
    <div
      class="choices"
      :class="{ 'active-choice': checked.Orther }"
      @click="() => toggleCheckbox('Orther')"
    >
      อื่นๆ (โปรดระบุ)
    </div>
    <input
      v-if="checked.Orther"
      class="fieldOrther"
      placeholder="โปรดระบุ"
      type="text"
      v-model="textOrther"
      @blur="UpdateOrther(textOrther)"
    />
    <input
      v-if="false"
      type="checkbox"
      id="checkbox"
      v-model="checked.Facebook"
    />
    <input
      v-if="false"
      type="checkbox"
      id="checkbox"
      v-model="checked.Instagram"
    />
    <input
      v-if="false"
      type="checkbox"
      id="checkbox"
      v-model="checked.Orther"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMyStore } from "../Store/store";
const store = useMyStore();
const textOrther = ref("");
const checked = ref({
  Facebook: false,
  Instagram: false,
  Orther: false,
});

const UpdateOrther = (text: string) => {
  store.Asking.push(text + ",");
};
const toggleCheckbox = (checkboxName: keyof typeof checked.value) => {
  checked.value[checkboxName] = !checked.value[checkboxName];
  console.log("key", checkboxName);
  if (checkboxName === "Orther") {
    return;
  }
  store.Asking.push(checkboxName + ", ");
};
</script>

<style scoped>
.fieldOrther {
  width: 100%;
  margin-top: 25px;
  border: 0;
  color: var(--Gray-4, #bdbdbd);
  font-family: "IBM Plex Sans Thai";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-bottom: 1px solid black;
}
.fieldOrther:focus {
  border: none;
}
.question {
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.choices {
  display: flex;
  align-items: center;
  height: 72px;
  border-radius: 20px;
  margin-top: 20px;
  padding-left: 25px;
  padding-right: 25px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: #10153c;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.active-choice {
  background-color: #ffa500;
  color: #fff;
  border-color: #ffa500;
}
</style>
