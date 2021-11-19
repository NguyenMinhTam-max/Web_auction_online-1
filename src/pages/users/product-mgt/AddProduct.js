import ProductModal from './ProductModal';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  makeStyles,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Edit, Add, Delete } from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import React, { useCallback, useEffect, useRef, useState, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategory } from '../../../reducers/category';
import { postAuctionProduct } from '../../../reducers/users/product';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import DescriptionProduct from './DescriptionModel';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: '10vh',
  },
  content: {
    background: '#fff',
    padding: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  mainImage: {
    height: '400px',
    borderRadius: theme.shape.borderRadius,
    background: '#f1f4fb',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 50px)',
    },
  },
  listUpload: {},
  iconAdd: {
    marginBottom: theme.spacing(1),
    background: '#f1f4fb',
  },
  textField: {
    marginBottom: theme.spacing(1),
    '& > p': {
      width: 300,
      fontWeight: 'bold',
    },
  },
  productInformation: {
    width: 'calc(100% - 350px)',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  image: {
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  menuPaper: {
    maxHeight: 300,
  },
  section: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  ovlContainer: {
    "&:hover": {
        "& $ovlOverlay": {
          opacity: 1,
        }
      },
    position: "relative",
    width: 60,
    height: 60,
    padding: 5,
  },
  
  ovlImage: {
    display: "block",
    width: "100%",
    height: "auto",
  },
  
  ovlOverlay: {
    position: "absolute",
    display: "block",
    top: 0,
    height: "100%",
    width: "100%",
    opacity: 0,
    transition: ".3s ease",
    "background-color": "rgba(0,0,0,0.3)",
    padding: '1',
  },

  ovlAdd: {
    opacity: 0.7,
    "background-color": "rgba(0,0,0,0.3)",
    "&:hover": {
      opacity: 1,
      transition: ".3s ease",
      "background-color": "rgba(0,0,0,0.3)",
    },
  },
  
  ovlIcon: {
    color: "white",
    "font-size": 40,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "-ms-transform": "translate(-50%, -50%)",
    "text-align": "center",
  },  
  ovlAddIcon: {
    color: "primary",
    "font-size": 40,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "-ms-transform": "translate(-50%, -50%)",
    "text-align": "center",
  }

}));

