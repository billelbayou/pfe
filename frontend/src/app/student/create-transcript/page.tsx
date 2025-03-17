"use client";

import { submitGrades } from "@/lib/transcript-actions";
import { useActionState, useEffect } from "react";

export default function CreateTranscript() {
  const [state, dispatch] = useActionState(submitGrades, null);
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Enter Your Grades - Semester 1
        </h1>
        <form action={dispatch} className="space-y-6">
          {/* UEF111: Analyse 1 */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Analyse 1
            </label>
            <input
              type="number"
              name="analyse1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your grade"
            />
          </div>

          {/* UEF112: Algèbre 1 */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Algèbre 1
            </label>
            <input
              type="number"
              name="algebre1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your grade"
            />
          </div>

          {/* UEF121: Algorithmique et structure de données 1 */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Algorithmique et structure de données 1
            </label>
            <input
              type="number"
              name="algorithmique"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your grade"
            />
          </div>

          {/* UEF122: Structure machine 1 */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Structure machine 1
            </label>
            <input
              type="number"
              name="structureMachine1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your grade"
            />
          </div>

          {/* UEM111: Terminologie Scientifique et expression écrite */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Terminologie Scientifique et expression écrite
            </label>
            <input
              type="number"
              name="terminologie"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your grade"
            />
          </div>

          {/* UEM112: Langue étrangère 1 */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Langue étrangère 1
            </label>
            <input
              type="number"
              name="langueEtrangere1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your grade"
            />
          </div>

          {/* UED111: Physique 1 */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Physique 1
            </label>
            <input
              type="number"
              name="physique1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your grade"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit Grades
            </button>
          </div>
          {state && state.success ? (
            <div className="text-center text-lg font-semibold text-green-600">
              {state.message}
            </div>
          ) : (
            <div className="text-center text-lg font-semibold text-red-600">
              {state?.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
