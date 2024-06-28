import React from "react";
import { useState } from "react";
import { Info } from "lucide-react";
import CatComponent from "@/components/component/catComponent";
import GameRulesModal from "@/components/component/rules";

const CatsNCheeseUI = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      {/* Main Content */}
      <main className="flex-grow p-8">
        <div className="grid grid-cols-[repeat(36,1fr)] grid-rows-[repeat(36,1fr)] gap-1 h-[calc(100vh-12rem)] max-w-6xl mx-auto">
          <div
            style={{ gridColumn: "1 / span 6", gridRow: "1 / span 6" }}
            className="flex flex-col items-center justify-center p-2"
          >
            <img
              src="/final_logo.png"
              alt="Cats n' Cheese Logo"
              className="mt-8 rounded-lg w-18 h-18"
            />
            <div className="flex flex-col items-center text-sm font-semibold text-gray-700 md:text-base">
              {/* <span>Cats n' Cheese</span> */}
            </div>
          </div>
          <div
            style={{ gridColumn: "16 / span 6", gridRow: "1 / span 6" }}
            className="flex flex-col items-center justify-center p-2 transition duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl hover:bg-blue-50"
          >
            <div className="flex flex-col items-center text-sm font-semibold text-gray-700 md:text-base">
              <span>CPU 2 points</span>
            </div>
          </div>
          <div
            style={{ gridColumn: "31 / span 6", gridRow: "1 / span 6" }}
            className="flex flex-col items-center justify-center p-2"
          >
            <button
              onClick={toggleModal}
              className="flex items-center px-4 py-2 font-semibold text-purple-800 transition duration-300 bg-yellow-400 rounded-full hover:bg-yellow-500"
            >
              <Info className="mr-2" size={18} />
              Rules
            </button>
          </div>
          <div
            style={{ gridColumn: "1 / span 6", gridRow: "16 / span 6" }}
            className="flex flex-col items-center justify-center p-2 transition duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl hover:bg-blue-50"
          >
            <span>CPU 1 points</span>
          </div>
          <div
            style={{ gridColumn: "31 / span 6", gridRow: "16 / span 6" }}
            className="flex flex-col items-center justify-center p-2 transition duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl hover:bg-blue-50"
          >
            <div className="flex flex-col items-center text-sm font-semibold text-gray-700 md:text-base">
              <span>CPU 3 points</span>
            </div>
          </div>
          <div
            style={{ gridColumn: "1 / span 6", gridRow: "31 / span 6" }}
            className="flex flex-col items-center justify-center p-2 transition duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl hover:bg-blue-50"
          >
            <div className="flex flex-col items-center text-sm font-semibold text-gray-700 md:text-base">
              <span>Player points</span>
            </div>
          </div>
          <div
            style={{ gridColumn: "12 / span 14", gridRow: "31 / span 6" }}
            className="flex flex-col items-center justify-center p-2 transition duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl hover:bg-blue-50"
          >
            <div className="flex flex-col items-center text-sm font-semibold text-gray-700 md:text-base">
              <span>Log of actions</span>
            </div>
          </div>
          <div
            style={{ gridColumn: "31 / span 6", gridRow: "31 / span 6" }}
            className="flex flex-col items-center justify-center p-2 transition duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl hover:bg-blue-50"
          >
            <div className="flex flex-col items-center text-sm font-semibold text-gray-700 md:text-base">
              <span>End Game Button</span>
            </div>
          </div>
          <div
            style={{ gridColumn: "7 / span 24", gridRow: "7 / span 24" }}
            className="flex flex-col items-center justify-center p-2 overflow-hidden transition duration-300 shadow-lg bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-xl hover:shadow-xl"
          >
            <div className="w-full h-full overflow-auto">
              <CatComponent />
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
