import React, { useEffect, useState } from 'react';

interface ExperienceDescriptionProps {
  description: string;
  address: string;
}


const ExperienceDescription: React.FC<ExperienceDescriptionProps> = ({description, address}: ExperienceDescriptionProps) => {


 

  return (
    <div className="flex flex-col w-full md:w-2/3">
      <hr className="my-4 border-gray-300" />
      <h2 className="text-xl font-semibold mb-4">체험 설명</h2>
      <p className="mb-4">
        {description || '체험 설명을 불러오지 못했습니다.'}
      </p>
      <hr className="my-4 border-gray-300" />
      <div className="mb-8">
        <img
          src="map.jpg" // API에서 지도 이미지 URL을 받을 경우, 여기에 activity.mapUrl 같은 속성을 사용
          alt="Map"
          className="w-full h-auto"
        />
        <p className="text-sm text-gray-600 mt-2">
          {address || '위치 정보를 불러오지 못했습니다.'}
        </p>
      </div>
      <hr className="my-4 border-gray-300" />
    </div>
  );
};

export default ExperienceDescription;
