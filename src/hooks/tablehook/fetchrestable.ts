import apiClient from "@/lib/axios";

export async function fetchRestaurantTables() {
  try {
    const response = await apiClient.get("/table/fetch-restaurant-tables");
    if (!response) {
      throw new Error("Failed to fetch tables");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching table");
  }
}
