import { useQuery } from 'react-query';
import { Review } from '../src/utils/database';

export async function fetchReviews(): Promise<Review[]> {
    const response = await fetch('http://localhost:3000/api/review');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

export function useReviews() {
  return useQuery(['review'], () => fetchReviews())
}