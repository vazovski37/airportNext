"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PurchaseForm from "@/components/Forms/PurchaseForm/PurchaseForm";
import { fetchTicketDetails } from "@/services/ticketService";
import { ITicket } from "@/interfaces/ticket";

const PurchasePage: React.FC = () => {
  const { id } = useParams(); // Get the ticket ID from the URL
  const [ticketDetails, setTicketDetails] = useState<ITicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchTicketDetails(Number(id)); // Use the service to fetch ticket details
        setTicketDetails(response);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch ticket details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetails();
  }, [id]);

  if (loading) return <div>Loading ticket details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {ticketDetails ? (
        <PurchaseForm ticketDetails={ticketDetails} />
      ) : (
        <div>No ticket details found.</div>
      )}
    </div>
  );
};

export default PurchasePage;
