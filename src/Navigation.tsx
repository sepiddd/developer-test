import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';

export default function Navigation() {
  return (
    <Box>
      <Link href="/" color="secondary" gutterBottom>
        Main
      </Link>
      {' '}
      <Link href="/about" color="secondary" gutterBottom>
        About
      </Link>
      {' '}
      <Link href="/reviews" color="secondary" gutterBottom>
        Reviews
      </Link>
    </Box>
  );
}
