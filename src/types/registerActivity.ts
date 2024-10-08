export interface Schedule {
    date: string; // 예약 날짜
    startTime: string; // 시작 시간
    endTime: string; // 종료 시간
  }
  
  export interface RegisterData {
    title: string;
    category: string;
    description: string;
    price: number;
    address: string;
    schedules: Schedule[];
    bannerImageUrl: string;
    subImageUrls?: string[];
  }