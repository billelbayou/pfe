import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: string;
  role?: "ADMIN" | "STUDENT";
}

export interface Module {
  name: string;
  coef: number;
  td: number | undefined;
  tp: number | undefined;
  exam: number;
  moyenne: number;
  credit: number;
}

export interface Unite {
  name: string;
  title: string;
  coefficient: number;
  moyenne: number;
  credits: number;
  modules: Module[];
}

export interface Semestre {
  moyenne: number;
  credits: number;
  unites: Unite[];
}

export interface DataInterface {
  year: string;
  semestreNum: 1 | 2 | 3 | 4 | 5 | 6;
  semestre: Semestre;
}
