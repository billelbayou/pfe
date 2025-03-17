export type User = {
  role: "STUDENT" | "ADMIN";
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};
