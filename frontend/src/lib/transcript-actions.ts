import data from "@/lib/transcript.json";
import { calcluateAverage } from "@/utils/calculateAverage";

export const transcriptAction = (previousData: unknown, formData: FormData) => {
  const analyseTd = formData.get("analyse1-td") as string;
  const analyseExam = formData.get("analyse1-exam") as string;
  const analyseCredit = data.semestre1.unites[0].modules[0].credit;
  const analyseCoef = data.semestre1.unites[0].modules[0].coef;

  const algebreTd = formData.get("algebre1-td") as string;
  const algebreExam = formData.get("algebre1-exam") as string;
  const algebreCredit = data.semestre1.unites[0].modules[1].credit;
  const algebreCoef = data.semestre1.unites[0].modules[1].coef;

  const algoTd = formData.get("Algo1-td") as string;
  const algoTp = formData.get("Algo1-tp") as string;
  const algoExam = formData.get("Algo1-exam") as string;
  const algoCredit = data.semestre1.unites[1].modules[0].credit;
  const algoCoef = data.semestre1.unites[1].modules[0].coef;

  const strmTd = formData.get("STRM1-td") as string;
  const strmExam = formData.get("STRM1-exam") as string;
  const strmCredit = data.semestre1.unites[1].modules[1].credit;
  const strmCoef = data.semestre1.unites[1].modules[1].coef;

  const termExam = formData.get("Term-exam") as string;
  const termCredit = data.semestre1.unites[2].modules[0].credit;
  const termCoef = data.semestre1.unites[2].modules[0].coef;
  const angExam = formData.get("Ang1-exam") as string;
  const angCredit = data.semestre1.unites[2].modules[1].credit;
  const angCoef = data.semestre1.unites[2].modules[1].coef;

  const physTd = formData.get("Phys1-td") as string;
  const physExam = formData.get("Phys1-exam") as string;
  const physCredit = data.semestre1.unites[3].modules[0].credit;
  const physCoef = data.semestre1.unites[3].modules[0].coef;

  const modulesNotes = {
    analyse: {
      td: analyseTd,
      exam: analyseExam,
      moyenne: calcluateAverage(analyseExam, analyseTd) as number,
      credit:
        (calcluateAverage(analyseExam, analyseTd) as number) >= 10
          ? analyseCredit
          : 0,
    },
    algebre: {
      td: algebreTd,
      exam: algebreExam,
      moyenne: calcluateAverage(algebreExam, algebreTd) as number,
      credit:
        (calcluateAverage(algebreExam, algebreTd) as number) >= 10
          ? algebreCredit
          : 0,
    },
    algo: {
      td: algoTd,
      tp: algoTp,
      exam: algoExam,
      moyenne: calcluateAverage(algoExam, algoTd, algoTp) as number,
      credit:
        (calcluateAverage(algoExam, algoTd, algoTp) as number) >= 10
          ? algoCredit
          : 0,
    },
    strm: {
      td: strmTd,
      exam: strmExam,
      moyenne: calcluateAverage(strmExam, strmTd) as number,
      credit:
        (calcluateAverage(strmExam, strmTd) as number) >= 10 ? strmCredit : 0,
    },
    term: {
      exam: termExam,
      moyenne: calcluateAverage(termExam) as number,
      credit: (calcluateAverage(termExam) as number) >= 10 ? termCredit : 0,
    },
    ang: {
      exam: angExam,
      moyenne: calcluateAverage(angExam) as number,
      credit: (calcluateAverage(angExam) as number) >= 10 ? angCredit : 0,
    },
    phys: {
      td: physTd,
      exam: physExam,
      moyenne: calcluateAverage(physExam, physTd) as number,
      credit:
        (calcluateAverage(physExam, physTd) as number) >= 10 ? physCredit : 0,
    },
  };
  const unites = {
    unite1: {
      coefficent: data.semestre1.unites[0].coef,
      moyenne: parseFloat(
        (
          (modulesNotes.analyse.moyenne * analyseCoef +
            modulesNotes.algebre.moyenne * algebreCoef) /
          (analyseCoef + algebreCoef)
        ).toFixed(2)
      ),
      credits: modulesNotes.analyse.credit + modulesNotes.algebre.credit,
      modules: [
        {
          ...modulesNotes.analyse,
        },
        {
          ...modulesNotes.algebre,
        },
      ],
    },
    unite2: {
      coefficent: data.semestre1.unites[1].coef,
      moyenne: parseFloat(
        (
          (modulesNotes.algo.moyenne * algoCoef +
            modulesNotes.strm.moyenne * strmCoef) /
          (algoCoef + strmCoef)
        ).toFixed(2)
      ),
      credits: modulesNotes.algo.credit + modulesNotes.strm.credit,
      modules: [
        {
          ...modulesNotes.algo,
        },
        {
          ...modulesNotes.strm,
        },
      ],
    },
    unite3: {
      coefficent: data.semestre1.unites[2].coef,
      moyenne: parseFloat(
        (
          (modulesNotes.term.moyenne * termCoef +
            modulesNotes.ang.moyenne * angCoef) /
          (termCoef + angCoef)
        ).toFixed(2)
      ),
      credits: modulesNotes.term.credit + modulesNotes.ang.credit,
      modules: [
        {
          ...modulesNotes.term,
        },
        {
          ...modulesNotes.ang,
        },
      ],
    },
    unite4: {
      coefficent: data.semestre1.unites[3].coef,
      moyenne: modulesNotes.phys.moyenne,
      credits: modulesNotes.phys.credit,
      modules: [
        {
          ...modulesNotes.phys,
        },
      ],
    },
  };
  const semestreMoy = parseFloat(
    (
      Object.values(unites).reduce(
        (sum, unite) => sum + unite.moyenne * unite.coefficent,
        0
      ) / 18
    ).toFixed(2)
  );
  const semestre = {
    moyenne: semestreMoy,
    credits: semestreMoy >= 10 ? 30 : Object.values(unites).reduce(
      (sum, unite) => sum + unite.credits,
      0
    ),
    unites,
  };
  console.log(semestre)
};
