export interface IRoute {
    id: number;
    departure_id: number;
    destination_id: number;
    price: number;
    ride_time: number;
    departure?: {
        id: number;
        location_name: string;
    };
    destination?: {
        id: number;
        location_name: string;
    };
    created_at?: string;
    updated_at?: string;
}
