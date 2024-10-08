import { useEffect, useRef } from 'react';
import useLoadMoreActivities from '@/hooks/useLoadMoreActivities';
import { useInView } from 'react-intersection-observer';
import { ActivityDropDownProps } from '@/types/bookingStatus';
import ActivityDropDownItem from './ActivityDropDownItem';

const ActivityDropDown = ({
  setViewActivityDropDown,
  setSelectedActivity,
  viewActivityDropDown,
}: ActivityDropDownProps) => {
  const { myActivityData, fetchNextPage } = useLoadMoreActivities();
  const activities = myActivityData?.pages.flatMap((page) => page.activities) || [];

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (viewActivityDropDown && !dropdownRef.current?.contains(e.target)) {
        setViewActivityDropDown(false);
      }
    };
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, [viewActivityDropDown, setViewActivityDropDown]);

  const handleCloseDropDown = () => {
    setViewActivityDropDown(false);
  };

  return (
    <div
      className="border border-black bg-white top-[30px] z-10 h-[300px] overflow-y-auto custom-scrollbar"
      ref={dropdownRef}
    >
      <ul className="flex flex-col" onClick={handleCloseDropDown}>
        {activities.map((activity) => (
          <ActivityDropDownItem
            activity={activity}
            key={activity.id}
            activityTitle={activity.title}
            setSelectedActivity={setSelectedActivity}
          />
        ))}
        <div ref={ref} className="w-[10px] h-[10px]" />
      </ul>
    </div>
  );
};
export default ActivityDropDown;
