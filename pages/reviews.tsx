import React from "react";
import Typography from "@material-ui/core/Typography";
import { dehydrate } from "react-query/hydration";
import { QueryClient } from "react-query";
import { fetchReviews, useReviews } from "../hooks/reviews";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function Reviews() {
  const { data, isLoading } = useReviews();
  const classes = useStyles();

  if (isLoading)
    return (
      <Typography variant="h4" component="h1" gutterBottom>
        Attends un moment !
      </Typography>
    );

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            J'aime beaucoup la nourriture
          </Typography>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6" component="h6" gutterBottom>
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{row.text}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" color="primary">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>
    </Container>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["review"], async () => fetchReviews());

  return {
    props: {
      reviews: dehydrate(queryClient),
    },
  };
}
