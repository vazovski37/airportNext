import { useState, useMemo } from "react";

const usePurchaseForm = (ticketPrice: number) => {
  const [passengers, setPassengers] = useState([
    { firstName: "", lastName: "" },
  ]);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });
  const [selectedCard, setSelectedCard] = useState("");

  const totalPrice = useMemo(() => passengers.length * ticketPrice, [
    passengers.length,
  ]);

  const addPassenger = () => {
    if (passengers.length < 3) {
      setPassengers([...passengers, { firstName: "", lastName: "" }]);
    }
  };

  const deletePassenger = (index: number) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  const handlePassengerChange = (index: number, field: string, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleContactChange = (field: string, value: string) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Passengers:", passengers);
    console.log("Contact Info:", contactInfo);
    console.log("Selected Card:", selectedCard);
    console.log("Total Price:", totalPrice);
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
  };
};

export default usePurchaseForm;
