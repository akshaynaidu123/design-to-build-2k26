import { useState } from "react";
import { motion } from "framer-motion";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyH0iek-Q3Y5XbCNCyixXW9uffdvBQ1oU2wPFN_T3YkxMOJ69JQimO2nAaFxltJijcs0g/exec";

export default function Submission() {

  const [loading,setLoading] = useState(false);

  const [reportBase64,setReportBase64] = useState("");
  const [fileType,setFileType] = useState("");

  const [formData,setFormData] = useState({
    teamId:"",
    teamName:"",
    description:"",
    videoLink:"",
    githubLink:""
  });


  const handleChange = (e:any)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };


  const handleFileChange = (e:any)=>{

    const file = e.target.files[0];
    if(!file) return;

    if(file.size > 10 * 1024 * 1024){
      alert("PDF must be less than 10MB");
      return;
    }

    setFileType(file.type);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = ()=>{
      setReportBase64(reader.result as string);
    }

  };


  const handleSubmit = async(e:any)=>{
    e.preventDefault();

    setLoading(true);

    const payload = {
      ...formData,
      reportFile:reportBase64,
      fileType:fileType
    };

    try{

      const res = await fetch(GOOGLE_SCRIPT_URL,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
      });

      const result = await res.json();

      if(result.success){

        alert("🎉 Project Submitted Successfully");

      }else{

        alert(result.error || "Submission Failed");

      }

    }catch(err){

      alert("Unable to connect to server.");

    }

    setLoading(false);

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-black p-6">

      <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl bg-black/40 p-10 rounded-xl border border-cyan-400/20"
      >

        <h2 className="text-3xl text-center text-cyan-400 mb-8">
          Submit Project
        </h2>


        <div className="grid md:grid-cols-2 gap-6">

          <Input
          name="teamId"
          placeholder="Team ID"
          onChange={handleChange}
          />

          <Input
          name="teamName"
          placeholder="Team Name"
          onChange={handleChange}
          />

          <Input
          name="videoLink"
          placeholder="Video Link (Optional)"
          onChange={handleChange}
          />

          <Input
          name="githubLink"
          placeholder="GitHub Link (Optional)"
          onChange={handleChange}
          />

        </div>


        <textarea
        name="description"
        placeholder="Project Description"
        required
        onChange={handleChange}
        className="w-full mt-6 p-4 rounded-lg bg-black/30 border border-cyan-400/30 text-white"
        />


        <div className="mt-6">

          <p className="text-cyan-300 mb-2">
            Upload Project Report (PDF Only)
          </p>

          <input
          type="file"
          accept="application/pdf"
          required
          onChange={handleFileChange}
          />

        </div>


        <button
        type="submit"
        disabled={loading}
        className="w-full mt-8 py-4 bg-cyan-500 rounded-xl font-bold"
        >

        {loading ? "Submitting..." : "Submit Project"}

        </button>

      </motion.form>

    </div>

  );

}



function Input({name,placeholder,onChange}:any){

  return(

    <input
    name={name}
    placeholder={placeholder}
    required
    onChange={onChange}
    className="p-4 bg-black/30 border border-cyan-400/30 rounded-lg text-white"
    />

  )

}