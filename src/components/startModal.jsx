import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../assets/logo.png';
import GameRulesModal from './component/rules';

const StartModal = ({ toggleStartModal }) => {
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  const toggleRulesModal = () => {
    setIsRulesOpen(!isRulesOpen);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="relative w-11/12 p-5 mx-auto bg-white border rounded-md shadow-lg md:w-3/4 lg:w-1/2">
        <Image
          src={logo}
          alt="cats and cheese logo"
        />
        <div className="mt-4 flex justify-center">
          <button
            onClick={toggleRulesModal}
            className="px-4 py-2 mr-2 font-semibold text-white bg-purple-600 rounded hover:bg-purple-700"
          >
            How to play
          </button>
          <button
            onClick={toggleStartModal}
            className="px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700"
          >
            Let&apos;s start!
          </button>
        </div>
      </div>
      <GameRulesModal
        isOpen={isRulesOpen}
        toggleModal={toggleRulesModal}
      />
    </div>
  );
};

export default StartModal;
