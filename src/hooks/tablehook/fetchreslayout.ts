import apiClient from "@/lib/axios";

export async function fetchRestaurantInfo() {
  try {
    const response = await apiClient.get("/table/fetch-restaurant-info");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching data");
  }
}
