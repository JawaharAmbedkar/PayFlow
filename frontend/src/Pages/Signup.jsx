import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { SignNav } from "../components/signNav";


export const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    return <div>
            <SignNav/>
            <div className="bg-gradient-to-r from-indigo-300 ... min-h-screen flex justify-center items-center">
            <div className="w-96 bg-slate-100 rounded-md p-2 shadow-xl">
            <Heading label={"Sign up"} />
            <SubHeading label={"Enter your information to create an account"}/>
            <InputBox onChange={(e) => {setFirstName(e.target.value)}} label={"First Name"} placeholder={"Jhon"}/>
            <InputBox onChange={(e) => {setLastName(e.target.value)}} label={"Last Name"} placeholder={"Doe"}/>
            <InputBox onChange={(e) => {setUserName(e.target.value)}} label={"Email"} placeholder={"harkirat@gmail.com"}/>
            <InputBox onChange={(e) => {setPassword(e.target.value)}} label={"Password"} placeholder={"12345"}/>
            <div className="flex justify-center">{error && <div className="text-red-500 mt-2">{error}</div>}</div>
            <div className="pt-2">
            <Button onClick={async() => {
                try{const response = await axios.post("http://localhost:3000/api/v1/user/signup" , {
                    username,
                    password,
                    firstName,
                    lastName,

                });
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard")

            }catch (error) {
                if (error.response) {
                    // Backend validation errors
                    setError(error.response.data.message || 'Error signing up');
                } else {
                    // Network or other errors
                    setError('Error signing up');
                }
            }}
        }
                 label = {"Sign up"}/>
            </div>
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
      </div>
      <Footer/>
    </div>
}