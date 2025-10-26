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

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/signup`, {
        firstName,
        lastName,
        username: username.toLowerCase(), // normalize email
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error signing up");
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
          <Heading label="Sign up" />
          <SubHeading label="Enter your information to create an account" />
          <InputBox label="First Name" placeholder="John" onChange={(e) => setFirstName(e.target.value)} />
          <InputBox label="Last Name" placeholder="Doe" onChange={(e) => setLastName(e.target.value)} />
          <InputBox label="Email" placeholder="harkirat@gmail.com" onChange={(e) => setUsername(e.target.value)} />
          <PasswordInput label="Password" placeholder="••••••" onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
          <Button onClick={handleSignup} label="Sign up" loading={loading} />
          <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
