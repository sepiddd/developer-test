import { useQuery } from "react-query";
import { Review } from "../src/utils/database";

export async function fetchReviews(id?: string): Promise<Review[] | Review> {
  const response = await fetch(`/api/review${id ? `/${id}` : ""}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export function useReviews(id?: string) {
  return useQuery(["review", id], () => fetchReviews(id));
}
