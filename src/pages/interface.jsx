import React, { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";
import CatComponent from "@/components/component/catComponent";
import GameRulesModal from "@/components/component/rules";

const CatsNCheeseUI = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [actionLogs, setActionLogs] = useState([]);
  const logContainerRef = useRef(null);
  const toggleModal = () => setModalOpen(!modalOpen);

  const addLog = (log) => {
    const newLog = { text: log, isNew: true, id: Date.now() };
    setActionLogs((prevLogs) => [...prevLogs, newLog]);

    // Remove the 'isNew' flag after the animation
    setTimeout(() => {
      setActionLogs((prevLogs) =>
        prevLogs.map((log) =>
          log.id === newLog.id ? { ...log, isNew: false } : log
        )
      );
    }, 500); // Duration of the animation
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [actionLogs]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      {/* Header */}
      <header className="flex items-center justify-between p-2 bg-white shadow-md">
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
      <main className="flex-grow p-4">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-12rem)]">
          {/* Left Column */}
          <div className="flex flex-col col-span-2 space-y-4">
            <div className="flex-grow p-2 bg-white shadow-lg rounded-xl">
              <div className="text-sm font-semibold text-gray-700 md:text-base">
                Test
              </div>
            </div>
            <div className="flex-grow p-2 bg-white shadow-lg rounded-xl">
              <div className="text-sm font-semibold text-gray-700 md:text-base">
                CPU1 points
              </div>
            </div>
            <div className="flex-grow p-2 bg-white shadow-lg rounded-xl">
              <div className="text-sm font-semibold text-gray-700 md:text-base">
                Player points
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="col-span-8 overflow-hidden bg-white shadow-lg rounded-xl">
            <CatComponent addLog={addLog} />
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

          {/* Bottom Row - Log of actions */}
          <div
            ref={logContainerRef}
            className="col-span-12 p-2 overflow-y-auto bg-white shadow-lg rounded-xl"
            style={{ maxHeight: "105px" }}
          >
            <div className="text-sm font-semibold text-gray-700 md:text-base">
              Log of actions
            </div>
            <div className="mt-2 space-y-1">
              {actionLogs.map((log) => (
                <p
                  key={log.id}
                  className={`text-sm text-gray-600 transition-all duration-500 ease-in-out
                    ${
                      log.isNew
                        ? "bg-yellow-100 scale-102"
                        : "bg-transparent scale-100"
                    }`}
                >
                  {log.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-600 bg-white shadow-md">
        <p>
          © 2024 Cats n&apos; Cheese |{" "}
          <a
            href="https://github.com/sylfort/cats-n-cheese"
            className="text-purple-600 hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>

      <GameRulesModal isOpen={modalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default CatsNCheeseUI;