import React from 'react';
import { CATEGORIES, Category } from '@/types/category';
import useMergeRegisterData from '@/hooks/useMergeRegisterData';

interface CategoryProps {
  onSelect: (value: Category) => void;
}

const CategoryDropDown = ({ onSelect }: CategoryProps) => {
  const { mergeCategory } = useMergeRegisterData();

  const handleSelectedCategory = (item: Category) => () => {
    mergeCategory(item);
    onSelect(item);
  };

  return (
    <ul className="absolute z-10 flex flex-col w-[100%] p-2 items-start gap-[2px] shrink-0 rounded-md bg-white shadow-md">
      {CATEGORIES.map((item) => (
        <button
          key={item}
          onClick={handleSelectedCategory(item)}
          type="button"
          className="flex items-center w-[100%] h-10 pl-[36px] pt-2 pb-[6px] gap-2 rounded-md hover:bg-[#112211] hover:text-white"
        >
          <li className="flex text-4">{item}</li>
        </button>
      ))}
    </ul>
  );
};

export default CategoryDropDown;