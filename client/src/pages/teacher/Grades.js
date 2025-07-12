import React from 'react';

const Grades = ({ grades }) => {
  if (!grades || grades.length === 0) {
    return (
      <div className="text-gray-500 text-center py-10">
        No grades available for this class.
      </div>
    );
  }

  const calculateAverage = (score) => {
    const scores = [score.listening, score.reading, score.writing, score.speaking];
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return average.toFixed(1);
  };

  const getGradeColor = (average) => {
    if (average >= 8) return "text-green-600 bg-green-100";
    if (average >= 6.5) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-3 text-left">Student</th>
            <th className="border px-4 py-3 text-center">Listening</th>
            <th className="border px-4 py-3 text-center">Reading</th>
            <th className="border px-4 py-3 text-center">Writing</th>
            <th className="border px-4 py-3 text-center">Speaking</th>
            <th className="border px-4 py-3 text-center">Average</th>
            <th className="border px-4 py-3 text-left">Comment</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => {
            const average = calculateAverage(grade.score);
            return (
              <tr key={grade.id} className="hover:bg-gray-50">
                <td className="border px-4 py-3 font-semibold text-blue-700">
                  {grade.student.name}
                </td>
                <td className="border px-4 py-3 text-center">
                  {grade.score.listening}
                </td>
                <td className="border px-4 py-3 text-center">
                  {grade.score.reading}
                </td>
                <td className="border px-4 py-3 text-center">
                  {grade.score.writing}
                </td>
                <td className="border px-4 py-3 text-center">
                  {grade.score.speaking}
                </td>
                <td className="border px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded font-medium ${getGradeColor(average)}`}>
                    {average ? average : ''}
                  </span>
                </td>
                <td className="border px-4 py-3">
                  {grade.comment || <span className="text-gray-400 italic">No comment</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Grades;