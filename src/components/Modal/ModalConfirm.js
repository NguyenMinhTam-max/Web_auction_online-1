import { Box, Button } from '@material-ui/core';
import { makeStyles, Modal, Typography } from '@material-ui/core';
import { Close, Delete, CheckBox } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    width: '30rem',
    margin: '20vh auto 0',
    background: 'white',
    padding: theme.spacing(2),
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ModalConfirm = ({ title, isOpen, onClose, onConfirm }) => {
  const classes = useStyles();
  return (
    <Modal
      className={classes.root}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <Box className={classes.content} borderRadius={6}>
        <Box marginBottom={2}>
          <Typography variant="h6" component="p" style={{ textAlign: 'center', marginBottom: 16 }}>
            {title}
          </Typography>
          {/* <Typography variant="body2" component="p" style={{ textAlign: 'center' }}>
            Bạn có muốn xoá?
          </Typography> */}
        </Box>
        <Box display="flex" className={classes.actions}>
          <Button
            onClick={onConfirm}
            startIcon={<CheckBox  />} //style={{ color: '#4FA139' }}
            variant="outlined"
            color="primary"
            style={{
              marginRight: 16,
              // border: '1px solid #4FA139',
              // color: '#4FA139',
              fontWeight: 'bold',
            }}>
            Xác nhận
          </Button>
          <Button
            onClick={onClose}
            startIcon={<Close style={{ color: '#fff' }} />}
            variant="contained"
            color="primary"
            style={{ fontWeight: 'bold' }}>
            Huỷ
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalConfirm;
