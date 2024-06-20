import Image from "next/image";
import warriorCat from "@/assets/warrior_cat.jpg";
import gangsterCat from "@/assets/gangster_cat.jpg";
import pirateCat from "@/assets/pirate_cat.jpg";
import wizardCat from "@/assets/wizard_cat.jpg";

const CatsButtons = ({ cats, onSelectCat }) => {
  return (
    <div className="flex items-center justify-center h-screen space-x-2">
      <button
        onClick={() => onSelectCat(cats.cat1)}
        className="flex flex-col items-center px-4 py-2 text-white bg-red-500 rounded"
      >
        <Image src={warriorCat} alt="Warrior Cat" width={150} height={150} />
        <span>{cats.cat1.name}</span>
      </button>
      <button
        onClick={() => onSelectCat(cats.cat2)}
        className="flex flex-col items-center px-4 py-2 text-white bg-green-500 rounded"
      >
        <Image src={gangsterCat} alt="Gangster Cat" width={150} height={150} />
        <span>{cats.cat2.name}</span>
      </button>
      <button
        onClick={() => onSelectCat(cats.cat3)}
        className="flex flex-col items-center px-4 py-2 text-white bg-pink-500 rounded"
      >
        <Image src={pirateCat} alt="Pirate Cat" width={150} height={150} />
        <span>{cats.cat3.name}</span>
      </button>
      <button
        onClick={() => onSelectCat(cats.cat4)}
        className="flex flex-col items-center px-4 py-2 text-white bg-blue-500 rounded"
      >
        <Image src={wizardCat} alt="Wizard Cat" width={150} height={150} />
        <span>{cats.cat4.name}</span>
      </button>
    </div>
  );
};

export default CatsButtons;
