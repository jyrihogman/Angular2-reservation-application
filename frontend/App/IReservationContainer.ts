export interface IReservationContainer {
    date: string;
    reservations: IReservation[];
}

export interface IReservation {
    id: string 
    time: string;
    email: string;
    phone: string;
    reserved: boolean;
    firstname: string;
    lastname: string;
}