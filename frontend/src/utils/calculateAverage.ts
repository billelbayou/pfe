export const calcluateAverage = (examS: string, tdS?: string, tpS?: string) => {
  const exam = parseFloat(examS);
  const td = tdS ? parseFloat(tdS) : null;
  const tp = tpS ? parseFloat(tpS) : null;

  if (!td && !tp) {
    return exam;
  }
  if (!td && tp) {
    return (tp * 0.4 + exam * 0.6).toFixed(2);
  }
  if (td && !tp) {
    return (td * 0.4 + exam * 0.6).toFixed(2);
  }
  if (td && tp) {
    return (td * 0.2 + tp * 0.2 + exam * 0.6).toFixed(2);
  }
};
