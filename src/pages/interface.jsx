import React from "react";
import { useState } from "react";
import { Info, Mouse, Lamp } from "lucide-react";
import CatComponent from "@/components/component/catComponent";
import GameRulesModal from "@/components/component/rules";

const CatsNCheeseUI = () => {
  const gridItems = [
    { id: 0, col: "1 / span 6", row: "1 / span 6" },
    { id: 1, col: "16 / span 6", row: "1 / span 6" },
    { id: 2, col: "31 / span 6", row: "1 / span 6" },
    { id: 3, col: "1 / span 6", row: "16 / span 6" },
    { id: 4, col: "31 / span 6", row: "16 / span 6" },
    { id: 5, col: "1 / span 6", row: "31 / span 6" },
    { id: 6, col: "16 / span 6", row: "31 / span 6" },
    { id: 7, col: "31 / span 6", row: "31 / span 6" },
    { id: 8, col: "7 / span 24", row: "7 / span 24", isCenter: true },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
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
      <main className="flex-grow p-8">
        <div className="grid grid-cols-[repeat(36,1fr)] grid-rows-[repeat(36,1fr)] gap-1 h-[calc(100vh-12rem)] max-w-6xl mx-auto">
          {gridItems.map((item) => (
            <div
              key={item.id}
              style={{ gridColumn: item.col, gridRow: item.row }}
              className={`bg-white rounded-xl shadow-lg p-2 flex flex-col items-center justify-center transition duration-300 hover:shadow-xl
                ${
                  item.isCenter
                    ? "bg-gradient-to-br from-yellow-200 to-yellow-400 overflow-hidden"
                    : "hover:bg-blue-50"
                }`}
            >
              {item.isCenter ? (
                <div className="w-full h-full overflow-auto">
                  <CatComponent />
                </div>
              ) : (
                <div className="flex flex-col items-center text-sm font-semibold text-gray-700 md:text-base">
                  <span>Test</span>
                </div>
              )}
            </div>
          ))}
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
