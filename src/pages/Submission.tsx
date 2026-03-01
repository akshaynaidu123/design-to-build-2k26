import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Github, Video, Loader2, CheckCircle } from "lucide-react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyH0iek-Q3Y5XbCNCyixXW9uffdvBQ1oU2wPFN_T3YkxMOJ69JQimO2nAaFxltJijcs0g/exec";

export default function Submission() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reportFile, setReportFile] = useState<any>(null);

  const [formData, setFormData] = useState({
    teamId: "",
    teamName: "",
    description: "",
    videoLink: "",
    github: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Max file size is 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setReportFile({
        data: reader.result,
        type: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!reportFile) {
      alert("Report PDF is mandatory.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    const payload = {
      ...formData,
      reportFile: reportFile.data,
      reportType: reportFile.type,
    };

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      const result = JSON.parse(text);

      if (result.success) {
        setSuccess(true);
        setFormData({
          teamId: "",
          teamName: "",
          description: "",
          videoLink: "",
          github: "",
        });
        setReportFile(null);
      } else {
        alert(result.error || "Submission failed.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Unable to connect to server.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#001f2f] to-[#000814] flex items-center justify-center px-6 py-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-black/40 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-12 shadow-[0_0_50px_rgba(0,255,255,0.15)]"
      >
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-12">
          🚀 Submit Your Project
        </h2>

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-green-600/20 border border-green-400 rounded-xl text-green-300 flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Submission Successful!
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <Input
            name="teamId"
            placeholder="Team ID"
            value={formData.teamId}
            onChange={handleChange}
            required
          />

          <Input
            name="teamName"
            placeholder="Team Name"
            value={formData.teamName}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 bg-black/30 border border-cyan-400/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition"
          />

          <Input
            name="videoLink"
            placeholder="Video Link (Optional)"
            value={formData.videoLink}
            onChange={handleChange}
            icon={<Video className="h-4 w-4 text-cyan-400" />}
          />

          <Input
            name="github"
            placeholder="GitHub Link (Optional)"
            value={formData.github}
            onChange={handleChange}
            icon={<Github className="h-4 w-4 text-cyan-400" />}
          />

          {/* PDF Upload */}
          <div className="border-2 border-dashed border-cyan-400/40 rounded-xl p-6 text-center bg-black/20 hover:bg-black/30 transition">
            <FileText className="mx-auto mb-4 text-cyan-400" />
            <p className="mb-4 text-sm text-gray-300">
              Upload Project Report (PDF Only, Max 10MB)
            </p>
            <input
              type="file"
              accept="application/pdf"
              required
              onChange={handleFile}
              className="text-sm"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-white shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Submitting...
              </>
            ) : (
              "Submit Project"
            )}
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
}

/* ================= INPUT COMPONENT ================= */

function Input({
  name,
  placeholder,
  value,
  onChange,
  icon,
  required = false,
}: any) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`w-full p-4 ${
          icon ? "pl-12" : ""
        } bg-black/30 border border-cyan-400/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition`}
      />
    </div>
  );
}