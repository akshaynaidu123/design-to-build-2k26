import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxmmvfii02mY1c8rPpR4aykE3bI-s6AjiUWpvnjm0h67q0wxkPgusiR4EkrxnLUvqa5Pw/exec";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Team leader + max 4 members = 5 total
  const [teamSize, setTeamSize] = useState(1);
  const [members, setMembers] = useState<string[]>([]);

  const [paymentScreenshot, setPaymentScreenshot] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    contactNumber: "",
    whatsappNumber: "",
    email: "",
    college: "",
    degree: "",
    year: "",
    branch: "",
    utrId: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ MAX TEAM SIZE LOGIC (Leader included)
  const handleTeamSizeChange = (e: any) => {
    let size = Number(e.target.value);

    if (size > 5) size = 5;
    if (size < 1) size = 1;

    setTeamSize(size);

    // Members = total - 1 (exclude leader)
    const memberCount = size - 1;
    setMembers(Array(memberCount).fill(""));
  };

  const handleMemberChange = (index: number, value: string) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setPaymentType(file.type);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPaymentScreenshot(reader.result as string);
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      member1: members[0] || "",
      member2: members[1] || "",
      member3: members[2] || "",
      member4: members[3] || "",
      paymentScreenshot,
      paymentType,
    };

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        alert(`🎉 Registered Successfully!\nTeam ID: ${result.teamId}`);
        navigate("/");
      } else if (result.message === "Duplicate UTR") {
        alert("❌ This UTR ID has already been used. Please check your payment details.");
      } else {
        alert("❌ Submission failed");
      }
    } catch {
      alert("❌ Network Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#001f2f] to-[#000814] p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-6xl bg-black/40 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-10 shadow-[0_0_60px_rgba(0,255,255,0.2)]"
      >
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-10">
          Team Registration
        </h2>

        {/* FORM FIELDS */}
        <div className="grid md:grid-cols-3 gap-6">
          <Input name="teamName" placeholder="Team Name" onChange={handleChange} />
          <Input name="leaderName" placeholder="Team Leader Name" onChange={handleChange} />
          <Input name="email" type="email" placeholder="Leader Email" onChange={handleChange} />
          <Input name="contactNumber" placeholder="Leader Phone Number" onChange={handleChange} />
          <Input name="whatsappNumber" placeholder="Leader WhatsApp Number" onChange={handleChange} />
          <Input name="college" placeholder="College Name" onChange={handleChange} />
          <Input name="degree" placeholder="Degree" onChange={handleChange} />
          <Input name="year" placeholder="Year of Study" onChange={handleChange} />
          <Input name="branch" placeholder="Branch" onChange={handleChange} />

          {/* Team Size (Max 5 including leader) */}
          <Input
            type="number"
            placeholder="Total Team Size (Max 5 including Leader)"
            onChange={handleTeamSizeChange}
          />
        </div>

        {/* MEMBERS SECTION */}
        {members.length > 0 && (
          <div className="mt-8">
            <h3 className="text-cyan-300 mb-4 text-lg font-semibold">
              Team Members (Max 4)
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {members.map((member, index) => (
                <motion.input
                  key={index}
                  whileFocus={{ scale: 1.02 }}
                  placeholder={`Member ${index + 1} Name`}
                  value={member}
                  required
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  className="p-4 bg-black/30 border border-cyan-400/30 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition"
                />
              ))}
            </div>
          </div>
        )}

        {/* PAYMENT SECTION (UNCHANGED STRUCTURE) */}
        <div className="mt-12 border-t border-cyan-400/30 pt-10">
          <h3 className="text-2xl text-cyan-400 font-bold mb-10 text-center">
            Registration Fee Payment
          </h3>

          <div className="flex flex-col md:flex-row gap-12 items-start">

            <div className="flex-1 flex justify-center">
              <div className="bg-white p-6 rounded-2xl shadow-xl">
                <img
                  src="/images/upi-qr.jpeg"
                  alt="UPI QR"
                  className="w-72 md:w-80"
                />
              </div>
            </div>

            <div className="flex-1 text-gray-300 space-y-5 bg-[#0f172a] border border-cyan-400/20 p-8 rounded-xl">
              <h4 className="text-xl text-cyan-400 font-semibold">
                Payment Instructions
              </h4>
              <p>• ₹200 per Team – Idea Submission Fee</p>
              <p>• ₹300 per head – Hackathon Entry Fee (After Screening Selection)</p>
              <p>• Scan the QR code using any UPI app.</p>
              <p>• Enter your UTR / Transaction ID below.</p>
              <p>• Upload payment screenshot for verification.</p>
              <p>• Any Issues Contact us at 9392977189</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <Input
              name="utrId"
              placeholder="Enter UTR / Transaction ID"
              onChange={handleChange}
            />

            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="p-4 bg-black/30 border border-cyan-400/30 rounded-lg text-white"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          type="submit"
          className="w-full mt-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.7)] transition-all duration-300"
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </motion.button>
      </motion.form>
    </div>
  );
}

function Input({ name, placeholder, type = "text", onChange }: any) {
  return (
    <motion.input
      whileFocus={{ scale: 1.02 }}
      name={name}
      type={type}
      placeholder={placeholder}
      required
      onChange={onChange}
      className="p-4 bg-black/30 border border-cyan-400/30 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition"
    />
  );
}