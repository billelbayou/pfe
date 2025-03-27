export type Course = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  courseName: string;
  grade: number;
  transcriptId: string;
};

export type Transcript = {
  id: string;
  studentId: string;
  semester: string;
  year: string;
  average: number;
  credits: number;
  status: string;
  unites: Unite[];
};
export type User = {
  role: "STUDENT" | "ADMIN";
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export interface Module {
  name: string;
  title: string;
  coef: number;
  credit: number;
  poids_tp: number;
  poids_td: number;
  poids_exam: number;
}

export interface Unite {
  name: string;
  title: string;
  modules: Module[];
  coef: number;
  credits_origine: number;
}

export interface Semestre {
  name: string;
  unites: Unite[];
  coef: number;
  credits_origine: number;
}

export interface AcademicYear {
  semestre1: Semestre;
  semestre2: Semestre;
}


