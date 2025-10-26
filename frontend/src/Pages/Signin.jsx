import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { PasswordInput } from "../components/PasswordInput";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { SignNav } from "../components/signNav";
import { Footer } from "../components/Footer";
import { API_URL } from "../../config";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/signin`, {
        username: username.toLowerCase(), // normalize email
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid username or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SignNav />
      <div className="bg-gradient-to-r from-indigo-300 min-h-screen flex justify-center items-center px-4">
        <div className="w-full max-w-md bg-slate-100 rounded-md p-6 shadow-xl">
          <Heading label="Sign in" />
          <SubHeading label="Enter your credentials to access your account" />
          <InputBox label="Email" placeholder="harkirat@gmail.com" onChange={(e) => setUsername(e.target.value)} />
          <PasswordInput label="Password" placeholder="••••••" onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
          <Button onClick={handleSignIn} label="Sign in" loading={loading} />
          <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