const AddProduct = ({ isOpen, onClose, showSuccess, textAlert, getList }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data);
  const [prodImages, setProdImages] = useState([]);
  const [mainImageSrc, setMainImageSrc] = useState(null);
  const [submitIsValid, setSubmitIsValid] = useState(true);
  const [error, setError] = useState('');
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [stateDescription, setStateDescription] = useState('');
  const prodNameRef = createRef('');
  const prodCategoryIdRef = useRef(0);
  const prodPriceStartingRef = useRef(0);
  const prodPriceStepRef = useRef(0);
  const prodPriceRef = useRef(0);
  const prodAutoExtendRef = useRef(0);
  const prodEndDateRef = useRef('');
  const [endDate, setEndDate] = useState("");

  const openDescriptionModalHandler = () => {
    setOpenDescriptionModal(true);
  };

  const closeDescriptionModalHandler = () => {
    setOpenDescriptionModal(false);
  };
  
  const fileChangeHandler = (file) => {
    if (file) {
      setProdImages((prevState) => [...prevState, file]);
    }
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImageSrc(reader.result);
    };
    reader.onerror = function (error) {
      setMainImageSrc(null);
    };
  };

  const removeFile = (item) => {
    setProdImages((prevState) => prevState.filter((image) => image !== item));
  };

  const getListCategoryHandler = useCallback(async () => {
    try {
      const page = 1;
      const limit = 10000;
      await dispatch(getListCategory({page, limit})).unwrap();
    } catch (err) {
      console.log('🚀 ~ file: Product.js ~ line 166 ~ getListCategoryHandler ~ err', err);
    }
  }, [dispatch]);

  const closeModalHandler = () => {
    setError('');
    onClose();
  };
  const addNewProductHandler = async () => {
    setError('');
    const enteredProdName = prodNameRef.current.value;
    const enteredProdCategoryId = prodCategoryIdRef.current.value;
    const enteredProdPriceStarting = prodPriceStartingRef.current.state.numAsString;
    const enteredProdPriceStep = prodPriceStepRef.current.state.numAsString;
    const enteredProdPrice = prodPriceRef.current.state.numAsString;
    const enteredProdAutoExtend = prodAutoExtendRef.current.value;
//    const enteredProdEndDate = prodEndDateRef.current.value;endDate
    const enteredProdEndDate = endDate;
    const enteredProdDescription = stateDescription;
    let formData = new FormData();
    if (
      enteredProdName?.length > 0 &&
      enteredProdCategoryId?.length > 0 &&
      enteredProdPriceStarting?.length > 0 &&
      enteredProdPriceStep?.length > 0 &&
      enteredProdDescription?.length > 0 &&
      endDate?.length > 0
    ) {
      setSubmitIsValid(true);
    } else {
      setSubmitIsValid(false);
      return;
    }

    for (let i = 0; i < prodImages.length; i++) {
      formData.append('prodImages', prodImages[i]);
    }

    if(prodImages.length < 3){
      setError('Vui lòng chọn tối thiểu 3 ảnh cho sản phẩm');
      return;
    }

    formData.append('prodName', enteredProdName);
    formData.append('prodCategoryId', enteredProdCategoryId);
    formData.append('prodPriceStarting', enteredProdPriceStarting);
    formData.append('prodPriceStep', enteredProdPriceStep);
    formData.append('prodPrice', enteredProdPrice);
    formData.append('prodDescription', enteredProdDescription);
    formData.append('prodEndDate', enteredProdEndDate);
    formData.append('prodAutoExtend', enteredProdAutoExtend);

    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    
    try {
      await dispatch(postAuctionProduct(formData)).unwrap();
      getList(1);
      //textAlert('Lưu thành công!!!');
      showSuccess(true);
    } catch (err) {
      setError(err);
      return;
    }
    onClose();
  };

  const handleOnChange = (e)=>{    
    setEndDate(e.target.value);
  }
  
  useEffect(() => {
    getListCategoryHandler();
  }, [dispatch, getListCategoryHandler]);

  useEffect(() => {
    if (prodImages.length > 0) {
      getBase64(prodImages[0]);
    } else {
      setMainImageSrc(null);
    }
  }, [prodImages]);

  return (
    <ProductModal isOpen={isOpen} onClose={closeModalHandler}>
      <div className={classes.root}>
        <DescriptionProduct 
          isOpen={openDescriptionModal} 
          onClose={closeDescriptionModalHandler}
          setStateDescription={setStateDescription}
        />
        <Box borderRadius={6} className={classes.content}>
          <Box marginBottom={4} marginTop={2}>
            <Typography variant="h5" className={classes.title}>
              Thêm Sản Phẩm mới
            </Typography>
          </Box>
          <form encType="multipart/form-data" className={classes.section}>
            <Box marginBottom={2} className={classes.image}>
              <div className={classes.mainImage}>
                <img
                  alt=""
                  src={mainImageSrc}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className={classes.listUpload}>
                <input
                  accept="image/jpeg, image/png"
                  id="img1"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => fileChangeHandler(e.target.files[0])}
                />
                <Box display="flex" flexWrap="wrap" alignItems="center">
                  {prodImages?.length > 0 &&
                    prodImages.map((item, index) => (
                      <Box display="flex" alignItems="center" key={index} marginRight={2} className={classes.ovlContainer}>
                        {/* <Typography variant="caption">{item.name}</Typography> */}
                        <img
                        alt=""
                        src={URL.createObjectURL(item)}
                        style={{
                          objectFit: 'cover',
                        }}
                        className={classes.ovlImage}
                        />
                        <div className={classes.ovlOverlay}>
                          <Delete  onClick={() => removeFile(item)} className={classes.ovlIcon} placeholder="Xoá"/>
                        </div>
                      </Box>
                    ))}
                    <Box display="inline" alignItems="center" className={classes.ovlContainer}>
                        <label htmlFor="img1" style={{ display: 'flex' }} className={classes.ovlAdd}>
                          {/* <IconButton color="primary"> */}
                              <Add className={classes.ovlAddIcon} color="primary"/>
                          {/* </IconButton> */}
                        </label>
                    </Box>
                </Box>
                {/* <IconButton color="primary" className={classes.iconAdd}>
                  <label htmlFor="img1" style={{ display: 'flex' }}>
                    <Add />
                  </label>
                </IconButton> */}
              </div>
            </Box>
            <Box className={classes.productInformation}>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                  Tên sản phẩm
                </Typography>
                <TextField 
                variant="standard" 
                size="small"
                fullWidth 
                defaultValue=""
                inputRef={prodNameRef} />
              </div>

              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                  Danh mục
                </Typography>
                <FormControl variant="standard" size="small" fullWidth>
                  <Select
                    native
                    defaultValue=""
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    inputRef={prodCategoryIdRef}>
                    {categories?.length === 0 &&(<option aria-label="None" value="" />)}
                    {categories?.length > 0 &&
                      categories.map((cate, index) => (
                        <optgroup label={cate.cateName} key={index}>
                          {cate.subCategories?.length > 0 &&
                            cate.subCategories[0].map((subCate, index) => (
                              <option value={subCate.cateId} key={index}>
                                {subCate.cateName}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                Giá bắt đầu (VND)
                </Typography>
                <NumberFormat
                  variant="standard"
                  thousandSeparator={true}
                  suffix={' VND'}
                  customInput={TextField}
                  ref={prodPriceStartingRef}
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                Bước giá (VND)
                </Typography>
                <NumberFormat
                  variant="standard"
                  thousandSeparator={true}
                  suffix={' VND'}
                  customInput={TextField}
                  ref={prodPriceStepRef}
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                Giá mua thẳng (VND)
                </Typography>
                <NumberFormat
                  variant="standard"
                  thousandSeparator={true}
                  suffix={' VND'}
                  customInput={TextField}
                  ref={prodPriceRef}
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                Ngày hết hạn
                </Typography>
                {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                    variant="standard"
                    ampm={false}
                    inputRef={prodEndDateRef}
                    disablePast
                    format="DD/MM/yyyy HH:mm"
                  />
                </MuiPickersUtilsProvider> */}
                <input type="datetime-local" value={endDate} onChange={e=>{handleOnChange(e)}}></input>
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                  Mô tả
                </Typography>
                <Button
                      startIcon={<Edit />}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={openDescriptionModalHandler}>
                      Chỉnh sửa mô tả
                </Button>
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                  Gia hạn đấu giá
                </Typography>
                <FormControl variant="standard" size="small" fullWidth>
                  <Select
                    native
                    defaultValue="0"
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    inputRef={prodAutoExtendRef}>
                    <option value="0">Không gia hạn</option>
                    <option value="1">Gia hạn</option>
                  </Select>
                </FormControl>
              </div>
              {!submitIsValid && (
                <FormHelperText error style={{ marginBottom: 8 }}>
                  Tất cả các ô không được bỏ trống
                </FormHelperText>
              )}
              {error.length > 0 && (
                <FormHelperText error style={{ marginBottom: 8 }}>
                  {error}
                </FormHelperText>
              )}

              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 16 }}
                  onClick={addNewProductHandler}>
                  Thêm
                </Button>
                <Button variant="contained" onClick={onClose}>
                  Huỷ
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </div>
    </ProductModal>
  );
};

export default AddProduct;
