import { Footer } from "../components/Footer";
import { MainpageNav } from "../components/MainPageNav";

export const FrontPage = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <MainpageNav />

      {/* Full Page Image under Navbar */}
      <div className="flex-1 flex justify-center items-center overflow-hidden">
        {/* Desktop/Tablet Image */}
        <img
          src="/FrontPage.png"
          alt="FrontPage Background"
          className="hidden sm:block max-w-full max-h-full w-auto h-auto object-contain"
        />

        {/* Mobile Image */}
        <img
          src="/mobile.png"
          alt="Mobile Background"
          className="block sm:hidden max-w-full max-h-full w-auto h-auto object-contain"
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
