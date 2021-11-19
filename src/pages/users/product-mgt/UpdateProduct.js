import ProductModal from './ProductModal';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  makeStyles,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { ZoomIn, Edit } from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategory } from '../../../reducers/category';
import { updateAuctionProduct } from '../../../reducers/users/product';
import DescriptionProduct from './DescriptionModel';
import { Markup } from 'interweave';
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
  

  ovlContainer: {
    "&:hover": {
        "& $ovlOverlay": {
          opacity: 1,
        }
      },
    position: "relative",
    width: 60,
    height: 60,
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

const UpdateProduct = ({ itemInfo, isOpen, onClose, showSuccess, textAlert, getList }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data);
  const [error, setError] = useState('');
  const [submitIsValid, setSubmitIsValid] = useState(true);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);

  const [currentProdName, setCurrentProdName] = useState('');
  const [currentProdCategoryId, setCurrentProdCategoryId] = useState(0);
  const [currentProdPriceStarting, setCurrentPriceStarting] = useState(0);
  const [currentProdPriceStep, setCurrentProdPriceStep] = useState(0);
  const [currentProdPrice, setCurrentProdPrice] = useState(0);
  const [currentProdDescription, setCurrentProdDescription] = useState('');
  const [currentProdEndDate, setCurrentProdEndDate] = useState('');
  const [currentProdAutoExtend, setCurrentProdAutoExtend] = useState(0);

  const [prodImages, setProdImages] = useState([]);
  const [stateDescription, setStateDescription] = useState('');
  const prodDescriptionRef = useRef('');

  const openDescriptionModalHandler = () => {
    setOpenDescriptionModal(true);
  };

  const closeDescriptionModalHandler = () => {
    setOpenDescriptionModal(false);
  };

  const fileChangeHandler = (file) => {
    if (file) {
      // setListNewImage((prevState) => [...prevState, file]);
      getBase64(file);
    }
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // setListNewImageRender((prevSate) => [...prevSate, { file, image: reader.result }]);
    };
  };

  const getListCategoryHandler = useCallback(async () => {
    try {
      await dispatch(getListCategory()).unwrap();
    } catch (err) {}
  }, [dispatch]);

  const closeModalHandler = () => {
    //itemInfo.prodDescription = currentProdDescription + '<br>' + itemInfo?.prodDescription;
    setError('');
    onClose();
  };

  const updateProductHandler = async () => {
    setError('');
    const enteredProdDescription = currentProdDescription +'<br>'+ stateDescription;
    let formData = new FormData();
    if(enteredProdDescription){
      formData.append('prodDescription', enteredProdDescription);
      formData.append('prodId', itemInfo?.prodId);

      if ( enteredProdDescription?.length > 0 ) 
      {
        setSubmitIsValid(true);
      } else {
        setSubmitIsValid(false);
        return;
      }
      try {
        await dispatch(updateAuctionProduct(formData)).unwrap();
        showSuccess(true);
        textAlert('Lưu thành công!!!');
        getList();
      } catch (err) {
        setError(err);
        return;
      }
    }
    onClose();
  };

  useEffect(() => {
    getListCategoryHandler();
  }, [dispatch, getListCategoryHandler]);

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
    }
  }, [itemInfo]);
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
              Cập nhật sản phẩm
            </Typography>
          </Box>
          <form encType="multipart/form-data" className={classes.section}>
            <Box marginBottom={2} className={classes.image}>
              <div className={classes.mainImage}>
                <img
                  alt=""
                  src={itemInfo?.prodMainImage}
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
                      <Box display="flex" alignItems="center" key={index}  marginRight={2} className={classes.ovlContainer}>
                        <img
                        alt=""
                        src={item}
                        style={{
                          objectFit: 'cover',
                        }}
                        className={classes.ovlImage}
                        />
                        <div className={classes.ovlOverlay}>
                          <ZoomIn  onClick={()=>{}} className={classes.ovlIcon} placeholder="Phóng to"/>
                        </div>
                      </Box>
                    ))}
                </Box>
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
                inputProps={{ readOnly: true }}
                value={currentProdName}
                // inputRef={prodNameRef} 
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
                    inputProps={{ readOnly: true }}
                    value={currentProdCategoryId}
                    // inputRef={prodCategoryIdRef}
                    >
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
                  value={currentProdPriceStarting}
                  inputProps={{ readOnly: true }}
                  customInput={TextField}
                  // ref={currentProdPriceStarting}
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
                  value={currentProdPriceStep}
                  inputProps={{ readOnly: true }}
                  customInput={TextField}
                  // ref={currentProdPriceStarting}
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
                  value={currentProdPrice}
                  inputProps={{ readOnly: true }}
                  customInput={TextField}
                  // ref={currentProdPriceStarting}
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                Ngày hết hạn
                </Typography>
                <TextField
                  // defaultValue={Date.now()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ readOnly: true }}
                  // minDate={Date.now()}
                  fullWidth
                  value={moment(new Date(currentProdEndDate)).format("DD/MM/YYYY HH:mm")}
                  // inputRef={prodEndDateRef}
                />
              </div>
              <div className={classes.textField}>
                <Typography variant="caption" component="p">
                  Mô tả
                </Typography>
                {/* <TextField
                  variant="standard"
                  size="small"
                  multiline
                  rows={4}
                  fullWidth
                  value={currentProdDescription}
                  inputRef={prodDescriptionRef}
                /> */}
                <Markup content={currentProdDescription} />            
                <Button
                marginTop={2}
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
                    defaultValue=""
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    value={currentProdAutoExtend}
                    inputProps={{ readOnly: true }}
                    // inputRef={prodAutoExtendRef}
                    >
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
