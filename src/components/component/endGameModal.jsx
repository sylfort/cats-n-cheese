import { useState } from "react";
import { X } from "lucide-react";

const EndGameModal = ({ onClick }) => {

  return (
    <>
      <button
        onClick={onClick}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        <p> End Game</p>
        {/* <p onClick={onClick}>End Game</p> */}
      </button>
{/* 
      {isOpen && (
        <div
          className="fixed inset-0 w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50"
          onClick={toggleModal}
        >
          <div
            className="relative w-11/12 p-5 mx-auto bg-white border rounded-md shadow-lg top-20 md:w-3/4 lg:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Game ended.</h3>
              <button onClick={toggleModal} className="text-black close-modal">
                <X size={24} />
              </button>
            </div>

            <div className="mt-2 overflow-y-auto max-h-[70vh]">{scores}</div>

            <button
              className="mt-2 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={restartAndClose}
            >
              Restart Game
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default EndGameModal;
