import React from "react";
import useMergeRegisterData from "@/hooks/useMergeRegisterData";

const Title = () => {
  const { mergeTitle } = useMergeRegisterData();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    mergeTitle(e.target.value);
  };

  return (
    <div className="flex mt-[1.5rem]">
      <input onChange={handleChangeTitle} className="w-[49.5rem] h-[3.5rem] py-[0.938rem] pl-[1rem] items-center border-[1px] border-gray_79 rounded" type="text" placeholder="제목" />
    </div>
  );
};

export default Title;
