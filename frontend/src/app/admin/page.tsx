import { checkAuth } from "@/lib/auth-actions";
import { User } from "@/lib/types";

export default async function Profile() {
  const auth = await checkAuth();
  const user = auth.user as User;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Profile</h1>

      {/* Personal Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Name:</span>
            <span className="font-semibold">{user.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Email:</span>
            <span className="font-semibold">{user.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Enrollment Date:</span>
            <span className="font-semibold">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Department:</span>
            <span className="font-semibold">Computer Science</span>
          </div>
        </div>
      </div>
    </div>
  );
}
