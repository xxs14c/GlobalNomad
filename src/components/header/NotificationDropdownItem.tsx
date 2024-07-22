import getMyNotification from "@/api/getMyNotification";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Notifications {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface NotificationDataType {
  totalCount: number;
  notifications: Notifications[];
  cursorId: number;
}
const formatUpdatedAt = (updatedAt: string) => {
  const updatedDate = new Date(updatedAt);
  const currentDate = new Date();
  const diffInMs = currentDate.getTime() - updatedDate.getTime();
  const diffInMin = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMin / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears}년 전`;
  }
  if (diffInDays > 0) {
    return `${diffInDays}일 전`;
  }
  if (diffInHours > 0) {
    return `${diffInHours}시간 전`;
  }
  if (diffInMin > 0) {
    return `${diffInMin}분 전`;
  }
  return "방금 전";
};
const NotificationDropdownItem = ({
  content,
  updatedAt,
}: {
  content: string;
  updatedAt: string;
}) => {
  const { data } = useInfiniteQuery<NotificationDataType>({
    queryKey: ["notifications"],
    queryFn: getMyNotification,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });
  //   const notifications = data?.pages.flatMap((page) => page.notifications) || [];

  const reservationStatus = content.slice(
    content.length - 8,
    content.length - 6,
  );
  return (
    <div className="w-90 flex flex-col gap-1 rounded-md bg-white p-2">
      <div className="flex justify-between">
        <img
          src={`/image/circle_${reservationStatus === "승인" ? "blue" : "red"}.svg`}
          alt="Confirmed Chip"
        />
        <img
          className="w-5 cursor-pointer opacity-50"
          src="/image/x_btn.svg"
          alt="Remove Notification Button"
        />
      </div>
      <div>
        {content.split(reservationStatus)[0]}
        <div
          style={{
            color: reservationStatus === "승인" ? "#0085FF" : "#FF472E",
            display: "inline",
          }}
        >
          {reservationStatus}
        </div>
        {content.split(reservationStatus)[1]}
      </div>
      <div className="text-sm opacity-50">{formatUpdatedAt(updatedAt)}</div>
    </div>
  );
};

export default NotificationDropdownItem;
