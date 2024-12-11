import React from "react";
import { ITicket } from "@/interfaces/ticket"; // Ensure this interface is properly defined
import usePurchaseForm from "@/hooks/usePurchaseForm"; // Custom hook for purchase form logic
import SButton from "@/design-components/SButton/SButton";
import SInput from "@/design-components/SInput/SInput";
import { faUser, faMinus, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PurchaseFormProps {
  ticketDetails: ITicket;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ ticketDetails }) => {
  const {
    id,
    departure_time,
    arrival_time,
    seats_left,
    price,
    departure_location,
    destination_location,
  } = ticketDetails;

  const {
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
  } = usePurchaseForm(id, parseFloat(price));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-6">
        <div className="flex-1 flex flex-col gap-6">
          <div className="border border-brand-500 rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold mb-4 text-black">Route Details</h3>
            <p className="text-black">
              <strong>From:</strong> {departure_location}
            </p>
            <p className="text-black">
              <strong>To:</strong> {destination_location}
            </p>
            <p className="text-black">
              <strong>Departure Time:</strong> {new Date(departure_time).toLocaleString()}
            </p>
            <p className="text-black">
              <strong>Arrival Time:</strong> {new Date(arrival_time).toLocaleString()}
            </p>
            <p className="text-black">
              <strong>Price:</strong> ₾{parseFloat(price).toFixed(2)}
            </p>
            <p className="text-black">
              <strong>Seats Left:</strong> {seats_left}
            </p>
          </div>

          {passengers.map((passenger, index) => (
            <div
              key={index}
              className="border border-brand-500 rounded-lg p-4 bg-white relative"
            >
              <h3 className="text-lg font-semibold mb-4 text-black">
                Passenger {index + 1}
              </h3>
              <div className="flex gap-4">
                <SInput
                  placeholder="First Name"
                  value={passenger.firstName}
                  onChange={(e) =>
                    handlePassengerChange(index, "firstName", e.target.value)
                  }
                  rightAdditionalContent={
                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                  }
                  className="flex-1"
                />
                <SInput
                  placeholder="Last Name"
                  value={passenger.lastName}
                  onChange={(e) =>
                    handlePassengerChange(index, "lastName", e.target.value)
                  }
                  rightAdditionalContent={
                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                  }
                  className="flex-1"
                />
              </div>

              {passengers.length > 1 && (
                <button
                  onClick={() => deletePassenger(index)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              )}
            </div>
          ))}

          {passengers.length < 3 && (
            <SButton
              type="secondaryGray"
              size="md"
              className="w-full bg-gray-100 border border-gray-300 text-black font-semibold"
              onClick={addPassenger}
            >
              Add Passenger
            </SButton>
          )}

          <div className="border border-brand-500 rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold mb-4 text-black">Contact Information</h3>
            <SInput
              placeholder="Email"
              value={contactInfo.email}
              onChange={(e) => handleContactChange("email", e.target.value)}
              rightAdditionalContent={
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
              }
              className="mb-4"
            />
            <SInput
              placeholder="Phone Number"
              value={contactInfo.phone}
              onChange={(e) => handleContactChange("phone", e.target.value)}
              rightAdditionalContent={
                <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
              }
            />
          </div>

          <div className="border border-brand-500 rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold mb-4 text-black">Payment Method</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-black">
                <input
                  type="radio"
                  name="card"
                  value="Visa"
                  onChange={(e) => setSelectedCard(e.target.value)}
                  checked={selectedCard === "Visa"}
                />
                Visa
              </label>
              <label className="flex items-center gap-2 text-black">
                <input
                  type="radio"
                  name="card"
                  value="MasterCard"
                  onChange={(e) => setSelectedCard(e.target.value)}
                  checked={selectedCard === "MasterCard"}
                />
                MasterCard
              </label>
              <label className="flex items-center gap-2 text-black">
                <input
                  type="radio"
                  name="card"
                  value="ApplePay"
                  onChange={(e) => setSelectedCard(e.target.value)}
                  checked={selectedCard === "ApplePay"}
                />
                Apple Pay
              </label>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[350px] border border-gray-300 rounded-lg bg-white p-4">
          <h3 className="text-lg font-semibold mb-4 text-black">Summary</h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-black items-center">
              <span>Number of Passengers</span>
              <span>{passengers.length}</span>
            </div>
            <div className="flex justify-between text-black items-center">
              <span>Ticket Price</span>
              <span>₾{parseFloat(price).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-black font-semibold">
              <span>Total Price</span>
              <span>₾{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <SButton
        type="primary"
        size="lg"
        className="w-full max-w-md bg-brand-600 text-white font-semibold mt-6"
        onClick={handleSubmit}
      >
        Purchase
      </SButton>
    </div>
  );
};

export default PurchaseForm;
