import { Box, Button, Typography, TableCell, TableRow } from '@material-ui/core';

const TableError = ({ message, onTryAgain }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row" colSpan={14}>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          padding="50px"
          style={{ background: '#fff' }}>
          <Typography variant="body1" style={{ marginBottom: 10 }}>
            {message}
          </Typography>
          <Button color="primary" variant="outlined" onClick={onTryAgain}>
            Refresh
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};
export default TableError;
