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
  createdAt: Date;
  updatedAt: Date;
  studentId: string;
  courses: Course[];
};

export type User = {
  role: "STUDENT" | "ADMIN";
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};
