export default function TranscriptForm() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Enter Your Grades</h2>

      <form method="POST" className="space-y-6">
        {/* Semester and Year Selection */}
        <div className="mb-4">
          <label className="block font-medium">Select Semester</label>
          <select name="semester" className="w-full p-2 border rounded-md">
            <option value="">Select</option>
            <option value="Semester 1">Semester 1</option>
            <option value="Semester 2">Semester 2</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Enter Year</label>
          <input
            type="number"
            name="year"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Courses */}
        <div className="space-y-6">
          {/* UE Fondamentales */}
          <fieldset className="border p-4 rounded-md shadow-sm">
            <legend className="text-lg font-medium">UE Fondamentales</legend>

            <div className="mt-3">
              <h4 className="font-semibold">Mathematics</h4>
              <div className="grid grid-cols-3 gap-4">
                {["exam", "td", "tp"].map((field) => (
                  <div key={field}>
                    <label className="block font-medium capitalize">
                      {field}
                    </label>
                    <input
                      type="number"
                      name={`Mathematics-${field}`}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <h4 className="font-semibold">Physics</h4>
              <div className="grid grid-cols-3 gap-4">
                {["exam", "td", "tp"].map((field) => (
                  <div key={field}>
                    <label className="block font-medium capitalize">
                      {field}
                    </label>
                    <input
                      type="number"
                      name={`Physics-${field}`}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </fieldset>

          {/* UE Méthodologie */}
          <fieldset className="border p-4 rounded-md shadow-sm">
            <legend className="text-lg font-medium">UE Méthodologie</legend>

            <div className="mt-3">
              <h4 className="font-semibold">Programming</h4>
              <div className="grid grid-cols-3 gap-4">
                {["exam", "td", "tp"].map((field) => (
                  <div key={field}>
                    <label className="block font-medium capitalize">
                      {field}
                    </label>
                    <input
                      type="number"
                      name={`Programming-${field}`}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <h4 className="font-semibold">Algorithms</h4>
              <div className="grid grid-cols-3 gap-4">
                {["exam", "td", "tp"].map((field) => (
                  <div key={field}>
                    <label className="block font-medium capitalize">
                      {field}
                    </label>
                    <input
                      type="number"
                      name={`Algorithms-${field}`}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </fieldset>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit Grades
        </button>
      </form>
    </div>
  );
}
