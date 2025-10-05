import { Link } from "react-router-dom";

export const MainpageNav = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200 text-gray-800 py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
        {/* Logo */}
        <div className="flex items-center">
          <img className="w-[100px]" src="/PayFlow.png" alt="PayFlow" />
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-6">
          {/* Login */}
          <Link
            to="/signin"
            className="flex items-center gap-1 font-semibold text-sm sm:text-lg text-gray-700 hover:text-indigo-800 transition-transform duration-200 hover:scale-105"
          >
            Already have an account?{" "}
            <img className="w-[35px] sm:w-[45px]" src="/login.png" alt="login" />
          </Link>

          {/* Signup */}
          <Link
            to="/signup"
            className="flex items-center gap-1 font-semibold text-sm sm:text-lg text-gray-700 hover:text-indigo-800 transition-transform duration-200 hover:scale-105"
          >
            New?
            <img className="w-[35px] sm:w-[45px]" src="/signup.png" alt="signup" />
          </Link>
        </div>
      </div>

      {/* Bottom Accent Line (matches footer) */}
      <div className="h-[3px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 mt-3 opacity-70 rounded-full w-11/12 mx-auto"></div>
    </nav>
  );
};
