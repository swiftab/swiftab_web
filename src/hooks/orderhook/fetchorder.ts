import apiClient from "@/lib/axios";

export async function fetchOrders() {
  try {
    const response = await apiClient.get("/orders/restaurant/fetch-all-orders");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching data");
  }
}
