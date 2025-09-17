"use client"
import { FireIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'Home | Get Me a Chai';
  }, []);

  return (
    <>
      <div className="h-screen text-white">
        <div className="relative  w-full bg-slate-950"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <section className="text-white py-20 px-6 text-center">
            <h1 className="flex justify-center items-center gap-2 text-4xl md:text-5xl font-bold mb-4">
             <FireIcon className="w-13 h-15 text-orange-400 animate-spin" />
              CodeFund
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
              Fuel open-source, indie apps, and coder projects. Empower the builders of tomorrow — one contribution at a time.
            </p>
            <button className="mt-6 px-6 py-3 rounded-full text-white font-medium bg-gradient-to-br
           from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  text-sm  text-center cursor-pointer transition-all duration-300">
              Explore Projects
            </button>
          </section>
          <div className="bg-white h-1 opacity-10"> </div>
          <section className="py-12 text-white">
            <h2 className="text-3xl font-semibold text-center mb-10">Your Fans can buy you a Chai</h2>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">

              {/* Block 1 */}
              <div className="flex flex-col items-center p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 p-2 shadow-md">
                  <img src="/5030900_2636676.jpg" alt="Help" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="font-semibold text-lg mb-1 text-white">Fans want to help</h3>
                <p className="text-sm text-white/80 text-center">Your fans are available to support you</p>
              </div>

              {/* Block 2 */}
              <div className="flex flex-col items-center p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 p-2 shadow-md">
                  <img src="/133740038_10243319.png" alt="Contribute" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="font-semibold text-lg mb-1 text-white">Fans want to contribute</h3>
                <p className="text-sm text-white/80 text-center">Your fans are willing to contribute financially</p>
              </div>

              {/* Block 3 */}
              <div className="flex flex-col items-center p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 p-2 shadow-md">
                  <img src="/1050774_OLAZ670.jpg" alt="Collaborate" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="font-semibold text-lg mb-1 text-white">Fans want to collaborate</h3>
                <p className="text-sm text-white/80 text-center">Your fans are ready to collaborate with you</p>
              </div>


            </div>
          </section>

        </div>

      </div>

    </>
  );

}
