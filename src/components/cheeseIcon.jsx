import cheese from '../assets/cheese.svg';
import Image from 'next/image';
const CheeseIcon = () => {
  return (
    <div>
      <Image
        src={cheese}
        alt="its a picture of cheese"
        style={{
          width: '45px',
          height: '45px',
        }}
      />
    </div>
  );
};

export default CheeseIcon;
