"use client";

import React, { useState, useCallback, useMemo, useActionState } from "react";
import { Module, Semestre, Unite } from "@/lib/types";
import { transcriptAction } from "@/lib/transcript-actions";
import data from "@/lib/transcript.json";

interface SemesterTableProps {
  year: string;
  semester: 1 | 2;
}

const SemesterTable: React.FC<SemesterTableProps> = ({ year, semester }) => {
  // Fetch correct semester data based on `year` and `semester`
  const semesterData = data[`semestre${semester}`] as Semestre;
  const [grades, setGrades] = useState<
    Record<string, { td?: number; tp?: number; exam?: number }>
  >({});

  const handleInputChange = useCallback(
    (moduleName: string, field: "td" | "tp" | "exam", value: number) => {
      if (value < 0 || value > 20) return;
      setGrades((prev) => ({
        ...prev,
        [moduleName]: { ...prev[moduleName], [field]: value || 0 },
      }));
    },
    []
  );

  const calculateModuleAverage = useCallback(
    (module: Module) => {
      const moduleGrades = grades[module.name] || {};
      return (
        (moduleGrades.td ?? 0) * module.poids_td +
        (moduleGrades.tp ?? 0) * module.poids_tp +
        (moduleGrades.exam ?? 0) * module.poids_exam
      ).toFixed(2);
    },
    [grades]
  );

  const getModuleCredit = useCallback(
    (module: Module) => {
      const moyenne = parseFloat(calculateModuleAverage(module));
      return moyenne >= 10 ? module.credit : 0;
    },
    [calculateModuleAverage]
  );

  const calculateUnitAverage = useCallback(
    (unit: Unite) => {
      const total = unit.modules.reduce((sum: number, module: Module) => {
        return sum + parseFloat(calculateModuleAverage(module)) * module.coef;
      }, 0);
      return (total / unit.coef).toFixed(2);
    },
    [calculateModuleAverage]
  );

  const getUnitCredit = useCallback(
    (unit: any) => {
      const moyenne = parseFloat(calculateUnitAverage(unit));
      return moyenne >= 10 ? unit.credits_origine : 0;
    },
    [calculateUnitAverage]
  );

  const semesterAverage = useMemo(() => {
    const total = semesterData.unites.reduce((sum: number, unit: any) => {
      return sum + parseFloat(calculateUnitAverage(unit)) * unit.coef;
    }, 0);
    return (total / semesterData.coef).toFixed(2);
  }, [calculateUnitAverage, semesterData]);

  const semesterCredits = useMemo(() => {
    return semesterData.unites.reduce(
      (sum: number, unit: any) => sum + getUnitCredit(unit),
      0
    );
  }, [semesterData, getUnitCredit]);

  const [state, dispatch, isPending] = useActionState(transcriptAction, null);

  return (
    <div className="p-6">
      <h2 className="text-center text-2xl font-bold bg-blue-600 text-white py-2">
        {`Semestre ${semesterData.name}`}
      </h2>

      {/* Form Tag */}
      <form action={dispatch}>
        <input type="hidden" name="year" value={year} />
        <input type="hidden" name="semester" value={semester} />
        <table className="w-full border border-gray-300 mt-4">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2">Modules</th>
              <th className="p-2">Coef</th>
              <th className="p-2">Créd</th>
              <th className="p-2">Notes</th>
              <th className="p-2">Moyenne Module</th>
              <th className="p-2">Créd Mod</th>
            </tr>
          </thead>

          <tbody className="bg-gray-900 text-white text-center">
            {semesterData.unites.map((unit, unitIndex) => (
              <React.Fragment key={unitIndex}>
                {unit.modules.map((module, moduleIndex) => (
                  <tr key={moduleIndex} className="border-b border-gray-700">
                    <td className="p-2">{module.title}</td>
                    <td className="p-2">{module.coef}</td>
                    <td className="p-2">{module.credit}</td>

                    {/* Dynamic Inputs Based on Existing Weights */}
                    <td className="p-2 flex justify-center gap-2">
                      {Object.entries({
                        td: module.poids_td,
                        tp: module.poids_tp,
                        exam: module.poids_exam,
                      })
                        .filter(([, poids]) => poids > 0) // Only show fields that have a weight
                        .map(([field]) => (
                          <input
                            key={field}
                            type="number"
                            min="0"
                            max="20"
                            step="0.1"
                            name={`${module.name}-${field}`}
                            className="w-12 text-center border border-gray-600 bg-black text-white"
                            value={
                              grades[module.name]?.[
                                field as "td" | "tp" | "exam"
                              ] || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                module.name,
                                field as "td" | "tp" | "exam",
                                Number(e.target.value)
                              )
                            }
                          />
                        ))}
                    </td>

                    <td className="p-2">{calculateModuleAverage(module)}</td>
                    <td className="p-2">{getModuleCredit(module)}</td>
                  </tr>
                ))}

                {/* Unit Average Row */}
                <tr className="bg-blue-500 text-white font-bold">
                  <td className="p-2">{unit.title}</td>
                  <td className="p-2">{unit.coef}</td>
                  <td className="p-2">{unit.credits_origine}</td>
                  <td className="p-2">-</td>
                  <td className="p-2">{calculateUnitAverage(unit)}</td>
                  <td className="p-2">{getUnitCredit(unit)}</td>
                </tr>
              </React.Fragment>
            ))}

            {/* Final Semester Row */}
            <tr className="bg-blue-700 text-white font-bold">
              <td className="p-2">Semestre {semesterData.name}</td>
              <td className="p-2">{semesterData.coef}</td>
              <td className="p-2">{semesterData.credits_origine}</td>
              <td className="p-2">-</td>
              <td className="p-2">{semesterAverage}</td>
              <td className="p-2">{semesterCredits}</td>
            </tr>
          </tbody>
        </table>

        {/* Submit Button */}
        <div className="mt-4 text-center">
          <button
            disabled={isPending}
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            {isPending ? "Saving..." : "Save Transcript"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SemesterTable;
