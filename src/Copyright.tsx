import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

export default function Copyright() {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Avatar alt="Charles Duchemin" src="https://yt3.ggpht.com/ytc/AAUvwnjwiP7m-SlOsptBkO9rANVa8cK6FxUs7dspd6Z3rg=s88-c-k-c0x00ffffff-no-rj" />
      </Grid>
      <Grid item>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <MuiLink color="inherit" href="https://facebook.com/charles.duchemin.39/">
            Charles Duchemin
          </MuiLink>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Grid>
    </Grid>
  );
}
