import React, { useState } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import GameRulesModal from "./component/rules";

const StartModal = ({ toggleStartModal }) => {
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  const toggleRulesModal = () => {
    setIsRulesOpen(!isRulesOpen);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="relative w-6/12 p-5 mx-auto bg-white border rounded-md shadow-lg md:w-2/4 lg:w-1/4">
        <Image src={logo} alt="cats and cheese logo" />
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleRulesModal}
            className="flex items-center px-4 py-2 mr-2 font-semibold text-white transition duration-300 bg-green-600 rounded-full hover:bg-green-700"
          >
            How to play
          </button>
          <button
            onClick={toggleStartModal}
            className="flex items-center px-4 py-2 font-semibold text-purple-800 transition duration-300 bg-yellow-400 rounded-full hover:bg-yellow-500"
          >
            Let&apos;s start!
          </button>
        </div>
      </div>
      <GameRulesModal isOpen={isRulesOpen} toggleModal={toggleRulesModal} />
    </div>
  );
};

export default StartModal;
