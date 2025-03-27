import { getToken } from "@/lib/token";
import React from "react";

type Course = {
  id: string;
  uniteId: string;
  courseName: string;
  exam: number | null;
  td: number | null;
  tp: number | null;
  coefficient: number;
  credits: number;
  moy: number;
};

type Unite = {
  id: string;
  transcriptId: string;
  name: string;
  title: string;
  coef: number;
  credit: number;
  moy: number;
  courses: Course[];
};

type Transcript = {
  id: string;
  studentId: string;
  semester: string;
  year: string;
  average: number;
  credits: number;
  status: string;
  unites: Unite[];
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getToken();
  const response = await fetch(
    `http://localhost:5000/api/transcripts/transcript/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  const transcriptData: Transcript = data.transcript;

  if (!transcriptData) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-center text-2xl font-bold bg-blue-600 text-white py-2">
        {`Semester ${transcriptData.semester} (${transcriptData.year})`}
      </h2>

      <table className="w-full border border-gray-300 mt-4">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-2">Module</th>
            <th className="p-2">Coef</th>
            <th className="p-2">Crédits</th>
            <th className="p-2">Exam</th>
            <th className="p-2">TD</th>
            <th className="p-2">TP</th>
            <th className="p-2">Moyenne</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 text-white text-center">
          {transcriptData.unites.map((unite) => (
            <React.Fragment key={unite.id}>
              <tr className="bg-gray-700 font-bold">
                <td colSpan={7} className="p-2">
                  {unite.title} (Moyenne: {unite.moy})
                </td>
              </tr>
              {unite.courses.map((course) => (
                <tr key={course.id} className="border-b border-gray-700">
                  <td className="p-2">{course.courseName}</td>
                  <td className="p-2">{course.coefficient}</td>
                  <td className="p-2">{course.credits}</td>
                  <td className="p-2">{course.exam ?? "-"}</td>
                  <td className="p-2">{course.td ?? "-"}</td>
                  <td className="p-2">{course.tp ?? "-"}</td>
                  <td className="p-2">{course.moy}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
          <tr className="bg-blue-700 text-white font-bold">
            <td className="p-2">Total</td>
            <td className="p-2">-</td>
            <td className="p-2">{transcriptData.credits}</td>
            <td className="p-2">-</td>
            <td className="p-2">-</td>
            <td className="p-2">-</td>
            <td className="p-2">{transcriptData.average}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
