import { User } from "@/types/user";
import Link from "next/link";
import Layout from "./layout";

export default function Profile({ user }: { user: User }) {
  // Example data (replace with real data from your backend)
  const studentInfo = {
    name: user.name,
    email: user.email,
    role: user.role,
    enrollmentDate: "2023-09-01", // Example enrollment date
    department: "Computer Science", // Example department
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Student Profile</h1>

        {/* Personal Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Name:</span>
              <span className="font-semibold">{studentInfo.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold">{studentInfo.email}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Role:</span>
              <span className="font-semibold">{studentInfo.role}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Enrollment Date:</span>
              <span className="font-semibold">
                {new Date(studentInfo.enrollmentDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Department:</span>
              <span className="font-semibold">{studentInfo.department}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
