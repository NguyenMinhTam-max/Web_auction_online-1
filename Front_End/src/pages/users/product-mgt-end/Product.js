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
import { Visibility, ThumbUp, ThumbDownAlt, Cancel} from '@material-ui/icons';
import { getAuctionProductEndList } from '../../../reducers/users/product';
import TableError from '../../../components/Table/TableError';
import TableLoading from '../../../components/Table/TableLoading';
import Header from '../../../components/Layout/Header';
import Footer from '../../../components/Layout/Footer';
import CommentModel from './Comment';
import { addComments } from '../../../reducers/users/product';
import NotifyModel from './Notify';
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
  const [productInfo, setProductInfo] = useState({});
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [showFailed, setShowFailed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [textss, setTextss] = useState('');
  let { loading, productList, numPage } = productInfo;
  const [openModalComment, setOpenModalComment] = useState(false);
  const [statusRating, setStatusRating] = useState(0);
  const [productId, setProductId] = useState(0);
  const textComment = 'Người thắng không thanh toán';
  const [textNotify, setTextNotify] = useState('');
  const [openModalNotify, setOpenModalNotify] = useState(false);

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };


  const getAuctionProductListHandler = useCallback(
    async (page = 1) => {
      try {
        const limit = 10;
        const response = await dispatch(getAuctionProductEndList({page, limit})).unwrap();
        setProductInfo(response);
      } catch (err) {
        setError(err);
      }
    },
    [dispatch]
  );

  const handleCloseBid = () => {
    setOpenModalComment(false);
  };
  const handleCloseNotify = () => {
    setOpenModalNotify(false);
};

  const openModalHandlerBid = async (prod_id, statusRating) => {
		  setProductId(prod_id);
		  setStatusRating(statusRating);

      if(statusRating === 2){
          try{
            var result = await dispatch(addComments({ textComment, status:statusRating, prodId:prod_id })).unwrap();
            setTextNotify('Hủy giao dịch thành công');
            setOpenModalNotify(true);
        }catch(error){
          setTextNotify(error);
          setOpenModalNotify(true);
        }
      }
      else{
        setOpenModalComment(true);
      }
    };

  useEffect(() => {
    dispatch(uiActions.hideModal());
    getAuctionProductListHandler(page)
  }, [dispatch, getAuctionProductListHandler, page]);

  useEffect(() => {
    document.title = 'Quản Lý Sản Phẩm';
  });

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
            <CommentModel
              isOpen={openModalComment}
              onClose={handleCloseBid}
              prod_id={productId}
              statusS={statusRating}
            />
            <NotifyModel
                isOpen={openModalNotify}
                onClose={handleCloseNotify}
                text={textNotify}
            />
            <Alert variant="danger" show={showFailed} onClose={() => setShowFailed(false)} dismissible>
              <Alert.Heading style={{ textAlign: "center" }}>Thất bại</Alert.Heading>
            </Alert>
            <Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
              <Alert.Heading style={{ textAlign: "center" }}>Thành công </Alert.Heading>
            </Alert>

              <div className={classes.section}>
                <Typography variant="h5" className={classes.title}>
                Quản Lý Sản Phẩm Có Người Thắng
                </Typography>
                <div className={classes.filter}>
                  <div className={classes.search}>
                    <SearchInput />
                  </div>

                  <div className={classes.addButton}>
                    {/* <Button
                      startIcon={<Add />}
                      variant="contained"
                      color="primary"
                      className={classes.addButton}
                      onClick={openAddModalHandler}>
                      Mới
                    </Button> */}
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
                            <TableCell>Người thắng đấu giá</TableCell>
                            <TableCell>Giá cao nhất</TableCell>
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
                          <TableCell>{row.prodNameHolder}</TableCell>  
                          <TableCell>
                            <NumberFormat 
                                value={row?.prodPriceHighest} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={' VND'}/>
                            </TableCell>
                          <TableCell align="center" style={{ minWidth: 150 }}>
                            <Button
                              variant="outlined"
                              startIcon={<ThumbDownAlt
                                fontSize="small"
                                style={{ cursor: 'pointer', marginLeft: "10px" }}
                              />}
                              style={{ marginLeft: 5 }}
                              fontSize="small"
                              onClick={()=>{openModalHandlerBid(row.prodId, 1)}}
                            >
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<ThumbUp
                                fontSize="small"
                                style={{ cursor: 'pointer', marginLeft: "10px" }}
                              />}
                              style={{ marginLeft: 5 }}
                              fontSize="small"
                              onClick={()=>{openModalHandlerBid(row.prodId, 0)}}
                            >
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<Visibility
                                fontSize="small"
                                style={{ cursor: 'pointer', marginLeft: "10px" }}
                              />}
                              style={{ marginLeft: 5 }}
                              fontSize="small"
                            >
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<Cancel
                                fontSize="small"
                                style={{ cursor: 'pointer', marginLeft: "10px" }}
                              />}
                              style={{ marginLeft: 5 }}
                              fontSize="small"
                              onClick={()=>{openModalHandlerBid(row.prodId, 2)}}
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
