<template>
  <div class="Layout-Questions">
    <div :class="wrapperClass">
      <div
        v-for="i in 7"
        :key="i"
        :class="{
          'active-button': i <= CurrentChoice,
          'inactive-button': i > CurrentChoice,
        }"
      ></div>
    </div>
    <div class="wrapper-choice">
      <div v-if="CurrentChoice < 7">
        <div>Q {{ Question?.id }}</div>
        <div class="question">{{ Question?.Question }}</div>
        <div :key="i" v-for="(e, i) in Question?.choices">
          <div
            class="choices"
            :class="{
              'active-choice': getSelected === e.score && getSelected != 0,
            }"
            @click="setSelected(e.score)"
          >
            {{ e.choice }}
          </div>
        </div>
      </div>
      <div v-if="CurrentChoice === 7">
        <AskQuestion :data="store.Asking" />
      </div>
    </div>
    <div class="wrapperButton">
      <button class="prevBtn" @click="prevChoice">กลับ</button>
      <button v-if="CurrentChoice < 7" class="nextBtn" @click="nextChoice">
        ต่อไป
      </button>
      <button v-if="CurrentChoice > 6" class="nextBtn" @click="GoResultPage">
        ดูผลลัพท์
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useMyStore } from "../Store/store";
import AskQuestion from "@/components/AskQuestion.vue";

interface ExamData {
  id: number;
  Question: string;
  choices: { choice: string; score: number }[];
}

const store = useMyStore();
const router = useRouter();
const Question = ref<ExamData | null>(null);
const CurrentChoice = ref(store.currentPage);
const select = ref(false);
const getSelected = ref<number | boolean>(false);
const GetQuestion = () => {
  Question.value = store.getExamById(CurrentChoice.value);
  getSelected.value = store.getScoreById(CurrentChoice.value) || false;
};

const setSelected = (score: number) => {
  getSelected.value = score;
  select.value = true;
  if (CurrentChoice.value === 7) {
    return;
  }
  setScore(score);
};

const setScore = (newScore: number) => {
  if (Question.value?.id) {
    const existingScoreIndex = store.allScore.findIndex(
      (score) => score.id === Question.value?.id
    );
    if (existingScoreIndex !== -1) {
      store.allScore[existingScoreIndex].score = newScore;
    } else {
      store.allScore.push({ id: Question.value?.id, score: newScore });
      select.value = !select.value;
    }
  }
};

const prevChoice = () => {
  CurrentChoice.value = Math.max(CurrentChoice.value - 1, 1);
};

const nextChoice = () => {
  const existsInScore = store.allScore.some(
    (score) => score.id === CurrentChoice.value
  );
  if (existsInScore) {
    CurrentChoice.value = Math.min(CurrentChoice.value + 1, 7);
    select.value = false;
  } else {
    alert("เลือกตัวเลือกก่อนน้า");
  }
};
const GoResultPage = () => router.push({ name: "result-personality" });

onMounted(() => {
  GetQuestion();
});

watch(
  () => CurrentChoice.value,
  () => {
    store.currentPage = CurrentChoice.value;
    GetQuestion();
  }
);

const wrapperClass = computed(() => {
  const classes = ["wrapper-step"];

  for (let i = 1; i <= 7; i++) {
    if (i <= CurrentChoice.value) {
      classes.push(`button-${i}-active`);
    } else {
      classes.push(`button-${i}-inactive`);
    }
  }

  return classes.join(" ");
});
</script>

<style scoped>
.Layout-Questions {
  padding-top: 140px;
  padding-left: 40px;
  padding-right: 40px;
}
.wrapper-choice {
  height: auto;
  max-height: 478px;
  margin-top: 50px;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #000;
  background: #fff;
}
.wrapper-step {
  display: flex;
  justify-content: center;
}

.active-button {
  width: 45.147px;
  height: 9px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--Gray-1, #333);
}
.question {
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.inactive-button {
  width: 45.147px;
  height: 9px;
  flex-shrink: 0;
  border-radius: 4px;
  background: white;
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
.choices.active-choice {
  background-color: #ffa500;
  color: #fff;
  border-color: #ffa500;
}
.wrapperButton {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 82px;
}
.prevBtn {
  width: 100%;
  max-width: 96px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #000;
  background: #fffaf5;
}
.nextBtn {
  width: 100%;
  max-width: 200px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #000;
  background: #f7c116;
}
</style>
