export async function fetchTicketData(id: string | number) {
    const response = await fetch(`/api/tickets/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch ticket data");
    }
    return await response.json();
  }
  