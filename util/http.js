import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchEvents({ signal, searchTerm }) {
  let url = "http://localhost:3000/events";

  if (searchTerm) {
    url += "?search=" + searchTerm;
  }

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error ocurred while fetching data");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(eventData) {
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    const error = new Error("An error ocurred while creating new event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch("http://localhost:3000/events/images", {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

export async function fetchSingleEvent(id) {
  const response = await fetch(`http://localhost:3000/events/${id}`);

  if (!response.ok) {
    const error = new Error("An error occurred while fetchin event..");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function deleteEvent(id) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An Error occurred while deleting event.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function updateEvent({ id, event }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event }),
  });

  if (!response.ok) {
    const error = new Error("An error ocurred while updating event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
