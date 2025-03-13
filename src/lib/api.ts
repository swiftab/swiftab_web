import { AuthData, AuthResponse, Authwaiter, AuthWaiterResponse, ErrorResponse } from "@/types/auth";
import apiClient from "./axios";
import { RestaurantResponse } from "@/types/restaurant";
import {  MenuResponse } from "@/types/addmenu";
import { DeleteResponse } from "@/types/deletemenu";
import { EditResponse, MenuItem } from "@/types/editmenu";
import { LayoutResponse, SaveLayoutData } from "@/types/layoutinfo";
import { TableItem, TableResponse } from "@/types/table";

export const loginAdmin = async (data: AuthData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      "/auth/admin/SignIn",
      data,
      {withCredentials: true}
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

export const signUpAdmin = async (data: AuthData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      "/auth/admin/SignUp",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Sign-up error details:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "An error occurred during sign up.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
};

export const signUpWaiter = async (data: Authwaiter): Promise<AuthWaiterResponse> => {
  try {
    const response = await apiClient.post<AuthWaiterResponse>(
      "/auth/waiter/waiter-app-signup",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Sign-up error details:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "An error occurred during sign up.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
};

/**
 * Function to add a restaurant using an API call
 * @param {RestaurantData} data - The restaurant data to be sent in the request
 * @returns {Promise<RestaurantResponse>} The server response for the added restaurant
 * @throws {Error} If an error occurs during the API call
 */

export const AddRestaurant = async (
  formData: FormData
): Promise<RestaurantResponse> => {
  try {
    const response = await apiClient.post<RestaurantResponse>(
      `/restaurant/addrestaurant`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Add restaurant error details:", error.response);
      const errorMessage =
        error.response.data?.message ||
        "An error occurred while adding the restaurant.";
      throw new Error(errorMessage);
    } else {
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from the server.");
    }
  }
};

export const addMenu = async (
  data: FormData,
  menuType: string
): Promise<MenuResponse> => {
  try {
    const response = await apiClient.post<ErrorResponse>(
      `restaurant/addmenu/${menuType}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set correct header for file uploads
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Add menu error details:", error.response);
      const errorMessage =
        error.response.data?.message ||
        "An error occurred while adding the menu.";
      throw new Error(errorMessage);
    } else {
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from the server.");
    }
  }
};

export const deleteMenu = async (
  menuType: string,
  itemId: string
): Promise<DeleteResponse> => {
  try {
    const response = await apiClient.delete<DeleteResponse>(
      `/restaurant/deletemenu/${menuType}/${itemId}`
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Remove menu error details:", error.response);

      const errorMessage =
        error.response.data?.message ||
        "An error occurred while removing the menu.";

      throw {
        message: errorMessage,
        statusCode: error.response.status,
        details: error.response.data,
      } as ErrorResponse;
    } else {
      console.error("Network error or no response:", error);
      throw {
        message: "Network error or no response from the server.",
      } as ErrorResponse;
    }
  }
};

export const editMenuItem = async (
  updatedItem: MenuItem,
  menuType: string
): Promise<EditResponse> => {
  try {
    const response = await apiClient.put<EditResponse>(
      `/restaurant/updatemenu/${menuType}/${updatedItem.id}`,
      updatedItem
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error.response.data?.message || "Error updating the menu item.";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error or no response from the server.");
    }
  }
};

export const saveLayoutInfo = async (
  data: SaveLayoutData
): Promise<LayoutResponse> => {
  try {
    const response = await apiClient.post<LayoutResponse>(
      "/table/save-layout-info",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Error saving layout info:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "Error saving layout info.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
};

export const saveTableLayout = async (
  data: TableItem[]
): Promise<TableResponse> => {
  try {
    const response = await apiClient.post<TableResponse>("/table/save-tables", {
      tables: data,
    });
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Error saving table layout:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "Error saving table layout.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
};


export async function fetchAdminInfo() {
  try {
    const response = await apiClient.get("/auth/admin/fetchinfo")
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Error fetching admin info:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "Error fetching admin info.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
}
}
