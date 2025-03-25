import { getToken } from "@/lib/token";
import Link from "next/link";

export default async function TranscriptList() {
  const token = await getToken();
  const response = await fetch(
    "http://localhost:5000/api/transcripts/student",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  const transcripts = data.transcripts;

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700 border-green-500";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-500";
      case "REJECTED":
        return "bg-red-100 text-red-700 border-red-500";
      default:
        return "bg-gray-100 text-gray-700 border-gray-500";
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        📜 My Transcripts
      </h1>

      <div className="space-y-4">
        {transcripts.map((transcript) => (
          <Link
            key={transcript.id}
            href={`/transcripts/${transcript.id}`}
            className="group"
          >
            <div className="mb-4 p-5 flex justify-between items-center rounded-lg bg-white shadow-md border border-gray-300 transition-transform transform group-hover:scale-[1.02] group-hover:shadow-lg">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Semester {transcript.semester} - {transcript.year}
                </h2>
                <p className="text-gray-700 mt-1">
                  <span className="font-medium">Average:</span>{" "}
                  {transcript.average} |{" "}
                  <span className="font-medium">Credits:</span>{" "}
                  {transcript.credits}
                </p>
              </div>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 text-sm font-medium border rounded-full ${getStatusColor(
                  transcript.status
                )}`}
              >
                {transcript.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
