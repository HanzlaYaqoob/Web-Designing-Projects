import React from "react";
import { LayoutTemplate } from "lucide-react";
import { Link } from "react-router-dom";
import { ProfileInfoCard } from "./Cards.jsx";
const Navbar = () => {
  return (
    <div className="h-16 bg-white/50 backdrop-blur-xl border-b border-violet-100/50 py-2.5 px-8 lg:px-50 sticky top-0 z-50">
      <div className="mx-w-6xl mx-auto flex items-center justify-between gap-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center pb-6 gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-200">
              <LayoutTemplate className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl sm:text2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Resume Xpert</span>
          </div>
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
