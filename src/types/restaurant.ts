export interface RestaurantData {
  title: string;
  data: {
    image: string;
    restaurantName: string;
    location: string;
    latitude: number;
    longitude: number;
    rate: number;
    about: {
      description: string;
      averagePrice: number;
      hrsOfOperation: string;
      phone: string;
      email: string;
    }[];
  }[];
}

export interface RestaurantResponse {
  message: string;
  restaurant: RestaurantData;
}

export interface ErrorResponse {
  message: string;
  //   statusCode?: number;
  //   details?: any;
}
