import { getToken } from "./token";

export async function submitGrades(previousState: unknown, formData: FormData) {
  const token = await getToken();
  // Extract grades from form data
  const courses = [
    {
      courseName: "Analyse 1",
      grade: parseFloat(formData.get("analyse1") as string),
    },
    {
      courseName: "Algèbre 1",
      grade: parseFloat(formData.get("algebre1") as string),
    },
    {
      courseName: "Algorithmique et structure de données 1",
      grade: parseFloat(formData.get("algorithmique") as string),
    },
    {
      courseName: "Structure machine 1",
      grade: parseFloat(formData.get("structureMachine1") as string),
    },
    {
      courseName: "Terminologie Scientifique et expression écrite",
      grade: parseFloat(formData.get("terminologie") as string),
    },
    {
      courseName: "Langue étrangère 1",
      grade: parseFloat(formData.get("langueEtrangere1") as string),
    },
    {
      courseName: "Physique 1",
      grade: parseFloat(formData.get("physique1") as string),
    },
  ];

  try {
    // Send a POST request to /api/transcripts
    const response = await fetch("http://localhost:5000/api/transcripts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
      credentials: "include",
      body: JSON.stringify({ courses }), // Send the courses in the request body
    });

    // Handle the response
    const data: { success: boolean; message: string } = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
}
