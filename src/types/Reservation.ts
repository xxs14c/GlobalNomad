interface Activity {
  bannerImageUrl: string;
  title: string;
  id: number;
}

export interface Reservations {
  id: number;
  userId: number;
  activity: Activity;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}
