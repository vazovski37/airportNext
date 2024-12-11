export interface IAvailableTicket {
  id: number;
  timetable_id: number;
  seats_left: number;
  created_at: string;
  updated_at: string;
  timetable: ITimetable;
}

export interface ITicket {
  id: number;
  seats_left: number;
  departure_time: string;
  arrival_time: string;
  travel_duration: number;
  price: string;
  departure_location: string;
  destination_location: string;
}
export interface ITimetable {
  id: number;
  route_id: number;
  vehicle_id: number;
  departure_time: string;
  arrival_time: string;
  created_at: string;
  updated_at: string;
  route: IRoute;
}

export interface IRoute {
  id: number;
  departure_id: number;
  destination_id: number;
  price: string;
  ride_time: number;
  created_at: string;
  updated_at: string;
}


