import React from "react";
import { useState } from "react";
import { Info } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import CatComponent from "@/components/component/catComponent";
import GameRulesModal from "@/components/component/rules";

const CatsNCheeseUI = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rounds, setRounds] = useState(0);
  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      {/* Header */}
      <header className="flex items-center justify-between p-2 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <Image
            src={Logo}
            alt="Cats n' Cheese Logo"
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-2xl font-bold text-purple-600">
            Cats n&apos; Cheese
          </h1>
        </div>
        <button
          onClick={toggleModal}
          className="flex items-center px-4 py-2 font-semibold text-purple-800 transition duration-300 bg-yellow-400 rounded-full hover:bg-yellow-500"
        >
          <Info className="mr-2" size={18} />
          Rules
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-8rem)]">
          {/* Left Column */}
          <div className="flex flex-col col-span-2 space-y-4">
            <div className="flex-grow p-2 bg-white shadow-lg rounded-xl">
              <div className="text-sm font-semibold text-gray-700 md:text-base">
                Round - {rounds}
              </div>
            </div>
            <div className="flex-grow p-2 bg-white shadow-lg rounded-xl">
              <div className="text-sm font-semibold text-gray-700 md:text-base">
                Player points
              </div>
            </div>
            <div className="flex-grow p-2 bg-white shadow-lg rounded-xl">
              <div className="text-sm font-semibold text-gray-700 md:text-base">
                CPU1 points
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="col-span-8 overflow-hidden bg-white shadow-lg rounded-xl">
            <CatComponent roundNumber={setRounds} />
          </div>

          {/* Right Column */}
          <div className="flex flex-col col-span-2 space-y-4">
            <div className="flex-grow p-2 bg-white shadow-lg rounded-xl">
              <div className="text-sm font-semibold text-gray-700 md:text-base">
                CPU2 points
              </div>
            </div>
            <div className="flex-grow p-2 bg-white shadow-lg rounded-xl">
              <div className="text-sm font-semibold text-gray-700 md:text-base">
                CPU3 points
              </div>
            </div>
            <div className="flex-grow p-2 bg-white shadow-lg rounded-xl">
              <div className="text-sm font-semibold text-gray-700 md:text-base">
                End Game Button
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="col-span-12 p-2 bg-white shadow-lg rounded-xl">
            <div className="text-sm font-semibold text-gray-700 md:text-base">
              Log of actions
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-600 bg-white shadow-md">
        <p>
          © 2024 Cats n&apos; Cheese |{" "}
          <a href="#" className="text-purple-600 hover:underline">
            GitHub
          </a>
        </p>
      </footer>

      <GameRulesModal isOpen={modalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default CatsNCheeseUI;
