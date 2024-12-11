// Passenger information interface
export interface IPassenger {
    firstName: string;
    lastName: string;
  }
  
  // Contact information interface
  export interface IContactInfo {
    email: string;
    phone: string;
  }
  
  export interface IPurchaseData {
    ticketId: number; // Correct naming to camelCase
    passengers: IPassenger[];
    contactInfo: IContactInfo; // Consistent camelCase naming
    paymentMethod: string; // CamelCase
    totalPrice: number; // CamelCase
  }

  
  
  // Ticket details interface
  export interface ITicketDetails {
    id: number;
    departureTime: string;
    arrivalTime: string;
    departureLocation: string;
    arrivalLocation: string;
    price: number;
    transportMode: string;
    terminalInfo?: string | null;
    features: string[];
  }
  