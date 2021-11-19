import { makeStyles, TextField, Typography, FormControl, Modal, Button } from '@material-ui/core';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, updateCategory } from '../../../reducers/admin/category';

import { Alert } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '30rem',
    maxWidth: '90%',
    margin: '20vh auto 0',
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(5),
  },
  form: {
    marginTop: '9px',
    marginBottom: theme.spacing(2),
  },
  label: {
    marginTop: theme.spacing(1),
  },
  search: {
    marginTop: theme.spacing(1),
  },
  importImg: {
    color: '#fff',
    position: 'absolute',
    right: '0px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#2d51a6',
    width: '113px',
    height: '27px',
    '& svg': {
      color: theme.palette.common.white,
    },
  },
  save: {
    color: '#fff',
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#2d51a6',
  },
  autoComplete: {
    marginTop: theme.spacing(2),
  },
  modalTitle: {
    marginBottom: theme.spacing(2),
  },
}));

const CategoryModal = ({ CatItem, action, reloadTable, isOpenModal, closeModalHandler }) => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const [catName, setCatName] = useState(CatItem?.cate_name)
  const [showFailed, setShowFailed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [text, setText] = useState('');

  const catNameChangeHandler = (e) => {
    //get value when the input changed, and set into cat name
    setCatName(e.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (catName.trim().length === 0) {
      setText('Tên chuyên mục không được rỗng!');
      setShowFailed(true);
      return;
    }

    if (action === 'UPDATE') {
      try {
        await dispatch(updateCategory({ catName, catID: CatItem?.cate_id })).unwrap();

        setText('Cập nhật thành công!');
        setShowSuccess(true);
        setShowFailed(false);
        reloadTable();
      } catch (error) {
        setShowFailed(true);
        setShowSuccess(false);
        setText(error);
      }
    } else if (action === "INSERT") {
      try {
        await dispatch(addCategory({ catName })).unwrap();
        setShowSuccess(true);
        setShowFailed(false);
        setText('Thêm thành công!');
        reloadTable();
      } catch (error) {
        setShowFailed(true);
        setShowSuccess(false);
        setText(error);
      }
    }
  };

  const handleVisible = useCallback(() => {
    if (showSuccess === true) {
      setTimeout(() => {
        setShowSuccess(false)
        setShowFailed(false)
      }, 4000);
    }
  }, [showSuccess, showFailed]);

  useEffect(() => {
    handleVisible();
    if(action === "UPDATE"){
      setCatName(CatItem?.cate_name);
    }else{
      setCatName('');
    }
  }, [handleVisible, CatItem?.cate_name, action]);

  return (
    <Modal
      open={isOpenModal}
      onClose={closeModalHandler}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div className={classes.paper}>
        <Typography
          variant="h5"
          style={{ textAlign: 'center', color: '#2d51a6' }}
          className={classes.modalTitle}>
          {action == "INSERT" ? 'Thêm chuyên mục mới' : 'Cập nhật chuyên mục'}
        </Typography>
        <Alert variant="danger" show={showFailed} onClose={() => setShowFailed(false)} dismissible>
          <Alert.Heading>{text}</Alert.Heading>
        </Alert>
        <Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
          <Alert.Heading>{text}</Alert.Heading>
        </Alert>
        <form noValidate autoComplete="off">
          <FormControl className={classes.form} fullWidth size="small">
            <TextField
              label="Tên chuyên mục"
              variant="outlined"
              value={catName}
              onChange={catNameChangeHandler}
              size="small"
            />
          </FormControl>
          <Button
            className={classes.save}
            fullWidth
            onClick={formSubmitHandler}
          >
            Lưu
          </Button>
        </form>
      </div>
    </Modal>
  );
};
export default CategoryModal;
