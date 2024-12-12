import TicketContainer from "@/containers/TicketContainer";
import React from "react";

const AdminDashboard: React.FC = () => {
  return <div>

    <h1>
      hello admin
    </h1>
    <TicketContainer type={"allPurchasedTickets"} />
  </div>;
};

export default AdminDashboard;
