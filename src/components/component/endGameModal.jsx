const EndGameModal = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 mr-2 font-semibold text-white transition duration-300 bg-purple-700 rounded-full hover:bg-purple-800"
    >
      End Game
    </button>
  );
};

export default EndGameModal;
