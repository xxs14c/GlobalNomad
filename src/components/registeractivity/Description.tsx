import React from "react";
import useMergeRegisterData from "@/hooks/useMergeRegisterData";

const Description = () => {
  const { mergeDescription } = useMergeRegisterData();

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    mergeDescription(e.target.value);
  };

  return (
    <div className="flex mt-[1.5rem]">
      <textarea className="w-[49.5rem] h-[21.625rem] pt-[1rem] pb-[19rem] pl-[1rem] border-[1px] border-gray_79 rounded whitespace-pre-wrap" placeholder="설명" onChange={handleChangeDescription} />
    </div>
  );
};

export default Description;
