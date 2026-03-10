import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxmmvfii02mY1c8rPpR4aykE3bI-s6AjiUWpvnjm0h67q0wxkPgusiR4EkrxnLUvqa5Pw/exec";

export default function Register() {

  const navigate = useNavigate();

  const [teamSize,setTeamSize] = useState(1);
  const [members,setMembers] = useState<any[]>([]);
  const [totalAmount,setTotalAmount] = useState(300);
  const [loading,setLoading] = useState(false);

  const [paymentScreenshot,setPaymentScreenshot] = useState("");
  const [paymentType,setPaymentType] = useState("");

  const [formData,setFormData] = useState({
    teamName:"",
    leaderName:"",
    leaderGender:"",
    email:"",
    contactNumber:"",
    college:"",
    accommodation:"",
    food:"",
    utrId:""
  });

  const handleChange=(e:any)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleTeamSizeChange=(e:any)=>{

    let size = Number(e.target.value);

    if(size>5) size=5;
    if(size<1) size=1;

    setTeamSize(size);
    setTotalAmount(size * 300);

    const arr=[];

    for(let i=0;i<size-1;i++){
      arr.push({
        name:"",
        email:"",
        gender:"",
        tshirt:""
      });
    }

    setMembers(arr);
  };

  const handleMemberChange=(index:number,field:string,value:string)=>{

    const updated=[...members];
    updated[index][field]=value;
    setMembers(updated);

  };

  const handleFileChange=(e:any)=>{

    const file=e.target.files[0];
    if(!file) return;

    setPaymentType(file.type);

    const reader=new FileReader();
    reader.readAsDataURL(file);

    reader.onload=()=>{
      setPaymentScreenshot(reader.result as string);
    };

  };

  const handleSubmit=async(e:any)=>{

    e.preventDefault();
    setLoading(true);

    const payload={

      ...formData,

      member1:members[0]?.name || "",
      member1Email:members[0]?.email || "",
      member1Gender:members[0]?.gender || "",
      member1Tshirt:members[0]?.tshirt || "",

      member2:members[1]?.name || "",
      member2Email:members[1]?.email || "",
      member2Gender:members[1]?.gender || "",
      member2Tshirt:members[1]?.tshirt || "",

      member3:members[2]?.name || "",
      member3Email:members[2]?.email || "",
      member3Gender:members[2]?.gender || "",
      member3Tshirt:members[2]?.tshirt || "",

      member4:members[3]?.name || "",
      member4Email:members[3]?.email || "",
      member4Gender:members[3]?.gender || "",
      member4Tshirt:members[3]?.tshirt || "",

      paymentScreenshot,
      paymentType

    };

    try{

      const res=await fetch(GOOGLE_SCRIPT_URL,{
        method:"POST",
        body:JSON.stringify(payload)
      });

      const result=await res.json();

      if(result.success){

        alert("Registration Successful\nTeam ID : "+result.teamId);
        navigate("/");

      }else{

        alert(result.message || "Submission failed");

      }

    }catch{

      alert("Network error");

    }

    setLoading(false);

  };

  return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#001f2f] to-[#000814] p-6">

<motion.form
onSubmit={handleSubmit}
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.7}}
className="w-full max-w-6xl bg-black/40 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-10 shadow-[0_0_60px_rgba(0,255,255,0.2)]"
>

<h2 className="text-4xl font-bold text-center text-cyan-400 mb-10">
Hackathon Team Registration
</h2>

{/* TEAM DETAILS */}

<div className="grid md:grid-cols-2 gap-6">

<input name="teamName" placeholder="Team Name" required onChange={handleChange}
className="input-field"/>

<input name="leaderName" placeholder="Team Leader Name" required onChange={handleChange}
className="input-field"/>

<input name="email" placeholder="Leader Email" required onChange={handleChange}
className="input-field"/>

<input name="contactNumber" placeholder="Leader Phone" required onChange={handleChange}
className="input-field"/>

<select name="leaderGender" required onChange={handleChange}
className="input-field">

<option value="">Leader Gender</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>

</select>

<input name="college" placeholder="College" required onChange={handleChange}
className="input-field"/>

</div>

{/* TEAM SIZE */}

<div className="mt-6">

<input
type="number"
placeholder="Team Size (Max 5)"
onChange={handleTeamSizeChange}
className="input-field"
/>

</div>

{/* MEMBERS */}

{members.map((m,i)=>(

<div key={i} className="mt-8 border border-cyan-400/20 rounded-xl p-6">

<h3 className="text-cyan-400 mb-4">
Member {i+1}
</h3>

<div className="grid md:grid-cols-2 gap-4">

<input
placeholder="Member Name"
className="input-field"
onChange={(e)=>handleMemberChange(i,"name",e.target.value)}
/>

<input
placeholder="Member Email"
className="input-field"
onChange={(e)=>handleMemberChange(i,"email",e.target.value)}
/>

<select
className="input-field"
onChange={(e)=>handleMemberChange(i,"gender",e.target.value)}
>

<option value="">Gender</option>
<option>Male</option>
<option>Female</option>

</select>

<select
className="input-field"
onChange={(e)=>handleMemberChange(i,"tshirt",e.target.value)}
>

<option value="">T-Shirt Size</option>
<option>S</option>
<option>M</option>
<option>L</option>
<option>XL</option>

</select>

</div>

</div>

))}

{/* TOTAL PAYMENT */}

<div className="text-center mt-8">

<h3 className="text-green-400 text-2xl font-bold">
Total Payment : ₹{totalAmount}
</h3>

<p className="text-sm text-gray-400">
₹300 per participant
</p>

</div>

{/* PAYMENT */}

<div className="mt-10 text-center space-y-4">

<img
src="/images/upi-qr.jpeg"
className="w-64 mx-auto rounded-xl"
/>

</div>

<div className="grid md:grid-cols-2 gap-6 mt-8">

<input
name="utrId"
placeholder="Enter UTR / Transaction ID"
required
onChange={handleChange}
className="input-field"
/>

<input
type="file"
accept="image/*"
required
onChange={handleFileChange}
className="input-field"
/>

</div>

<button
type="submit"
disabled={loading}
className="w-full mt-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl"
>

{loading ? "Submitting..." : "Submit Registration"}

</button>

</motion.form>

</div>

);

}