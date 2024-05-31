import React, { useEffect, useRef } from "react";

interface InstructionProps {
  onClose: () => void;
}

const Instruction: React.FC<InstructionProps> = ({ onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to close the Instruction component when clicked outside
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose(); // Close the Instruction component
      }
    }

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" inset-0 flex justify-center items-center z-50" ref={ref}>
      <div className="absolute top-5 -left-5 z-50 transform -translate-x-full">
        <div className="relative bg-white  p-4 border border-gray-300 rounded-lg shadow-lg  md:w-48 lg:w-60 text-black">
          <p>
            Enter your{" "}
            <span className="text-purple-700 font-semibold">Clippy ID </span>to
            get the coppied text or file
          </p>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white"></div>
        </div>
      </div>

      <div className="absolute top-44 -left-5 z-50 transform -translate-x-full">
        <div className="relative bg-white p-4 border border-gray-300 rounded-lg shadow-lg md:w-48 lg:w-60 text-black">
          <p>
            Enter{" "}
            <span className="text-orange-700 font-semibold">the text </span>you
            want to copy and generate your{" "}
            <span className="text-purple-700 font-semibold">Clippy ID </span>
          </p>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white"></div>
        </div>
      </div>

      <div className="absolute bottom-0 -left-5 z-50 transform -translate-x-full">
        <div className="relative bg-white p-4 border border-gray-300 rounded-lg shadow-lg md:w-48 lg:w-64 text-black">
          <p>
            You can also{" "}
            <span className="text-orange-700 font-semibold">
              upload the file{" "}
            </span>
            to copy and get your{" "}
            <span className="text-purple-700 font-semibold">Clippy ID </span>
          </p>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
