import { useRouter } from "next/navigation";
import { useState } from "react";
import { purchaseTicket } from "@/services/purchaseService";
import { IContactInfo, IPassenger, IPurchaseData } from "@/interfaces/purchase";
import { useFetchUser } from "@/hooks/useFetchUser";

const usePurchaseForm = (ticketId: number, price: number) => {
  
  const [passengers, setPassengers] = useState<IPassenger[]>([
    { firstName: "", lastName: "" },
  ]);
  const [contactInfo, setContactInfo] = useState<IContactInfo>({
    email: "",
    phone: "",
  });
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, loading: userLoading, error: userError } = useFetchUser();

  const totalPrice = passengers.length * price;

  const addPassenger = () => {
    if (passengers.length < 3) {
      setPassengers([...passengers, { firstName: "", lastName: "" }]);
    } else {
      alert("You can only purchase tickets for up to 3 passengers.");
    }
  };

  const deletePassenger = (index: number) => {
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const handlePassengerChange = (
    index: number,
    field: keyof IPassenger,
    value: string
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleContactChange = (field: keyof IContactInfo, value: string) => {
    setContactInfo({ ...contactInfo, [field]: value });
  };

  const router = useRouter();

  const handleSubmit = async () => {
    if (userLoading) {
      alert("User data is still loading. Please wait.");
      return;
    }

    if (userError || !user?.id) {
      alert("Failed to retrieve user information. Please try again.");
      return;
    }

    if (!selectedCard) {
      alert("Please select a payment method.");
      return;
    }

    const payload: IPurchaseData = {
      ticketId: ticketId,
      passengers: passengers,
      contactInfo: contactInfo, 
      paymentMethod: selectedCard as string,
      totalPrice: totalPrice, 
    };
    

    try {
      setLoading(true);
      setError(null);
      await purchaseTicket(payload);
      router.push("/profile");
    } catch (error: any) {
      console.error("Purchase failed:", error);
      setError(error.response?.data?.message || "Failed to complete the purchase.");
      alert(error.response?.data?.message || "An error occurred while processing your purchase.");
    } finally {
      setLoading(false);
    }
  };

  return {
    passengers,
    contactInfo,
    selectedCard,
    totalPrice,
    addPassenger,
    deletePassenger,
    handlePassengerChange,
    handleContactChange,
    setSelectedCard,
    handleSubmit,
    loading,
    error,
    userLoading,
    userError,
  };
};

export default usePurchaseForm;
