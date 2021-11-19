import { useLayoutEffect } from 'react';
import {
  makeStyles,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button
} from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../reducers/ui';
import SearchInput from '../../../components/UI/SearchInput';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Add } from '@material-ui/icons';
import { getListCategory, deleteCategory } from '../../../reducers/admin/category'
import TableError from '../../../components/Table/TableError';
import TableLoading from '../../../components/Table/TableLoading';
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete';
import Pagination from '@material-ui/lab/Pagination';
import { Role } from '../../../config/role';
import CategoryModal from './CategoryModal';
import Footer from '../../../components/Layout/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    // minHeight: '100vh',
    // maxHeight: '-webkit-fill-available',
  },
 
  section: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    margin: theme.spacing(2),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
  },

  bodytable: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    minHeight: '40vh',
    maxHeight: '40vh',
    // maxHeight: '-webkit-fill-available',
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  topContent: {
    borderRadius: theme.shape.borderRadius,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    margin: 0,
    padding: theme.spacing(1),
  },
  filter: {
    marginTop: theme.spacing(2),
    marginBottom: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
      width: '100%',
      justifyContent: 'space-between',
      '&:not(:last-child)': {
        marginRight: 0,
      },
    },
  },
  label: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 70,
    },
  },
  select: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
    marginLeft: theme.spacing(1),
    '& svg': {
      color: theme.palette.common.white,
    },
  },
  addButton: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  search: {
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    width: '20%',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: theme.spacing(1),
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  pagination: {
    '& > *': {
      justifyContent: 'center',
      display: 'flex',
    },
  },
  tableHead: {
    fontWeight: 'bold',
    color: 'red',
  },
}));
const CategoryManager = (props) => {//the first character of function always in upper case
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [categoryInfo, setCategoryInfo] = useState({});
  let { loading, CategoryList, totalPage } = categoryInfo;
  const [openAddOrUpdateModal, setOpenAddOrUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [text, setText] = useState('');
  const [action, setAction] = useState('INSERT');
  const [catItem, setCatItem] = useState({});

  const reloadData = () => {
    setPage(1);
    getCategoriesListHandler(1, 10);
  };

  const openAddModalHandler = () => {
    setAction('INSERT');
    setOpenAddOrUpdateModal(true);
    setOpenDeleteModal(false);
  };

  const openUpdateModalHandler = (item) => {
    setAction('UPDATE');
    setCatItem(item);
    setOpenAddOrUpdateModal(true);
    setOpenDeleteModal(false);
  };


  const openDeleteModalHandler = (id) => {
    setSelectedId(id);
    setOpenAddOrUpdateModal(false);
    setOpenDeleteModal(true);

  };


  const closeModalHandler = () => {
    setOpenAddOrUpdateModal(false);
    setOpenDeleteModal(false);

  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };


 
  const deleteCategoryHandler = async () => {
    if (!selectedId) return;
    try {
      //delete selected cat
      await dispatch(deleteCategory({ catID: selectedId })).unwrap();
      //load data again
      reloadData()
      setText('Xoá chuyên mục thành công!!!');
      setShowSuccess(true);
    } catch (err) {
      setText(err);
      setShowFailed(true);
    }

    closeModalHandler();
  };

  const getCategoriesListHandler = useCallback(
    async (page = 1) => {
      try {
        const limit = 10;
        const response = await dispatch(getListCategory({ page, limit })).unwrap();
        setCategoryInfo(response);
      } catch (err) {
        setError(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(uiActions.hideModal());
    getCategoriesListHandler(page);
  }, [dispatch, getCategoriesListHandler, page]);//when page change, get the new list

  useEffect(() => {
    document.title = 'Quản Lý Chuyên Mục';
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const errImg = window.location.origin + '/img/no-image-available.jpg';

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVisible = useCallback(() => {
    if (showFailed === true || showSuccess === true) {
      setTimeout(() => {
        setShowFailed(false)
        setShowSuccess(false)
      }, 4000);
    }
  }, [showFailed, showSuccess]);

  useEffect(() => {
    handleVisible();
  }, [handleVisible]);
  return (
    <>
      <div className={classes.root}>
        <Container>
          {/* Add,update modal */}
          <CategoryModal
            CatItem={catItem}
            action={action}
            reloadTable={reloadData}
            isOpenModal={openAddOrUpdateModal}
            closeModalHandler={closeModalHandler}
          />

          {/* delete modal */}
          <ModalConfirmDelete
            title="Xoá chuyên mục"
            isOpen={openDeleteModal}
            onClose={closeModalHandler}
            onConfirm={deleteCategoryHandler}
          />

        </Container>
      </div>

      <div className={classes.section}>
        <Typography variant="h5" className={classes.title}>
          Quản Lý Chuyên Mục
        </Typography>
        <div className={classes.filter}>
          <div className={classes.search}>
            <SearchInput />
          </div>

          <div className={classes.addButton}>
            <Button
              startIcon={<Add />}
              variant="contained"
              color="primary"
              className={classes.addButton}
              onClick={openAddModalHandler}>
              Mới
            </Button>
          </div>

        </div>
      </div>

      <div className={classes.bodytable}>
        <Alert variant="danger" show={showFailed} onClose={() => setShowFailed(false)} dismissible>
          <Alert.Heading style={{ textAlign: "center" }}>{text}</Alert.Heading>
        </Alert>
        <Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
          <Alert.Heading style={{ textAlign: "center" }}>{text}</Alert.Heading>
        </Alert>
        <TableContainer component={Paper}>
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow className={classes.tableHead}>
                <TableCell align="center">#</TableCell>
                <TableCell align="center" style={{ width: "30%" }}>Tên chuyên mục</TableCell>
                <TableCell align="center">Ngày tạo</TableCell>
                <TableCell align="center">Last Modified</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (<TableLoading />) : error?.length > 0 ?
              (
                <TableError message={error} onTryAgain={getCategoriesListHandler} />
              ) : CategoryList?.length > 0 ? (
                <>
                  <TableBody>
                    {CategoryList?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" align="center"> {index + 1 + (page - 1) * 10} </TableCell>
                        <TableCell align="center" style={{ width: "60%" }}>{row.cate_name}</TableCell>
                        <TableCell align="center">{row.cate_created_date}</TableCell>
                        <TableCell align="center">{row.cate_updated_date == null ? "Không có thông tin!" : row.cate_updated_date}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            startIcon={<EditIcon
                              fontSize="small"
                              style={{ cursor: 'pointer', marginLeft: "10px" }}
                            />}
                            style={{ width: '40px', marginLeft: 5 }}
                            fontSize="small"
                            onClick={() => openUpdateModalHandler(row)}
                          >
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon
                              fontSize="small"
                              style={{ cursor: 'pointer', marginLeft: "10px" }}
                            />}
                            style={{ width: '40px', marginLeft: 5 }}
                            fontSize="small"
                            onClick={() => openDeleteModalHandler(row.cate_id)}
                          >
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </>
              ) : (
                <TableError message="Không có dữ liệu" onTryAgain={getCategoriesListHandler} />
              )}
          </Table>
        </TableContainer>
        <div className={`${classes.pagination} ${classes.section}`}>
            <Pagination count={totalPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
        </div>
        <div style={{ marginTop: 100 }}><Footer /></div>
      </div>
    </>
  );
};

export default CategoryManager;
