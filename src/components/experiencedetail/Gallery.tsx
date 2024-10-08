import React, { useEffect, useState } from 'react';

import { ActivityResponse, ImageResponse } from '@/api/models/activity';



interface GalleryProps {
  subImages: ImageResponse[]

}

const Gallery: React.FC<GalleryProps> = ({subImages}: GalleryProps) => {

  const [activity, setActivity] = useState<ActivityResponse | null>(null);



  return (
    <div className="flex justify-center">
      {subImages && subImages.length > 0 ? (
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-2 row-span-2">
            <img
              src={subImages[0]}
              alt="gallery-1"
              className="w-[595px] h-[534px] object-cover rounded"
            />
          </div>
          {subImages.slice(1).map((subImages, index) => (
            <div key={index} className="col-span-1 row-span-1">
              <img
                src={subImages}
                alt={`gallery-${index + 2}`}
                className="w-[293px] h-[263px] object-cover rounded"
              />
            </div>
          ))}
        </div>
      ) : (
        <p>{activity?.bannerImageUrl}
          No images available for this activity.</p>
      )}
    </div>
  );
};

export default Gallery;
