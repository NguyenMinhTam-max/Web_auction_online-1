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
  Button,
  Checkbox
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Pagination from '@material-ui/lab/Pagination';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { uiActions } from '../../../reducers/ui';
import SearchInput from '../../../components/UI/SearchInput';
import { Add, Forum, Edit, Delete } from '@material-ui/icons';
import { deleteAuctionProduct, getAuctionProductList } from '../../../reducers/users/product';
import CommentProduct from './CommentProduct';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import TableError from '../../../components/Table/TableError';
import TableLoading from '../../../components/Table/TableLoading';
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete';
import { toast } from 'react-toastify';
import Header from '../../../components/Layout/Header';
import Footer from '../../../components/Layout/Footer';
const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    minHeight: '100vh',
    maxHeight: '-webkit-fill-available',
  },
  content: {
    padding: '5vh 0',
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  section: {
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
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

const ProductManager = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [showFailed, setShowFailed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [textss, setTextss] = useState('');
  let { loading, productList, numPage } = productInfo;

  const openCommentModalHandler = () => {
    setOpenAddModal(false);
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
    setOpenCommentModal(true);
    setTextss('');
  };


  const openAddModalHandler = () => {
    setTextss('Thêm sản phẩm thành công');
    setOpenAddModal(true);
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
    setOpenCommentModal(false);
    console.log('day');
    console.log(textss);
  };

  const openUpdateModalHandler = (item) => {
    setSelectedItem(item);
    setOpenUpdateModal(true);
    setOpenAddModal(false);
    setOpenDeleteModal(false);
    setOpenCommentModal(false);
    setTextss('');
  };
  const openDeleteModalHandler = (id) => {
    setSelectedId(id);
    setOpenUpdateModal(false);
    setOpenAddModal(false);
    setOpenDeleteModal(true);
    setOpenCommentModal(false);
    setTextss('');
  };

  const closeModalHandler = () => {
    setOpenUpdateModal(false);
    setOpenAddModal(false);
    setOpenDeleteModal(false);
    setOpenCommentModal(false);
    setTextss('');
  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  const productDeleteHandler = async () => {
    if (!selectedId) return;
    try {
      await dispatch(deleteAuctionProduct(selectedId)).unwrap();
      // productList = productList.filter(
      //   (product) => product.prodId !== selectedId
      // );
      getAuctionProductListHandler(page);
    } catch (err) {
      toast.error(err);
    }
    closeModalHandler();
  };

  const getAuctionProductListHandler = useCallback(
    async (page = 1) => {
      try {
        const limit = 10;
        const response = await dispatch(getAuctionProductList({page, limit})).unwrap();
        setProductInfo(response);
      } catch (err) {
        setError(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(uiActions.hideModal());
    getAuctionProductListHandler(page)
  }, [dispatch, getAuctionProductListHandler, page]);

  useEffect(() => {
    document.title = 'Quản Lý Sản Phẩm';
  }, [t]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const errImg = window.location.origin + '/img/no-image-available.jpg';

  const handleVisible = useCallback(() => {
    if (showSuccess === true) {
        setTimeout(() => {
            setShowSuccess(false)
        }, 5000);
    }
}, [showSuccess]);

  useEffect(() => {
      handleVisible();
  }, [handleVisible]);

  return (
    <>
      <div className={classes.root}>
        <Header />
          <div className={classes.content}>
            <Container >
              
              <AddProduct 
                isOpen={openAddModal} 
                onClose={closeModalHandler}
                showSuccess={setShowSuccess}
                getList = {getAuctionProductListHandler}
                textAlert={setTextss}
              />
              <CommentProduct
                itemInfo={selectedItem}
                isOpen={openCommentModal}
                onClose={closeModalHandler}
                showSuccess={setShowSuccess}
                textAlert={setTextss}
              />
              <UpdateProduct
                itemInfo={selectedItem}
                isOpen={openUpdateModal}
                onClose={closeModalHandler}
                showSuccess={setShowSuccess}
                getList = {getAuctionProductListHandler}
                textAlert={setTextss}
              />
              <ModalConfirmDelete
                title="Xoá sản phẩm"
                isOpen={openDeleteModal}
                onClose={closeModalHandler}
                onConfirm={productDeleteHandler}
              />
            <Alert variant="danger" show={showFailed} onClose={() => setShowFailed(false)} dismissible>
              <Alert.Heading style={{ textAlign: "center" }}>Thất bại</Alert.Heading>
            </Alert>
            <Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
              <Alert.Heading style={{ textAlign: "center" }}>Thành công </Alert.Heading>
            </Alert>

              <div className={classes.section}>
                <Typography variant="h5" className={classes.title}>
                Quản Lý Sản Phẩm
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
              
              <div>
              
              <TableContainer component={Paper} className={classes.section}>
                      <Table aria-label="a dense table">
                        <TableHead>
                          <TableRow className={classes.tableHead}>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell>Hình ảnh</TableCell>
                            <TableCell>Danh mục</TableCell>
                            <TableCell>Giá khởi điểm</TableCell>
                            <TableCell>Bước giá</TableCell>
                            <TableCell>Hạn đấu giá</TableCell>
                            <TableCell>Tự động gia hạn</TableCell>
                            <TableCell>Ngày cập nhật cuối</TableCell>
                            <TableCell align="center">Options</TableCell>
                          </TableRow>
                        </TableHead>
                {loading ? ( <TableLoading /> ): error?.length > 0 ?
                 (
                  <TableError message={error} onTryAgain={getAuctionProductListHandler} />
                ) : productList?.length > 0 ? (
                  <>
                    <TableBody>
                      {productList.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {index + 1 + (page - 1) * 10}
                          </TableCell>
                          <TableCell>{row?.prodName}</TableCell>
                          <TableCell>
                            <img
                              src={row?.prodMainImage || errImg}
                              alt={row?.prodName}
                              style={{ width: 100, height: 80, objectFit: 'cover' }}
                            />
                          </TableCell>
                          <TableCell>{row?.prodCategoryName}</TableCell>
                          <TableCell>
                            <NumberFormat 
                              value={row?.prodPriceStarting} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={' VND'}/>
                              </TableCell>
                          <TableCell>
                            <NumberFormat 
                              value={row?.prodPriceStep} 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              suffix={' VND'}/>
                          </TableCell>
                          <TableCell>{moment(new Date(row?.prodEndDate)).format("DD/MM/YYYY HH:mm")}</TableCell>
                          <TableCell><Checkbox checked={row?.prodAutoExtend===1?true:false} color="primary"/></TableCell>
                          <TableCell>{moment(new Date(row?.prodUpdatedDate)).format("DD/MM/YYYY HH:mm")}</TableCell>
                          <TableCell align="center" style={{ minWidth: 150 }}>
                            <Button 
                              variant="outlined" 
                              startIcon={<Forum
                                fontSize="small"
                                style={{ cursor: 'pointer', marginLeft: "10px" }}
                              />}
                              style={{ marginLeft: 5 }}
                              fontSize="small"
                              onClick={() => openCommentModalHandler(row)}
                              >
                            </Button>
                            <Button 
                              variant="outlined" 
                              startIcon={<Edit
                                fontSize="small"
                                style={{ cursor: 'pointer', marginLeft: "10px" }}
                              />}
                              style={{ marginLeft: 5 }}
                              fontSize="small"
                              onClick={() => openUpdateModalHandler(row)}
                              >
                            </Button>
                            <Button 
                              variant="outlined" 
                              startIcon={<Delete
                                fontSize="small"
                                style={{ cursor: 'pointer', marginLeft: "10px" }}
                              />}
                              style={{ marginLeft: 5 }} 
                              fontSize="small"
                              onClick={() => openDeleteModalHandler(row.prodId)}
                              >
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </>
                ) : (
                  <TableError message="No data in database" onTryAgain={getAuctionProductListHandler} />
                )}
                  </Table>
                </TableContainer>
              </div>

            <div className={`${classes.pagination} ${classes.section}`}>
                <Pagination count={numPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
            </div>
            </Container>
          </div>
        </div>
        <Footer />
      </>
  );
};
export default ProductManager;
