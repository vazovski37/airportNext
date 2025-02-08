export interface RegistrationData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
  
export interface RegisterResponse {
message: string;
user: {
    first_name: string;
    last_name: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: number;
};
token: string;
}

export interface IAuthState {
  api_token: string | null;
  role: "admin" | "agent" | "passenger" | "driver" | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: IUser;
  token: string;
}

export interface Timetable {
    id: number;
    route_id: number;
    vehicle_id: number;
    departure_time: string;
    arrival_time: string;
  }
  
  export interface Ticket {
    id: number;
    timetable_id: number;
    seats_left: number;
    created_at: string;
    updated_at: string;
    timetable: Timetable | null;
  }
  
export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  email_verified: number;
  created_at: string;
  updated_at: string;
  role: "admin" | "agent" | "passenger" | "driver";
}
