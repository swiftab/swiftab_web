import apiClient from "@/lib/axios";

export async function fetchMenu() {
  const response = await apiClient.get('/restaurant/menu');
  return response.data.menu;
}

