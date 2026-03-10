import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxmmvfii02mY1c8rPpR4aykE3bI-s6AjiUWpvnjm0h67q0wxkPgusiR4EkrxnLUvqa5Pw/exec";

type Member = {
  name: string;
  email: string;
  phone: string;
  role: string;
  tshirt: string;
};

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [teamSize, setTeamSize] = useState(1);
  const [members, setMembers] = useState<Member[]>([]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let size = Number(e.target.value);

    if (size > 5) size = 5;
    if (size < 1) size = 1;

    setTeamSize(size);

    const memberCount = size - 1;
    const arr: Member[] = [];

    for (let i = 0; i < memberCount; i++) {
      arr.push({
        name: "",
        email: "",
        phone: "",
        role: "",
        tshirt: "",
      });
    }

    setMembers(arr);
  };

  const handleMemberChange = (
    index: number,
    field: keyof Member,
    value: string
  ) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPaymentType(file.type);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPaymentScreenshot(reader.result as string);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,

      member1: members[0]?.name || "",
      member1Email: members[0]?.email || "",
      member1Phone: members[0]?.phone || "",
      member1Role: members[0]?.role || "",
      member1Tshirt: members[0]?.tshirt || "",

      member2: members[1]?.name || "",
      member2Email: members[1]?.email || "",
      member2Phone: members[1]?.phone || "",
      member2Role: members[1]?.role || "",
      member2Tshirt: members[1]?.tshirt || "",

      member3: members[2]?.name || "",
      member3Email: members[2]?.email || "",
      member3Phone: members[2]?.phone || "",
      member3Role: members[2]?.role || "",
      member3Tshirt: members[2]?.tshirt || "",

      member4: members[3]?.name || "",
      member4Email: members[3]?.email || "",
      member4Phone: members[3]?.phone || "",
      member4Role: members[3]?.role || "",
      member4Tshirt: members[3]?.tshirt || "",

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
        alert("❌ This UTR ID already used");
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

        {/* Leader Details */}

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

          <Input
            type="number"
            placeholder="Total Team Size (Max 5 including Leader)"
            onChange={handleTeamSizeChange}
          />
        </div>

        {/* Members */}

        {members.length > 0 && (
          <div className="mt-10 space-y-6">
            {members.map((member, index) => (
              <div key={index} className="border border-cyan-400/20 p-6 rounded-xl">
                <h4 className="text-cyan-400 mb-4">Member {index + 1}</h4>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Member Name"
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                  />

                  <Input
                    type="email"
                    placeholder="Member Email"
                    onChange={(e) =>
                      handleMemberChange(index, "email", e.target.value)
                    }
                  />

                  <Input
                    placeholder="Member Phone"
                    onChange={(e) =>
                      handleMemberChange(index, "phone", e.target.value)
                    }
                  />

                  <Input
                    placeholder="Role"
                    onChange={(e) =>
                      handleMemberChange(index, "role", e.target.value)
                    }
                  />

                  <select
                    onChange={(e) =>
                      handleMemberChange(index, "tshirt", e.target.value)
                    }
                    className="p-4 bg-black/30 border border-cyan-400/30 rounded-lg text-white"
                  >
                    <option value="">T-Shirt Size</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment Section */}

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

            <div className="flex-1 text-gray-300 space-y-4 bg-[#0f172a] border border-cyan-400/20 p-8 rounded-xl">
              <h4 className="text-xl text-cyan-400 font-semibold">
                Payment Instructions
              </h4>

              <p>• ₹200 per Team – Idea Submission Fee</p>
              <p>
                • ₹300 per head – Hackathon Entry Fee (After Screening Selection)
              </p>
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
          className="w-full mt-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl"
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </motion.button>
      </motion.form>
    </div>
  );
}

type InputProps = {
  name?: string;
  placeholder: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({ name, placeholder, type = "text", onChange }: InputProps) {
  return (
    <motion.input
      whileFocus={{ scale: 1.02 }}
      name={name}
      type={type}
      placeholder={placeholder}
      required
      onChange={onChange}
      className="p-4 bg-black/30 border border-cyan-400/30 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
    />
  );
}