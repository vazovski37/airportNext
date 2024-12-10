export interface ITicket {
    id: string | number;
    departure_time: string;
    arrival_time: string;
    ride_time: number;
    departure_location: string;
    terminal_info?: string | null;
    arrival_location: string;
    price: number;
    transport_mode: string;
    features: string[];
  }
  