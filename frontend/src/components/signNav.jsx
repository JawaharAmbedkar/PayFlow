import { Link } from "react-router-dom";

export function SignNav() {
  return (
    <div className="flex justify-start items-center p-4 shadow-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-100 rounded-b-3xl">
      {/* Logo */}
      <Link to="/frontPage">
        <img className="w-[100px] cursor-pointer" src="/PayFlow.png" alt="PayFlow" />
      </Link>
    </div>
  );
}
