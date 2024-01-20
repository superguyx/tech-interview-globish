import { defineStore } from "pinia";
interface KeepScore {
  id: number;
  score: number;
}
export const useMyStore = defineStore("myStore", {
  state: () => ({
    allExam: [
      {
        id: 1,
        Question: "ถ้าวันนี้เป็นวันหยุด คุณจะ...",
        choices: [
          { choice: "นอนเล่น พักผ่อน", score: 10 },
          { choice: "ดูหนัง ดูซีรี่ส์ เล่นเกม", score: 20 },
          { choice: "เรียนรู้อะไรใหม่ ๆ", score: 30 },
        ],
      },
      {
        id: 2,
        Question: "คุณต้องการพัฒนาภาษาอังกฤษเพื่ออะไร?",
        choices: [
          { choice: "การทำงาน", score: 30 },
          { choice: "เที่ยวต่างประเทศ", score: 10 },
          { choice: "ใช้ในชีวิตประจำวัน", score: 20 },
        ],
      },
      {
        id: 3,
        Question: "สไตล์การเรียนภาษาอังกฤษของคุณเป็นแบบไหน?",
        choices: [
          {
            choice: "เรียนคอร์สออนไลน์ / โรงเรียนสอนภาษา",
            score: 30,
            selected: false,
          },
          {
            choice: "เรียนด้วยตนเอง เช่น อ่านหนังสือ ดูหนัง ฟังเพลง",
            score: 20,
            selected: false,
          },
          {
            choice: "คุยกับเพื่อนต่างชาติ / ไปเที่ยวต่างประเทศ",
            score: 10,
            selected: false,
          },
        ],
      },
      {
        id: 4,
        Question: "คุณใช้ภาษาอังกฤษบ่อยแค่ไหน?",
        choices: [
          { choice: "เป็นประจำทุกวัน", score: 30 },
          { choice: "เป็นบางครั้ง", score: 10 },
          { choice: "นาน ๆ ที / ไม่ได้ใช้เลย", score: 20 },
        ],
      },
      {
        id: 5,
        Question: "คุณอยากพัฒนาสกิลภาษาอังกฤษสกิลไหนมากที่สุด?",
        choices: [
          { choice: "การฟัง", score: 20 },
          { choice: "การพูด", score: 10 },
          { choice: "การเขียน", score: 30 },
        ],
      },
      {
        id: 6,
        Question: "อยากเรียนภาษาอังกฤษ แต่...",
        choices: [
          { choice: "ไม่มีเวลา", score: 20 },
          {
            choice: "เนื้อหาไม่น่าสนใจ / สอนไม่สนุก",
            score: 10,
            selected: false,
          },
          { choice: "ไม่มั่นใจ", score: 30 },
        ],
      },
    ],
    currentPage: 1,
    Asking: [] as string[],
    allScore: [] as KeepScore[],
  }),
  getters: {},
  actions: {
    getExamById(id: number) {
      return this.allExam.find((item) => item.id === id) || null;
    },
    getScoreById(id: number) {
      const selected = this.allScore.find((item) => item.id === id);
      return selected ? selected.score : false;
    },
    getTotalScore() {
      return this.allScore.reduce((sum, score) => sum + score.score, 0);
    },
  },
});
