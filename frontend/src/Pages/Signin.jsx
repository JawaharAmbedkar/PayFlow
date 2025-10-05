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

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSignIn() {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            navigate("/dashboard");
        } catch (error) {
            setError('Invalid username or password');
        }
    }

    return (<div>
             <SignNav/>
            <div className="bg-gradient-to-r from-indigo-300 ... min-h-screen flex justify-center items-center">
            <div className="w-96 bg-slate-100 rounded-md p-2 shadow-xl">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value);
                }} placeholder={"harkirat@gmail.com"} label={"Email"} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value);
                }} placeholder={"12345"} label={"Password"} />
                {error && <div className="text-red-500">{error}</div>}
                <div className="pt-4">
                    <Button onClick={handleSignIn} label={"Sign in"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
            
        </div>
        <Footer/>
        </div>
    );
};
