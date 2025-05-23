import React from "react";

const users = Array.from({ length: 13 }).map((_, i) => ({
  username: "@GithubUser",
  email: "Correo@gmail.com",
  commits: 4,
  score: "8/10",
  feedback: i === 1 ? "Enviada" : i === 2 ? "Vacia" : "Generada",
  date: "11/11/11 7:00 AM",
  repo: "github.com/repositorio",
}));

function getFeedbackColor(status) {
  if (status === "Enviada") return "text-accent";
  if (status === "Vacia") return "text-[#710000]";
  return "text-primary";
}

function AssignmentsTable() {
  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full text-sm border border-gray-300 rounded-md shadow-md">
        <thead className="bg-secondary text-left">
          <tr>
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Correo Electrónico</th>
            <th className="px-4 py-2">Commits</th>
            <th className="px-4 py-2">Calificación</th>
            <th className="px-4 py-2">Retroalimentación</th>
            <th className="px-4 py-2">Última retroalimentación</th>
            <th className="px-4 py-2">Repositorio</th>
            <th className="px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2">{u.username}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.commits}</td>
              <td className="px-4 py-2">{u.score}</td>
              <td className={`px-4 py-2 font-semibold ${getFeedbackColor(u.feedback)}`}>
                {u.feedback}
              </td>
              <td className="px-4 py-2">{u.date}</td>
              <td className="px-4 py-2 text-blue-500">{u.repo}</td>
              <td className="px-4 py-2">
                <button className="bg-secondary hover:bg-primary hover:text-white text-primary font-bold text-xs px-3 py-1 rounded">
                  Generar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentsTable