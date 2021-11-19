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
  Button,
} from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../reducers/ui';
import SearchInput from '../../../components/UI/SearchInput';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';
import { Add } from '@material-ui/icons';
import { getUserList, deleteUser, acceptSel, rejectSel } from '../../../reducers/admin/user';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import TableError from '../../../components/Table/TableError';
import TableLoading from '../../../components/Table/TableLoading';
import ModalConfirmDelete from '../../../components/Modal/ModalConfirmDelete';
import ModalConfirm from '../../../components/Modal/ModalConfirm';
import Pagination from '@material-ui/lab/Pagination';
import { Role } from '../../../config/role';
import Footer from '../../../components/Layout/Footer';

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
const UserManager = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [userInfo, setUserInfo] = useState({});
  let { loading, userList, numPage } = userInfo;

  const filter = props.additional.filter;
  console.log(filter)
  const [showFailed, setShowFailed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [text, setText] = useState('');

  const openAddModalHandler = () => {
    setOpenAddModal(true);
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
    setOpenAcceptModal(false);
    setOpenRejectModal(false);
  };

  const openUpdateModalHandler = (item) => {
    setSelectedItem(item);
    setOpenAddModal(false);
    setOpenUpdateModal(true);
    setOpenDeleteModal(false);
    setOpenAcceptModal(false);
    setOpenRejectModal(false);
  };

  const openDeleteModalHandler = (id) => {
    setSelectedId(id);
    setOpenAddModal(false);
    setOpenUpdateModal(false);
    setOpenDeleteModal(true);
    setOpenAcceptModal(false);
    setOpenRejectModal(false);
  };

  const openAcceptSelModalHandler = (id) => {
    setSelectedId(id);
    setOpenAddModal(false);
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
    setOpenAcceptModal(true);
    setOpenRejectModal(false);
  };

  const openRejectSelModalHandler = (id) => {
    setSelectedId(id);
    setOpenAddModal(false);
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
    setOpenAcceptModal(false);
    setOpenRejectModal(true);
  };

  const closeModalHandler = () => {
    setOpenAddModal(false);
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
    setOpenAcceptModal(false);
    setOpenRejectModal(false);
  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  const deleteUserHandler = async () => {
    if (!selectedId) return;
    try {
      await dispatch(deleteUser(selectedId)).unwrap();
      const limit = 10;
      const role  = filter;
      const response = await dispatch(getUserList({page, limit, role})).unwrap();
      setUserInfo(response);
      userList = userList.filter(
        (user) => user.userId !== selectedId
      );
      setText('Xoá thành công!!!');
      setShowSuccess(true);
    } catch (err) {
      setText(err);
      setShowFailed(true);
    }
    closeModalHandler();
  };

  const acceptSelModalHandler = async () =>{
    if (!selectedId) return;
    try {
      await dispatch(acceptSel(selectedId)).unwrap();
      const limit = 10;
      const role  = filter;
      const response = await dispatch(getUserList({page, limit, role})).unwrap();
      setUserInfo(response);
      setText('Cập nhật thành công!!!');
      setShowSuccess(true);
    } catch (err) {
      setText(err);
      setShowFailed(true);
    }
    closeModalHandler();
  }

  const rejectSelModalHandler = async () =>{
    if (!selectedId) return;
    try {
      await dispatch(rejectSel(selectedId)).unwrap();
      const limit = 10;
      const role  = filter;
      const response = await dispatch(getUserList({page, limit, role})).unwrap();
      setUserInfo(response);
      setText('Cập nhật thành công!!!');
      setShowSuccess(true);
    } catch (err) {
      setText(err);
      setShowFailed(true);
    }
    closeModalHandler();
  }

  const getUserListHandler = useCallback(
    async (page = 1) => {
      try {
        const limit = 10;
        const role  = filter;
        const response = await dispatch(getUserList({page, limit, role})).unwrap();
        setUserInfo(response);
      } catch (err) {
        setError(err);
      }
    },
    [dispatch, filter]
  );

  useEffect(() => {
    dispatch(uiActions.hideModal());
    getUserListHandler(page)
  }, [dispatch, getUserListHandler, page]);

  useEffect(() => {
    document.title = 'Quản Lý Người Dùng';
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
        }, 5000);
    }
  }, [showFailed, showSuccess]);

  useEffect(() => {
      handleVisible();
  }, [handleVisible]);
  console.log(filter === Role.Seller)
  return (
    <>
      <div className={classes.root}>
        <Container>
            <AddProduct isOpen={openAddModal} onClose={closeModalHandler} />
            <UpdateProduct
              itemInfo={selectedItem}
              isOpen={openUpdateModal}
              onClose={closeModalHandler}
            />
            <ModalConfirmDelete
              title="Xoá người dùng"
              isOpen={openDeleteModal}
              onClose={closeModalHandler}
              onConfirm={deleteUserHandler}
            />
            <ModalConfirm
              title="Đồng ý yêu cầu nâng cấp Seller?"
              isOpen={openAcceptModal}
              onClose={closeModalHandler}
              onConfirm={acceptSelModalHandler}
            />
            <ModalConfirm
              title="Huỷ yêu cầu nâng cấp/ hạ cấp Seller?"
              isOpen={openRejectModal}
              onClose={closeModalHandler}
              onConfirm={rejectSelModalHandler}
            />
        </Container>
      </div>

      <div className={classes.section}>
        <Typography variant="h5" className={classes.title}>
        Quản Lý Người Dùng ({filter === Role.Admin?'Admin':filter === Role.Seller?'Seller':'Bidder'})
        </Typography>
        <div className={classes.filter}>
          <div className={classes.search}>
            <SearchInput />
          </div>
        {/* {filter === Role.Admin && (
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
        )} */}
        </div>
      </div>
      
      <div className={classes.bodytable}>
        <Alert variant="danger" show={showFailed} onClose={() => setShowFailed(false)} dismissible>
                <Alert.Heading style={{textAlign: "center"}}>{text}</Alert.Heading>
            </Alert>
            <Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
                <Alert.Heading style={{textAlign: "center"}}>{text}</Alert.Heading>
        </Alert>
        <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow className={classes.tableHead}>
                    <TableCell align="center">STT</TableCell>
                    {/* <TableCell align="center">ID</TableCell> */}
                    <TableCell align="center">Họ & Tên</TableCell>
                    {/* <TableCell align="center">Ảnh đại diện</TableCell> */}
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Điện thoại</TableCell>
                    {filter === Role.Bidder && (
                      <>
                        <TableCell align="center">Số lượt thích</TableCell>
                        <TableCell align="center">Số lượt Không thích</TableCell>
                        <TableCell align="center">Nâng cấp Seller</TableCell>
                      </>
                    )}
                    {filter === Role.Seller && (
                      <>
                        <TableCell align="center">Hết hạn Seller</TableCell>
                        <TableCell align="center">Số lượt thích</TableCell>
                        <TableCell align="center">Số lượt Không thích</TableCell>
                        <TableCell align="center">Hạ cấp Seller</TableCell>
                      </>
                    )}
                    <TableCell align="center">Last Modified</TableCell>
                    <TableCell align="center">Options</TableCell>
                  </TableRow>
                </TableHead>
        {loading ? ( <TableLoading /> ): error?.length > 0 ?
          (
          <TableError message={error} onTryAgain={getUserListHandler} />
        ) : userList?.length > 0 ? (
          <>
                <TableBody>
                  {userList?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="center"> {index + 1 + (page - 1)*10} </TableCell>
                      {/* <TableCell align="center">{row?.accId}</TableCell> */}
                      <TableCell align="center">{row?.accFullName}</TableCell>
                      {/* <TableCell align="center">
                        <img
                          onError={(e)=>{e.target.onerror = null; e.target.src=errImg}}
                          src={row?.accAvatar}
                          alt={row?.accFullName}
                          style={{ width: 100, height: 80, objectFit: 'cover' }}
                        />
                      </TableCell> */}
                      <TableCell align="center">{row.accEmail}</TableCell>
                      <TableCell align="center">{row.accPhoneNumber}</TableCell>
                      {filter === Role.Bidder && (
                      <>
                        <TableCell align="center">{row?.accLikeBidder || 0}</TableCell>
                        <TableCell align="center">{row?.accDisLikeBidder || 0}</TableCell>
                        <TableCell align="center">
                          { row?.accIsUpgrade === 1 && (
                            <>
                              <Button 
                                variant="outlined"
                                startIcon={<CheckBoxIcon style={{ align:"center", marginLeft: 10 }}/>}  
                                onClick={() => openAcceptSelModalHandler(row.accId)}
                                fontSize="small"
                                style={{ width: '40px', marginLeft: 5, cursor: 'pointer', color: 'green', borderColor: 'green', "& :hover": {backgroundColor: "red"} }}
                                // marginBottom={1}
                                >
                                {/* Xác nhận */}
                              </Button>
                              {/* <br></br> */}
                              <Button 
                                variant="outlined" 
                                startIcon={<CancelIcon style={{ align:"center", marginLeft: 10 }} />}
                                onClick={() => openRejectSelModalHandler(row.accId)}
                                fontSize="small"
                                style={{width: '40px', marginLeft: 5, cursor: 'pointer', color: 'red', borderColor: 'red', hoverColor: 'blue' }}
                                // marginTop={1}
                                >
                                {/* Huỷ */}
                              </Button>
                            </>
                          ) }
                        </TableCell>
                      </>
                    )}
                    {filter === Role.Seller && (
                      <>
                        <TableCell align="center">{row?.accExpUpgrade || 'None'}</TableCell>
                        <TableCell align="center">{row?.accLikeSeller || 0}</TableCell>
                        <TableCell align="center">{row?.accDisLikeSeller || 0}</TableCell>
                        <TableCell align="center">
                              <Button 
                                variant="outlined" 
                                startIcon={<CancelIcon style={{ align:"center", marginLeft: 10 }} />}
                                onClick={() => openRejectSelModalHandler(row.accId)}
                                fontSize="small"
                                style={{width: '40px', marginLeft: 5, cursor: 'pointer', color: 'red', borderColor: 'red', hoverColor: 'blue' }}
                                >
                              </Button>
                        </TableCell>
                      </>
                    )}
                      <TableCell align="center">{row?.accUpdatedDate}</TableCell>
                      <TableCell align="center" style={{ minWidth: 150 }}>
                        {/* <Button 
                          variant="outlined" 
                          startIcon={<EditIcon
                            fontSize="small"
                            style={{ cursor: 'pointer', marginLeft: "10px" }}
                          />}
                          style={{ width: '40px', marginLeft: 5 }}
                          fontSize="small"
                          onClick={() => openUpdateModalHandler(row)}
                          >
                        </Button> */}
                        <Button 
                          variant="outlined" 
                          startIcon={<DeleteIcon
                            fontSize="small"
                            style={{ cursor: 'pointer', marginLeft: "10px" }}
                          />}
                          style={{ width: '40px', marginLeft: 5 }}
                          fontSize="small"
                          onClick={() => openDeleteModalHandler(row.accId)}
                          >
                        </Button>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
          </>
          ) : (
            <TableError message="Không có dữ liệu" onTryAgain={getUserListHandler} />
          )}
          </Table>
        </TableContainer>
          <div className={`${classes.pagination} ${classes.section}`}>
            <Pagination count={numPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
          </div>
        <div style={{ marginTop: 100 }}><Footer /></div>
      </div>
    </>
  );
};

export default UserManager;