import apiClient from "@/lib/axios";

export async function fetchAllReservation() {
  try {
    const response = await apiClient.get("/reservation/fetch-all-reservations");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Error fetching data");
  }
}
