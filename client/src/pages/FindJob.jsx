import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";

const FindJob = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  return (
    <div className="w-full h-[90%] items-center justify-center flex">
      <div className="gap-2 h-[80px] p-2 bg-white border-[4px] border-black w-[400px] flex items-center">
        <input
          className="h-full p-2 border-none outline-none border-black  text-xl font-semibold w-full "
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div className="p-2 bg-black text-white cursor-pointer shrink-effect">
            <MagnifyingGlass size={40} weight="bold" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJob;
