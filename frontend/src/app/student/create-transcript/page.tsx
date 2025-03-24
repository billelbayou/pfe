"use client";

import { useState } from "react";
import SemesterTable from "@/components/transcript-form"; // Import your form component

type semesterNumber = 1 | 2;

const YearSemesterSelector: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Generate years dynamically (from 2019/2020 to current year)
  const years = Array.from({ length: currentYear - 2019 + 1 }, (_, i) => {
    const start = currentYear - i;
    return `${start}/${start + 1}`;
  });

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] =
    useState<semesterNumber | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {!selectedYear || !selectedSemester ? (
        <>
          <h1 className="text-3xl font-bold text-center mb-6">
            Select Your Year & Semester
          </h1>

          {/* Year Selection - Dropdown */}
          <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Choose Academic Year:
            </h2>
            <select
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedYear(e.target.value)}
              value={selectedYear || ""}
            >
              <option value="" disabled>
                Select Year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Selection - Buttons */}
          {selectedYear && (
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md mt-6">
              <h2 className="text-lg font-semibold mb-4">Choose Semester:</h2>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2].map((semester) => (
                  <button
                    key={semester}
                    onClick={() =>
                      setSelectedSemester(semester as semesterNumber)
                    }
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      selectedSemester === semester
                        ? "bg-green-500 text-white"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    Semester {semester}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        // Show the SemesterTable form when selection is complete
        <SemesterTable year={selectedYear} semester={selectedSemester} />
      )}
    </div>
  );
};

export default YearSemesterSelector;
