
export interface Tool {
  name: string;
  category: string;
  reason: string;
}

export interface DayPlan {
  day: number;
  task: string;
  goal: string;
}

export interface Persona {
  role: string;
  behavior: string;
  location: string;
  primaryPainPoint: string;
}

export interface MvpFeatures {
  mustHave: string[];
  niceToHave: string[];
}

export interface SurveyData {
  hoursPerWeek: string;
  hasSpokenToUsers: boolean;
  teamSize: string;
  canBuild: boolean;
  startingBudget: string;
}

export interface StartupPlan {
  name: string;
  elevatorPitch: string;
  problem: string;
  targetAudience: string;
  persona: Persona;
  mvpFeatures: MvpFeatures;
  pitchOutline: string[];
  roadmap: DayPlan[];
  validationChecklist: string[];
  acquisitionStrategy: string;
  toolStack: Tool[];
  readinessScore: number;
}

export interface ReadinessQuestion {
  id: number;
  question: string;
  context: string;
  options: string[];
}

export interface ReadinessResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  blindspots: string[];
  verdict: string;
}

export type AppState = 'idle' | 'analyzing' | 'viewing' | 'resources' | 'community' | 'readiness-check';
