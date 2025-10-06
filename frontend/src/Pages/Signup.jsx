import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { SignNav } from "../components/signNav";
import { API_URL } from "../../config";
import { PasswordInput } from "../components/PasswordInput";


export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/signup`, {
        firstName,
        lastName,
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Error signing up");
      } else {
        setError("Error signing up");
      }
    }
  }

  return (
    <div>
      <SignNav />
      <div className="bg-gradient-to-r from-indigo-300 min-h-screen flex justify-center items-center px-4">
        <div className="w-full max-w-md bg-slate-100 rounded-md p-6 shadow-xl">
          <Heading label="Sign up" />
          <SubHeading label="Enter your information to create an account" />
          <InputBox
            label="First Name"
            placeholder="John"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            label="Last Name"
            placeholder="Doe"
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputBox
            label="Email"
            placeholder="harkirat@gmail.com"
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="••••••"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
          <div className="pt-2">
            <Button onClick={handleSignup} label="Sign up" />
          </div>
          <BottomWarning
            label="Already have an account?"
            buttonText="Sign in"
            to="/signin"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
