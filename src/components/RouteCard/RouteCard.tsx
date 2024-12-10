import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus, faWifi, faBolt } from "@fortawesome/free-solid-svg-icons";
import SBadge from "@/design-components/SBadge/SBadge";
import SButton from "@/design-components/SButton/SButton";

export interface RouteCardProps {
  id: string | number;
  departureTime: string;
  arrivalTime: string;
  travelDuration: string;
  departureLocation: string;
  terminalInfo?: string | null;
  arrivalLocation: string;
  price: string;
  transportMode: string;
  features: string[];
}

const RouteCard: React.FC<RouteCardProps> = ({
  id,
  departureTime,
  arrivalTime,
  travelDuration,
  departureLocation,
  terminalInfo,
  arrivalLocation,
  price,
  transportMode,
  features,
}) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/purchase/${id}`);
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md border border-gray-300 lg:flex lg:items-center lg:justify-between">
      <div className="w-full lg:w-[65%]">
        <div className="flex items-center justify-between text-black">
          <span className="text-lg font-bold">{departureTime}</span>
          <div className="flex-1 mx-4 h-[1px] bg-gray-300"></div>
          <span className="text-sm text-gray-500">{travelDuration}</span>
          <div className="flex-1 mx-4 h-[1px] bg-gray-300"></div>
          <span className="text-lg font-bold">{arrivalTime}</span>
        </div>

        <div className="mt-2 flex justify-between text-gray-600">
          <div className="text-center">
            <p className="text-sm font-semibold">{departureLocation}</p>
            {terminalInfo && <p className="text-xs">({terminalInfo})</p>}
          </div>
          <div className="flex-1 mx-4 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full border border-gray-400"></div>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">{arrivalLocation}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 lg:mt-0 lg:w-[30%] flex flex-col items-end gap-4">
        <div className="text-lg font-bold text-gray-900">{price}</div>

        <div className="flex items-center gap-3">
          <SBadge size="sm" color="violet" className="flex items-center">
            <FontAwesomeIcon icon={faBus} className="text-gray-600 mr-2" />
            {transportMode}
          </SBadge>
          {features.includes("WiFi") && (
            <FontAwesomeIcon icon={faWifi} className="text-gray-500 text-lg" />
          )}
          {features.includes("Power") && (
            <FontAwesomeIcon icon={faBolt} className="text-gray-500 text-lg" />
          )}
        </div>

        <SButton
          type="primary"
          size="sm"
          className="px-6 py-2 rounded bg-violet-600 text-white font-medium"
          onClick={handleNavigate}
        >
          შეძენა
        </SButton>
      </div>
    </div>
  );
};

export default RouteCard;
