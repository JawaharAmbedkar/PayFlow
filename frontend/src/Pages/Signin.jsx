import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { SignNav } from "../components/signNav";
import { API_URL } from "../../config";
import { InputBox } from "../components/InputBox";
import { PasswordInput } from "../components/PasswordInput";


export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignIn() {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/signin`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid username or password");
    }
  }

  return (
    <div>
      <SignNav />
      <div className="bg-gradient-to-r from-indigo-300 min-h-screen flex justify-center items-center px-4">
        <div className="w-full max-w-md bg-slate-100 rounded-md p-6 shadow-xl">
          <Heading label="Sign in" />
          <SubHeading label="Enter your credentials to access your account" />
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
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="pt-2">
            <Button onClick={handleSignIn} label="Sign in" />
          </div>
          <BottomWarning
            label="Don't have an account?"
            buttonText="Sign up"
            to="/signup"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
