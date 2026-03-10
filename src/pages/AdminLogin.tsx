import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const ADMIN_USERNAME = "scet@123";
  const ADMIN_PASSWORD = "scet@123";

  const handleLogin = () => {

    if(!username || !password){
      alert("Please enter username and password");
      return;
    }

    setLoading(true);

    setTimeout(()=>{

      if(username === ADMIN_USERNAME && password === ADMIN_PASSWORD){

        localStorage.setItem("admin","true");

        navigate("/admin-dashboard");

      }else{

        alert("Invalid admin credentials");

      }

      setLoading(false);

    },600);

  };

  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter"){
      handleLogin();
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#001f2f] to-[#000814]">

      <motion.div
        initial={{opacity:0,y:60}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.6}}
        className="w-96 p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-[0_0_40px_rgba(0,255,255,0.2)]"
      >

        <h2 className="text-3xl text-center text-cyan-400 font-bold mb-8">
          Admin Login
        </h2>

        <div className="space-y-5">

          <motion.input
            whileFocus={{scale:1.02}}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full p-3 bg-black/30 border border-cyan-400/30 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition"
          />

          <motion.input
            whileFocus={{scale:1.02}}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full p-3 bg-black/30 border border-cyan-400/30 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition"
          />

          <motion.button
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            disabled={loading}
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.7)] transition-all duration-300"
          >

            {loading ? "Authenticating..." : "Login"}

          </motion.button>

        </div>

      </motion.div>

    </div>

  );

}