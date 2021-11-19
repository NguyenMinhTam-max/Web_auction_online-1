import { Box, CircularProgress, TableCell, TableRow } from '@material-ui/core';

const TableLoading = (props) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row" colSpan={14}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="50px"
          style={{ background: '#fff' }}>
          <CircularProgress size={20} />
        </Box>
      </TableCell>
    </TableRow>
  );
};
export default TableLoading;
