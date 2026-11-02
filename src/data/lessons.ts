import type { Lesson } from "../types";

export const LESSONS: Lesson[] = [
  {
    id: "intro",
    title: "Introduction to Japanese",
    level: "N5",
    category: "Starter",
    duration: 18,
    teacherName: "Yuki Tanaka",
    thumbnail:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=900&q=80",
    description:
      "Learn what Japanese is, how the scripts work, and the first useful phrases you can use in daily life.",
    difficulty: "Beginner",
    featured: true
  },
  {
    id: "hiragana",
    title: "Hiragana Basics",
    level: "N5",
    category: "Writing",
    duration: 22,
    teacherName: "Yuki Tanaka",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    description:
      "Master the hiragana vowels and basic sound patterns used in everyday Japanese.",
    difficulty: "Beginner",
    featured: true
  },
  {
    id: "greetings",
    title: "Everyday Greetings",
    level: "N5",
    category: "Conversation",
    duration: 14,
    teacherName: "Yuki Tanaka",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    description:
      "Say hello, thank you, and goodbye in polite Japanese conversations.",
    difficulty: "Beginner",
    featured: false
  },
  {
    id: "travel",
    title: "Travel Japanese",
    level: "N4",
    category: "Travel",
    duration: 25,
    teacherName: "Yuki Tanaka",
    thumbnail:
      "https://images.unsplash.com/photo-1505761671935-60eb3c0f2e7f?auto=format&fit=crop&w=900&q=80",
    description:
      "Essential phrases for stations, directions, shops, and restaurants.",
    difficulty: "Elementary",
    featured: true
  }
];