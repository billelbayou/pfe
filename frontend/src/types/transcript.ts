import { Course } from "./course";

export type Transcript = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  studentId: string;
  courses: Course[];
};
