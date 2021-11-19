import ProductModal from './UserModal';
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
import { Add, Close } from '@material-ui/icons';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getListCategory } from '../../../reducers/category';
// import { updateAuctionProduct } from '../../../reducers/users/product';
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
  miniImage: {
    position: 'relative',
    width: 60,
    height: 60,
  },
  iconDel: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 1,
    background: '#fff',
  },
}));

const UpdateProduct = ({ itemInfo, isOpen, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data);
  const [error, setError] = useState('');
  const [submitIsValid, setSubmitIsValid] = useState(true);

  const [currentProdName, setCurrentProdName] = useState('');
  const [currentProdCategoryId, setCurrentProdCategoryId] = useState(0);
  const [currentProdPriceStarting, setCurrentPriceStarting] = useState(0);
  const [currentProdPriceStep, setCurrentProdPriceStep] = useState(0);
  const [currentProdPrice, setCurrentProdPrice] = useState(0);
  const [currentProdDescription, setCurrentProdDescription] = useState('');
  const [currentProdEndDate, setCurrentProdEndDate] = useState('');
  const [currentProdAutoExtend, setCurrentProdAutoExtend] = useState(0);

  const [prodImages, setProdImages] = useState([]);
  const [mainImageSrc, setMainImageSrc] = useState(null);

  const prodNameRef = useRef('');
  const prodCategoryIdRef = useRef(0);
  const prodPriceStartingRef = useRef(0);
  const prodPriceStepRef = useRef(0);
  const prodPriceRef = useRef(0);
  const prodDescriptionRef = useRef('');
  const prodEndDateRef = useRef(Date.now());
  const prodAutoExtendRef = useRef(0);

  const [listRemoveImage, setListRemoveImage] = useState([]);
  const [listNewImage, setListNewImage] = useState([]);
  const [listNewImageRender, setListNewImageRender] = useState([]);

  const fileChangeHandler = (file) => {
    if (file) {
      setListNewImage((prevState) => [...prevState, file]);
      getBase64(file);
    }
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setListNewImageRender((prevSate) => [...prevSate, { file, image: reader.result }]);
    };
  };

  const removeFile = (item) => {
    // console.log(item);
    if (prodImages.includes(item)) {
      setProdImages((prevState) => prevState.filter((image) => image !== item));
      setListRemoveImage((prevState) => [...prevState, item]);
    }
    setListNewImage((prevState) => prevState.filter((image) => image !== item?.file));
    setListNewImageRender((prevState) => prevState.filter((image) => image !== item));
  };

  const getListCategoryHandler = useCallback(async () => {
    try {
      // await dispatch(getListCategory()).unwrap();
    } catch (err) {}
  }, []);

  const closeModalHandler = () => {
    if (itemInfo) {
      setCurrentProdName(itemInfo?.prodName);
      setCurrentProdCategoryId(itemInfo?.prodCategoryId);
      setCurrentPriceStarting(itemInfo?.prodPriceStarting);
      setCurrentProdPriceStep(itemInfo?.prodPriceStep);    
      setCurrentProdPrice(itemInfo?.prodPrice);  
      setCurrentProdDescription(itemInfo?.prodDescription);
      setCurrentProdEndDate(itemInfo?.prodEndDate);
      setCurrentProdAutoExtend(itemInfo?.prodAutoExtend);
      setProdImages(itemInfo?.prodImages || []);
    }
    setError('');
    setListRemoveImage([]);
    onClose();
  };

  const updateProductHandler = async () => {
    setError('');

    const enteredProdName = prodNameRef.current.value;
    const enteredProdCategoryId = prodCategoryIdRef.current.value;
    const enteredProdPriceStarting = prodPriceStartingRef.current.value;
    const enteredProdPriceStep = prodPriceStepRef.current.value;
    const enteredProdPrice = prodPriceRef.current.value;
    const enteredProdDescription = prodDescriptionRef.current.value;
    const enteredProdEndDate = prodEndDateRef.current.value;
    const enteredProdAutoExtend = prodAutoExtendRef.current.value;
    let formData = new FormData();

    if (
      enteredProdName?.length > 0 &&
      enteredProdCategoryId?.length > 0 &&
      enteredProdPriceStarting?.length > 0 &&
      enteredProdPriceStep?.length > 0 &&
      enteredProdEndDate?.length > 0
    ) {
      setSubmitIsValid(true);
    } else {
      setSubmitIsValid(false);
      return;
    }

    for (let i = 0; i < prodImages.length; i++) {
      formData.append('prodImages', prodImages[i]);
    }

    formData.append('prodName', enteredProdName);
    formData.append('prodCategoryId', enteredProdCategoryId);
    formData.append('prodPriceStarting', enteredProdPriceStarting);
    formData.append('prodPriceStep', enteredProdPriceStep);
    formData.append('prodPrice', enteredProdPrice);
    formData.append('prodDescription', enteredProdDescription);
    formData.append('prodEndDate', enteredProdEndDate);
    formData.append('prodAutoExtend', enteredProdAutoExtend);
    try {
      // await dispatch(updateAuctionProduct(formData)).unwrap();
      // toast.success('Add new product success');
    } catch (err) {
      setError(err);
      // console.log('🚀 ~ file: AddProduct.js ~ line 140 ~ addNewProductHandler ~ error', error);
    }
    onClose();
  };

  useEffect(() => {
    getListCategoryHandler();
  }, [dispatch, getListCategoryHandler]);

  useEffect(() => {
    if (prodImages.length > 0) {
      try {
        getBase64(prodImages[0]);
      } catch (error) {
      }
    } else {
      setMainImageSrc(null);
    }
  }, [prodImages]);

  useEffect(() => {
    if (itemInfo) {
      setCurrentProdName(itemInfo?.prodName);
      setCurrentProdCategoryId(itemInfo?.prodCategoryId);
      setCurrentPriceStarting(itemInfo?.prodPriceStarting);
      setCurrentProdPriceStep(itemInfo?.prodPriceStep);    
      setCurrentProdPrice(itemInfo?.prodPrice);  
      setCurrentProdDescription(itemInfo?.prodDescription);
      setCurrentProdEndDate(itemInfo?.prodEndDate);
      setCurrentProdAutoExtend(itemInfo?.prodAutoExtend);
      setProdImages(itemInfo?.prodImages || []);
      // setMainImageSrc(itemInfo?.prodImages[0]);
    }
  }, [itemInfo]);
  return (
    <ProductModal isOpen={isOpen} onClose={closeModalHandler}>
      <div className={classes.root}>
        <Box borderRadius={6} className={classes.content}>
          <Box marginBottom={4} marginTop={2}>
            <Typography variant="h5" className={classes.title}>
              Cập nhật sản phẩm
            </Typography>
            {/* <Typography variant="caption" className={classes.subTitle}>
              Family Admin Panel
            </Typography> */}
          </Box>
          <form encType="multipart/form-data" className={classes.section}>
            <Box marginBottom={2} className={classes.image}>
              <div className={classes.mainImage}>
                <img
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className={classes.listUpload}>
                <input
                  accept="image/jpeg"
                  id="img1"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => fileChangeHandler(e.target.files[0])}
                />
                <Box display="flex" flexWrap="wrap" alignItems="center">
                  {prodImages?.length > 0 &&
                    prodImages.map((item, index) => (
                      <Box
                        display="flex"
                        alignItems="center"
                        key={index}
                        marginRight={2}
                        className={classes.miniImage}>
                        <img
                          src={item}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <IconButton
                          color="primary"
                          onClick={() => removeFile(item)}
                          className={classes.iconDel}
                          size="small">
                          <Close
                            fontSize="small"
                            style={{
                              color: '#000',
                              cursor: 'pointer',
                            }}
                          />
                        </IconButton>
                      </Box>
                    ))}
                  {listNewImageRender?.length > 0 &&
                    listNewImageRender.map((item, index) => (
                      <Box
                        display="flex"
                        alignItems="center"
                        key={index}
                        marginRight={2}
                        className={classes.miniImage}>
                        <img
                          src={item.image}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <IconButton
                          color="primary"
                          onClick={() => removeFile(item)}
                          className={classes.iconDel}
                          size="small">
                          <Close
                            fontSize="small"
                            style={{
                              color: '#000',
                              cursor: 'pointer',
                            }}
                          />
                        </IconButton>
                      </Box>
                    ))}
                </Box>

                <IconButton color="primary" className={classes.iconAdd}>
                  <label htmlFor="img1" style={{ display: 'flex' }}>
                    <Add />
                  </label>
                </IconButton>
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
                value={currentProdName}
                inputRef={prodNameRef} 
                />
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
                    value={currentProdCategoryId}
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
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ type: 'number' }}
                  fullWidth
                  value={currentProdPriceStarting}
                  inputRef={prodPriceStartingRef}
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                Bước giá (VND)
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ type: 'number' }}
                  fullWidth
                  value={currentProdPriceStep}
                  inputRef={prodPriceStepRef}
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                Giá mua thẳng (VND)
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  inputProps={{ type: 'number' }}
                  fullWidth
                  value={currentProdPrice}
                  inputRef={prodPriceRef}
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                Ngày hết hạn
                </Typography>
                <TextField
                  defaultValue={Date.now()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ type: 'date' }}
                  // minDate={Date.now()}
                  fullWidth
                  value={currentProdEndDate}
                  inputRef={prodEndDateRef}
                />
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
                    value={currentProdAutoExtend}
                    inputRef={prodAutoExtendRef}>
                    <option value="0">Không gia hạn</option>
                    <option value="1">Gia hạn</option>
                  </Select>
                </FormControl>
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                  Mô tả
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  multiline
                  rows={4}
                  fullWidth
                  value={currentProdDescription}
                  inputRef={prodDescriptionRef}
                />
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
                  onClick={updateProductHandler}>
                  Cập Nhật
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

export default UpdateProduct;