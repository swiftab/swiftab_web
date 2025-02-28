interface ReservationInfo {
    reservationID: string;
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    bookingDate: string;
    bookingFor: string;
    endTime: string;
    guest: number;
    tableNumber: string;
    diningArea: string;
    _id: string;
}

interface ReservationParams {
    _id: string;
    reservationInfo: ReservationInfo;
    status: string;
}