const EndGameModal = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
    >
      End Game
    </button>
  );
};

export default EndGameModal;
