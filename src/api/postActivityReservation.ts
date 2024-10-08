import axiosInstance from "@/lib/axiosinstance";
import { AxiosError } from "axios";

interface PostActivityReservation {
  scheduleId: number;
  headCount: number;
}

const postActivityReservation = async ({
  selectedTimeId,
  attendeeCount,
  id,
}: {
  selectedTimeId: number;
  attendeeCount: number;
  id: string;
}): Promise<PostActivityReservation> => {
  const requestBody = {
    scheduleId: selectedTimeId,
    headCount: attendeeCount,
  };

  try {
    const response = await axiosInstance.post(
      `/activities/${id}/reservations`,
      requestBody,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw error;
    }
  }
};

export default postActivityReservation;
