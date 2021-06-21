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
import { useMutation } from "react-query";
import { useReviews } from "../../../hooks/reviews";
import { useRouter } from "next/router";

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
});

export default function Create() {
  const reviews = useReviews();
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const router = useRouter();

  const mutation = useMutation((data) => axios.post("/api/review/add", data), {
    onSuccess: () => {
      reviews.remove();
      router.push("/reviews");
    },
    onError: () => {},
  });
  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue={1}
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
