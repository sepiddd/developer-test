import { Box, Container, Grid, Typography } from "@material-ui/core";
import React from "react";

export default function Create() {
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
          <Typography variant="h4" component="h1" gutterBottom>
            Create new Review
          </Typography>
        </Grid>
      </Box>
    </Container>
  );
}
