import React from 'react';
import Typography from '@material-ui/core/Typography';
import { dehydrate } from 'react-query/hydration'
import { QueryClient } from 'react-query';
import { fetchReviews, useReviews } from '../hooks/reviews';

export default function Reviews() {
  const { data, isLoading } = useReviews();
  
  if (isLoading) return (
    <Typography variant="h4" component="h1" gutterBottom>
        Attends un moment !
    </Typography>
  );

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
          J'aime beaucoup la nourriture
      </Typography>
      <Typography variant="h4" component="h1" gutterBottom>
        {data ? data[0].name : '🤷'}
      </Typography>
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['review'], async () => fetchReviews());
  
  return {
    props: {
      reviews: dehydrate(queryClient),
    },
  };
}

