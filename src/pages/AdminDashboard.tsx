import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxmmvfii02mY1c8rPpR4aykE3bI-s6AjiUWpvnjm0h67q0wxkPgusiR4EkrxnLUvqa5Pw/exec";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      navigate("/admin-login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(SCRIPT_URL);
    const result = await res.json();
    setData(result);
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  const deleteTeam = async (rowIndex: number) => {
    if (!confirm("Delete this team?")) return;
    await fetch(`${SCRIPT_URL}?delete=${rowIndex}`);
    fetchData();
  };

  const convertDriveLink = (url: string) => {
    if (!url) return "";
    const match = url.match(/\/d\/(.*?)\//);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  };

  const headers = data[0] || [];
  let rows = data.slice(1);

  if (search) {
    rows = rows.filter((row: any[]) =>
      row.join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }

  // ==============================
  // 🔥 ADVANCED ANALYTICS
  // ==============================

  const totalTeams = rows.length;

  const totalParticipants = rows.reduce((acc, row) => {
    const members =
      1 + // leader
      [row[10], row[11], row[12], row[13]].filter(
        (m) => m && m.trim() !== ""
      ).length;
    return acc + members;
  }, 0);

  const avgTeamSize =
    totalTeams > 0 ? (totalParticipants / totalTeams).toFixed(1) : 0;

  const uniqueColleges = new Set(
    rows.map((row) => row[6]).filter((c) => c)
  ).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#000814] text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cyan-400">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* 🔥 ANALYTICS CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <Card title="Total Teams" value={totalTeams} color="cyan" />
        <Card title="Total Participants" value={totalParticipants} color="purple" />
        <Card title="Avg Team Size" value={avgTeamSize} color="blue" />
        <Card title="Unique Colleges" value={uniqueColleges} color="green" />

      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search team / leader / college / UTR..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg bg-black/40 border border-cyan-400/30 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-black/40 backdrop-blur-xl rounded-xl border border-cyan-400/20 shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-cyan-400/10 text-cyan-400">
            <tr>
              {headers.map((h: string, i: number) => (
                <th key={i} className="p-3 text-left">{h}</th>
              ))}
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row: any[], i: number) => (
              <tr
                key={i}
                className="border-t border-white/10 hover:bg-cyan-400/5 transition"
              >
                {row.map((cell: any, j: number) => {
                  if (headers[j]?.toLowerCase().includes("screenshot")) {
                    const imageUrl = convertDriveLink(cell);
                    return (
                      <td key={j} className="p-3">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="Payment"
                            className="w-16 h-16 object-cover rounded-lg cursor-pointer border border-cyan-400"
                            onClick={() => setPreviewImage(imageUrl)}
                          />
                        ) : "-"}
                      </td>
                    );
                  }

                  return (
                    <td key={j} className="p-3">
                      {cell || "-"}
                    </td>
                  );
                })}

                <td className="p-3">
                  <button
                    onClick={() => deleteTeam(i + 2)}
                    className="text-red-400 hover:text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* IMAGE MODAL */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white text-2xl"
            >
              ✕
            </button>

            <img
              src={previewImage}
              alt="Full Preview"
              className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ title, value, color }: any) {
  const colors: any = {
    cyan: "border-cyan-400 text-cyan-400",
    purple: "border-purple-400 text-purple-400",
    blue: "border-blue-400 text-blue-400",
    green: "border-green-400 text-green-400",
  };

  return (
    <div className={`p-6 rounded-xl border bg-black/40 backdrop-blur-xl ${colors[color]}`}>
      <h3 className="text-sm opacity-70 mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}