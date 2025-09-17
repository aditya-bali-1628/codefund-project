"use client";

import React from "react";
import { signIn } from "next-auth/react";
import Head from 'next/head';
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    document.title = 'Login | Get Me a Chai';
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 relative text-white px-4">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Heading and Subtext */}
        <div className="text-center mb-6 sm:mb-10 px-2">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            Code Your Way to Funding
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 sm:mt-3">
            Login to receive support from real people who believe in your skills.
          </p>
        </div>

        {/* Login Buttons */}
        <div className="bg-[#1E293B] p-4 sm:p-6 rounded-xl shadow-xl border border-[#334155] space-y-3 sm:space-y-4">
          {/* Google */}
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium hover:bg-[#334155] transition-colors duration-200"
          >
            <img 
              src="https://img.icons8.com/color/48/google-logo.png" 
              className="w-5 h-5 sm:w-6 sm:h-6 mr-2" 
              alt="Google logo"
              loading="lazy"
            />
            <span>Continue with Google</span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => signIn("linkedin")}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium hover:bg-[#334155] transition-colors duration-200"
          >
            <img 
              src="https://img.icons8.com/color/48/linkedin.png" 
              className="w-5 h-5 sm:w-6 sm:h-6 mr-2" 
              alt="LinkedIn logo"
              loading="lazy"
            />
            <span>Continue with LinkedIn</span>
          </button>

          {/* Twitter */}
          <button
            onClick={() => signIn("twitter")}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium hover:bg-[#334155] transition-colors duration-200"
          >
            <img 
              src="https://img.icons8.com/color/48/twitter--v1.png" 
              className="w-5 h-5 sm:w-6 sm:h-6 mr-2" 
              alt="Twitter logo"
              loading="lazy"
            />
            <span>Continue with Twitter</span>
          </button>

          {/* Facebook */}
          <button
            onClick={() => signIn("facebook")}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium hover:bg-[#334155] transition-colors duration-200"
          >
            <img 
              src="https://img.icons8.com/color/48/facebook-new.png" 
              className="w-5 h-5 sm:w-6 sm:h-6 mr-2" 
              alt="Facebook logo"
              loading="lazy"
            />
            <span>Continue with Facebook</span>
          </button>

          {/* GitHub */}
          <button
            onClick={() => signIn("github")}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium hover:bg-[#334155] transition-colors duration-200"
          >
            <img 
              src="https://img.icons8.com/ios-glyphs/30/github.png" 
              className="w-5 h-5 sm:w-6 sm:h-6 mr-2" 
              alt="GitHub logo"
              loading="lazy"
            />
            <span>Continue with GitHub</span>
          </button>

          {/* Apple - Note: You had duplicate Google button, changed to Apple */}
          <button
            onClick={() => signIn("apple")}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium hover:bg-[#334155] transition-colors duration-200"
          >
            <img 
              src="https://img.icons8.com/ios-filled/50/mac-os.png" 
              className="w-5 h-5 sm:w-6 sm:h-6 mr-2" 
              alt="Apple logo"
              loading="lazy"
            />
            <span>Continue with Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;