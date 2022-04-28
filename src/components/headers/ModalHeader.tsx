import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { useGlobalContext } from "../../store/context";

interface props {
  close: () => boolean;
  title: string;
}

const ModalHeader: React.FC<props> = ({ close, title }) => {
  const { selectedDay, setSelectedActivity } = useGlobalContext();

  return (
    <header className="bg-gray-100 px-4 py-4 flex justify-between items-center sticky top-0 left-0 ">
      {/* heading */}
      <p className="text-lg">
        {selectedDay.format("dddd, MMMM DD")} {title}
      </p>

      <MdOutlineClose
        onClick={() => {
          close();
          setSelectedActivity(null);
        }}
        className="text-gray-400 cursor-pointer"
      />
    </header>
  );
};

export default ModalHeader;
