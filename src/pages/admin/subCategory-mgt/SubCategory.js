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
  InputBase,
  withStyles,
  Typography,
  NativeSelect,
  Modal,
  Box,
  Fade,
  Backdrop,
  Button,
} from '@material-ui/core';
import { Alert } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../reducers/ui';
import SearchInput from '../../../components/UI/SearchInput';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Add } from '@material-ui/icons';
import { getListCategory, deleteCategory } from '../../../reducers/admin/category'
import { getListSubCategory } from '../../../reducers/admin/subCategory'
import ModalSubCategory from './ModalSubCategory'
import TableError from '../../../components/Table/TableError';
import Pagination from '@material-ui/lab/Pagination';
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete';
import Footer from '../../../components/Layout/Footer';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 14,
    color: '#FFF',
    height: 17,
    padding: '10px 26px 7px 12px',
    fontFamily: ['Arial'].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    [theme.breakpoints.down('sm')]: {},
    [theme.breakpoints.down('xs')]: {},
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    // minHeight: '100vh',
    // maxHeight: '-webkit-fill-available',
  },
  content: {
    padding: '10vh 0',
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
    backgroundColor: '#2d51a6',
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const [error, setError] = useState('');

  const totalPage = useSelector((state) => state.admSubcategory.totalPage);
  const [limit, setLimit] = useState(10);
  const [subCat, setSubCat] = useState([]);//list sub cat
  const [page, setPage] = useState(1);
  const [selectedParentCat, setSelectedParentCat] = useState('');//ID of parent category selected by select box
  const [search, setSearch] = useState('');
  const [parentCategory, setFatherCategory] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [subCatInfo, setSubCatInfo] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openAddOrUpdateModal, setOpenAddOrUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [text, setText] = useState('');
  const [action, setAction] = useState('INSERT');



  const searchChangeHandler = (value) => {
    setSearch(value);
  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
    getListChildCategoryHandler(selectedParentCat, value, limit);
  };




  const getListChildCategoryHandler = useCallback(
    async (catParent, page, limit) => {
      setPageLoading(true);
      if (!catParent || catParent.length <= 0) {
        setPageLoading(false);
        return;
      }

      try {
        const response = await dispatch(

          getListSubCategory({ catParent, page, limit })
        ).unwrap();
        setSubCat(response.subCategoryList);

        setPageLoading(false);
      } catch (error) {
        setError(error);
        setPageLoading(false);
      }
    },
    [dispatch]
  );

  const parentCategoryChangeHandler = async (value) => {
    setSubCat([]);
    setPage(1);

    setSelectedParentCat(value);
    if (value) {
      getListChildCategoryHandler(value, 1, limit);
    }
  };

  const getListFatherCategoryHandler = useCallback(async () => {
    try {
      const response = await dispatch(getListCategory({ page: 1, limit: 9999 })).unwrap();
      setFatherCategory(response.CategoryList);
      if (response.CategoryList.length > 0) {
        parentCategoryChangeHandler(response.CategoryList[0].cate_id);
      } else {
        setPageLoading(false);
      }
    } catch (err) {
      setError(err);
      setPageLoading(false);
    }
  }, [dispatch]);

  const reloadData = () => {
    setPage(1);
    getListChildCategoryHandler(selectedParentCat, 1, limit);
  };


  useEffect(() => {
    dispatch(uiActions.hideModal());
    getListFatherCategoryHandler();
  }, [dispatch, getListFatherCategoryHandler]);

  useEffect(() => {
    document.title = "Quản lý chuyên mục con"
  });


  const deleteSubcategoryHandler = async () => {
    if (!selectedId) return;
    try {
      //delete selected sub cat
      await dispatch(deleteCategory({ catID: selectedId })).unwrap();
      //load data again
      getListChildCategoryHandler(selectedParentCat, page, limit);
      reloadData()
      setText('Xoá thành công!!!');
      setShowSuccess(true);
    } catch (err) {
      setText(err);
      setShowFailed(true);
    }

    closeModalHandler();
  };


  const openAddModalHandler = () => {
    setAction('INSERT');
    setOpenAddOrUpdateModal(true);
    setOpenDeleteModal(false);
  };

  const openUpdateModalHandler = (item) => {
    setAction('UPDATE');
    setSubCatInfo(item);
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

  const handleVisible = useCallback(() => {
    if (showSuccess === true) {
      setTimeout(() => {
        setShowSuccess(false)
        setShowFailed(false)
      }, 3000);
    }
  }, [showSuccess, showFailed]);

  useEffect(() => {
    handleVisible();
  }, [handleVisible]);
  return (
    <>
      <div className={classes.root}>
        {/* Add,update modal */}
        <ModalSubCategory
          catParentID={selectedParentCat}
          subCatInfo={subCatInfo}
          action={action}
          catParentList={parentCategory}
          reloadTable={reloadData}
          isOpenModal={openAddOrUpdateModal}
          closeModalHandler={closeModalHandler}
        />

        {/* delete modal */}
        <ModalConfirmDelete
          title="Xoá chuyên mục con"
          isOpen={openDeleteModal}
          onClose={closeModalHandler}
          onConfirm={deleteSubcategoryHandler}
        
        />


        <div className={classes.section}>
          <Typography variant="h5" className={classes.title}>
            Quản lý chuyên mục con
          </Typography>

          <div className={classes.filter}>
            <div className={classes.search}>

              <SearchInput
                placeholder="Nhập chuyên mục con cần tìm"
                initialValue={search}
                onChange={searchChangeHandler}
              />

            </div>
            <div className={classes.filterItem}>
              <Typography variant="subtitle2" className={classes.label}>
                Chuyên mục cha:
              </Typography>
              <NativeSelect
                value={selectedParentCat}
                className={classes.select}
                onChange={(e) => parentCategoryChangeHandler(e.target?.value)}
                name="price"
                input={<BootstrapInput />}>
                {parentCategory &&
                  parentCategory.length > 0 &&
                  parentCategory.map((row, index) => (
                    <option style={{ color: '#2d51a6' }} value={row.cate_id} key={index}>
                      {row.cate_name}
                    </option>
                  ))}
              </NativeSelect>
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
        <div>
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
                    <TableCell align="center" style={{ width: "30%" }}>Tên chuyên mục con</TableCell>
                    <TableCell align="center">Ngày tạo</TableCell>
                    <TableCell align="center">Last Modified</TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>

                {
                  subCat?.length > 0 ? (
                    <>
                      <TableBody>
                        {subCat?.map((row, index) => (
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
                    <TableError message="Không có dữ liệu" onTryAgain={getListChildCategoryHandler} />
                  )}
              </Table>
            </TableContainer>
            <div className={`${classes.pagination} ${classes.section}`}>
                <Pagination count={totalPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
              </div>
            <div style={{ marginTop: 100 }}><Footer /></div>
          </div>
        </div>

      </div>
    </>
  );
};

export default CategoryManager;
