import Link from "next/link";
import Logout from "./logout";
import { User } from "@/types/user";


export default function StudentDashboard({ user }: { user: User }) {
  const { name, email } = user;
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 w-full max-w-3xl">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <Logout />
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Welcome, {name} 👋</h2>
          <p className="text-gray-600">{email}</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/student/create-transcript"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition flex items-center justify-center"
          >
            ✏️ Create Transcript
          </Link>
          <Link
            href="/student/view-transcripts"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition flex items-center justify-center"
          >
            📜 View Transcripts
          </Link>
        </div>

        {/* Additional Info Section */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-gray-800">
          <h3 className="text-lg font-semibold">📢 Important Notes:</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>
              New transcripts will be marked as{" "}
              <span className="font-semibold">PENDING</span>.
            </li>
            <li>Admins will review and approve/reject transcripts.</li>
            <li>
              Ensure your transcript details are correct before submitting.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
