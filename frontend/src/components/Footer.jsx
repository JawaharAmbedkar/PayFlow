export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200 text-gray-800 py-8 shadow-inner">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-8 text-center sm:text-left space-y-4 sm:space-y-0">
        {/* Left side - rights text */}
        <p className="text-base sm:text-xl font-semibold tracking-wide">
          © {new Date().getFullYear()}{" "}
          <span className="font-extrabold text-indigo-700">PayFlow</span>. All rights reserved.
        </p>

        {/* Right side - contact info */}
        <p className="text-sm sm:text-lg font-medium text-gray-700">
          For further details, email us at{" "}
          <a
            href="mailto:payflow@gmail.com"
            className="text-indigo-700 font-semibold hover:text-purple-800 transition-colors duration-200"
          >
            payflow@gmail.com
          </a>
        </p>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 mt-6 opacity-70 rounded-full w-11/12 mx-auto"></div>
    </footer>
  );
};
