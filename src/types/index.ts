export type Role = "learner" | "teacher";

export type Screen =
  | "home"
  | "signup"
  | "login"
  | "level"
  | "presentLevel"
  | "placementTest"
  | "testResults"
  | "dashboard"
  | "lesson"
  | "vocabulary"
  | "teacher";

export type LevelKey = "N5" | "N4" | "N3" | "N2" | "N1";

export type PresentLevel = "0" | "N5" | "N4" | "N3" | "N2" | "N1";

export interface PlacementQuestion {
  category: "Vocabulary" | "Grammar" | "Reading";
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  level: LevelKey | null;
  presentLevel?: PresentLevel;
  onboardingComplete: boolean;

  // Student and general profile information
  country?: string;
  countryCode?: string;
  phone?: string;
  dateOfBirth?: string;
  profilePicture?: string;
  displayLanguage?: "Japanese" | "English";

  // Teacher application information
  qualification?: "JLPT N1" | "JLPT N2";
  experience?: string;
  education?: string;
  teachingLanguage?: "Japanese" | "English" | "Both";
  biography?: string;
  proof?: string;
  teachingDemo?: string;

  // Application status
  applicationStatus?: "not_submitted" | "pending_review" | "approved" | "rejected";
}

export interface Lesson {
  id: string;
  title: string;
  level: string;
  category: string;
  duration: number;
  teacherName: string;
  thumbnail: string;
  description: string;
  difficulty: string;
  featured: boolean;
  progress?: number;
  completed?: boolean;
}

export interface VocabularyItem {
  id: string;
  jp: string;
  kana: string;
  romaji: string;
  meaning: string;
  example: string;
  level: string;
  category: string;
}