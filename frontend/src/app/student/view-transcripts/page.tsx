import { getAllTranscripts } from "@/lib/transcript-actions";

export default async function ViewTranscript() {
  const transcripts = await getAllTranscripts();
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Your Transcripts
        </h1>

        {transcripts.length === 0 ? (
          <p className="text-center text-gray-600">No transcripts found.</p>
        ) : (
          transcripts.map((transcript) => (
            <div key={transcript.id} className="mb-8 border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">
                Transcript ID: {transcript.id}
              </h2>
              <p className="text-gray-600 mb-4">
                Created At:{" "}
                {new Date(transcript.createdAt).toLocaleDateString()}
              </p>

              <h3 className="text-lg font-medium mb-2">Courses:</h3>
              <ul className="space-y-2">
                {transcript.courses.map((course) => (
                  <li key={course.id} className="flex justify-between">
                    <span className="text-gray-700">{course.courseName}</span>
                    <span className="font-semibold">{course.grade}/20</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
