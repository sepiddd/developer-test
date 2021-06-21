import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { QueryClient, useMutation } from "react-query";
import { fetchReviews, useReviews } from "../../../hooks/reviews";
import { useRouter } from "next/router";
import { dehydrate } from "react-query/hydration";
import { Review } from "../../../src/utils/database";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  title: { marginBottom: 50 },
  formWrap: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: 40,
  },
  loadingBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
});

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const { data: rawData, isLoading, remove } = useReviews(id as string);
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const data = rawData as Review;

  const mutation = useMutation(
    (newData) => axios.put(`/api/review/${id}`, newData),
    {
      onSuccess: () => {
        remove();
        router.push("/reviews");
      },
      onError: () => {},
    }
  );
  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

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
          <div className={classes.root}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              className={classes.title}
            >
              Create new Review
            </Typography>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={classes.formWrap}
            >
              <Controller
                name="name"
                control={control}
                defaultValue={data?.name}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={classes.input}
                    label="Name"
                    required
                  />
                )}
              />
              <Controller
                name="text"
                control={control}
                defaultValue={data?.text}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    className={classes.input}
                    label="Comment"
                    required
                  />
                )}
              />
              <Controller
                name="stars"
                control={control}
                defaultValue={data?.stars}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={classes.input}
                    label="Stars"
                    type="number"
                    inputProps={{
                      max: 5,
                      min: 1,
                    }}
                    required
                  />
                )}
              />
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </Grid>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(req: any) {
  const { id } = req.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["review", id], async () => fetchReviews(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
