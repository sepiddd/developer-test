import React from "react";
import Typography from "@material-ui/core/Typography";
import { dehydrate } from "react-query/hydration";
import { QueryClient } from "react-query";
import { fetchReviews, useReviews } from "../../hooks/reviews";
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
import Link from "next/link";
import { Review } from "../../src/utils/database";

const useStyles = makeStyles({
  loadingBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { marginBottom: 50 },
  table: {
    minWidth: 500,
  },
});

export default function Reviews() {
  const { data, isLoading } = useReviews();
  const classes = useStyles();

  if (isLoading)
    return (
      <div className={classes.loadingBox}>
        <Typography variant="h4" component="h1" gutterBottom>
          Attends un moment !
        </Typography>
      </div>
    );

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <div className={classes.header}>
            <Typography
              className={classes.title}
              variant="h4"
              component="h1"
              gutterBottom
            >
              J'aime beaucoup la nourriture
            </Typography>
            <Link href="/reviews/create" passHref>
              <Button variant="contained" color="primary">
                Add Review
              </Button>
            </Link>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Comment</TableCell>
                  <TableCell align="left">Stars</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data as Review[])?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6" component="h6" gutterBottom>
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{row.text}</TableCell>
                    <TableCell align="left">{row.stars}</TableCell>
                    <TableCell
                      align="right"
                      // className={classes.actionsWrap}
                    >
                      <Button variant="outlined" color="primary">
                        Edit
                      </Button>
                      {/* <Button variant="text" color="secondary">
                        Delete
                      </Button> */}
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

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["review"], async () => fetchReviews());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
