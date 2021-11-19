import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ChildProductCard from '../components/ProductCard/ChildProductCard';
import moment from 'moment';
import {
    Container,
    makeStyles,
} from '@material-ui/core';
import { Card, Row, Col, Alert, Carousel, Button, Toast, ToastContainer } from 'react-bootstrap';
import iphone2 from '../images/iphone2.jpg';
import '../index.css';
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getProductDetail, getProductByCategory } from '../reducers/unauthorizedProduct';
import BiddingModel from '../components/bidder/bidding';
import { bidAddWatchList } from '../reducers/users/bidder';
import { FcLike } from "react-icons/fc";
import HistoryProductBid from "../components/bidder/historyProduct";
import HistoryProductSel from "../components/seller/historyProduct";
import ListCommentSeller from "../components/bidder/listCommentSeller";//export a function

import { Role } from '../config/role';
import { invalid } from 'moment';
import NumberFormat from 'react-number-format';
import { Markup } from 'interweave';
import { Avatar, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        maxHeight: '-webkit-fill-available',
    },
    content: {
        padding: '5vh 0',
    },
    display_image: {
        width: "100%",
        height: "14vw",
        objectFit: "cover"
    },
    card: {
        width: "100%",
        height: "100%"
    }
}));

function Home() {

    //Define neccessary parameter
    const classes = useStyles();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);//get authenticated information from local store
    //0.get parameter from FE url, which defined on config/router
    const { productId } = useParams();
    //1.Get data from local store
    //2.Define use state
    //in the beginning, productDetails will be blank, when data loaded, we set the new data to this variable, we cannot use useSelector here
    const [productDetails, setProductDetails] = useState({});//{} is the initial value
    const [ratingAccount, setRatingAccount] = useState({});//{} is the initial value
    const [productCategory, setProductCategory] = useState({});
    const [openModalbid, setOpenModalbid] = useState(false);
    const [openModalHisBid, setOpenModalHisBid] = useState(false);
    const [openModalHisSel, setOpenModalHisSel] = useState(false);
    const [openModalCommentSeller, setOpenModalCommentSeller] = useState(false);
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const [isShowButtonBid, setisShowButtonBid] = useState(false);
    const [isShowButtonHis, setisShowButtonHis] = useState(false);
    const [isShowButtonWat, setisShowButtonWat] = useState(false);
    const [isShowButtonSellerComment, setisShowButtonSellerComment] = useState(false);
    
  
    const user = useSelector((state) => state.auth.user);
    const Socket = useSelector((state) => state.unauthorizedProduct.SocketInProductDetail);
    //3.create handler



    const getProductDetailHandler = useCallback(async () => {
        try {
            //use reducer function to get data and put it into local store
            var response = await dispatch(getProductDetail({ id: +productId })).unwrap();
            setProductDetails(response.productDetail);//set new state for productDetail with the returned data from BE when user change value
            setRatingAccount(response.rating);
            //get 5 product in the same category
            const payload = {
                catID: response.productDetail.prod_category_id,
                page: 1,
                limit: 5,
                prodID: response.productDetail.prod_id
            }
            if (payload.catID && payload.prodID) {
                response = await dispatch(getProductByCategory(payload)).unwrap();
                setProductCategory(response.listProduct);
            }
        } catch (err) {
            alert(err);
        }
    }, [dispatch]);

    const handleCloseBid = () => {
        setOpenModalbid(false);
    };

    const openModalHandlerBid = () => {
        setOpenModalbid(true);
    };

    const handleCloseHis = () => {
        setOpenModalHisBid(false);
        setOpenModalHisSel(false);
        // setOpenModalCommentSeller(false);
    };

    const handleCloseCommentList = () => {
        setOpenModalCommentSeller(false);
    };

    const openModalHandlerHis = () => {
        if (isAuthenticated) {
            if (user.role === Role.Bidder) {
                setOpenModalHisBid(true);
            }
            else {
                setOpenModalHisSel(true);
            }
        }
    };


    const openModalCommentSellerHandler = () => {
        if (isAuthenticated) {
            if (user.role === Role.Bidder) {
                setOpenModalCommentSeller(true);

            }
            // else {
            //     setOpenModalHisSel(true);
            // }

        }
    };

    

   


    const addWatchList = useCallback(async ({ prodId }) => {
        try {
            await dispatch(bidAddWatchList({ prodId })).unwrap();
            setText('Thêm sản phẩm vào danh sách yêu thích thành công! ')
            setShow(true)
        } catch (err) {
            setText(err)
            setShow(true)

        }
    }, [dispatch]);
    const toggleShowA = () => setShow(false);

    const handleVisible = useCallback(() => {
        if (show === true) {
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }
    }, [show])
    useEffect(() => {
        handleVisible();
    }, [handleVisible]);
    //4.use effect
    useEffect(() => {//this function always run first
        if (productId) {
            getProductDetailHandler(productId);
        }
        if (isAuthenticated) {
            //check role and show hide button will be used on useEffect
            if (user.role === Role.Seller) {
                setisShowButtonBid(true);
                setisShowButtonSellerComment(true)
            }
        }
        else {
            setisShowButtonWat(true);
            setisShowButtonBid(true);
            setisShowButtonHis(true);
            setisShowButtonSellerComment(true)
        }
    }, [productId, Socket]);//when product ID change, use effect will catch it and set new data for product detail, productID must define here

    //5. display data onto the view
    return (
        <>

            <div className={classes.root} >
                <Header />
                <BiddingModel
                    isOpen={openModalbid}
                    onClose={handleCloseBid}
                    prod_id={productDetails.prod_id}
                />
                <HistoryProductBid
                    isOpen={openModalHisBid}
                    onClose={handleCloseHis}
                    prod_id={productDetails.prod_id}
                />
                <HistoryProductSel
                    isOpen={openModalHisSel}
                    onClose={handleCloseHis}
                    prod_id={productDetails.prod_id}
                />

                <ListCommentSeller
                    isOpen={openModalCommentSeller }
                    onClose={handleCloseCommentList}
                    prod_id={productDetails.prod_id}
                />


               
 


                <div className={classes.content} >
                    <Container>
                        {/*                         
                        <div className="container">
                            {productDetails.prod_name}
                        </div> */}
                        <div className="row">

                            <div
                                className="col-md-6 mb-4 mb-md-0"
                            // style={{ width: "100%" }}
                            >
                                <img className={classes.display_image}
                                    style={{ objectFit: 'contain', height: "100%", backgroundColor: "#e8e7e3" }}
                                    src={productDetails.prod_main_image || 'https://giaoducthuydien.vn/wp-content/themes/consultix/images/no-image-found-360x250.png'} alt="Product main image"
                                />

                                {/* <div className="col-md-6 mb-4 mb-md-0" >
                                <img className={classes.display_image} 
                                style={{ height: "100%" }} 
                                src={productDetails.prod_main_image || 'https://giaoducthuydien.vn/wp-content/themes/consultix/images/no-image-found-360x250.png'} 
                                alt="" /> */}

                            </div>
                            <div className="col-md-6 mt-2">
                                <h2>{productDetails.prod_name}</h2>
                                {(Math.floor((new Date() - new Date(moment(productDetails.prod_created_date, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"))) / 60000) < 10) && (
                                    <Chip
                                        style={{
                                            background: 'linear-gradient(250deg, rgba(40,4,47,0.85) 5%, rgba(189,18,176,0.80) 45%, rgba(0,176,255,0.85) 80%)',
                                            color: "#fff",
                                            width: 100,
                                            fontWeight: 'bold'
                                        }}
                                        variant={"default"}
                                        label="New"
                                        avatar={<Avatar alt="Natacha" src="/img/img_new.png" />}
                                    />
                                )}
                                <p className="mb-2 text-muted text-uppercase small">Loại sản phẩm : <b>{productDetails.prod_categoryName}</b></p>
                                <ul className="rating">
                                    <li>
                                        <p>Giá hiện tại : {productDetails.prod_price_current == null ? 'Chưa có thông tin' : ''}
                                            <NumberFormat
                                                value={productDetails.prod_price_current}
                                                variant="standard"
                                                thousandSeparator={true}
                                                suffix={' VND'}
                                                displayType={'text'}
                                            />
                                        </p>

                                    </li>
                                    <li>
                                        <p>Giá mua ngay : {productDetails.prod_price == null ? 'Chưa có thông tin' : ''}
                                            <NumberFormat
                                                value={productDetails.prod_price}
                                                variant="standard"
                                                thousandSeparator={true}
                                                suffix={' VND'}
                                                displayType={'text'}
                                            />
                                        </p>
                                    </li>
                                </ul>
                                <div className="table-responsive">
                                    <table className="table table-sm table-borderless mb-0">
                                        <tbody>
                                            <tr >
                                                <th className="pl-0 w-25" scope="row" style={{ borderTop: "1px solid black", borderStyle: "dashed", borderColor: "#2877F5" }}><strong>Người bán: </strong></th>
                                                <td style={{ borderTop: "1px solid black", borderStyle: "dashed", borderColor: "#2877F5" }}><p>{productDetails.prod_seller_id == null ? 'Chưa có thông tin' : productDetails.prod_seller_id} </p></td>
                                                <th className="pl-0 w-25" scope="row"><strong></strong></th>
                                            </tr>
                                            <tr>
                                                <th className="pl-0 w-25" scope="row"><strong><li>Điểm cộng:</li></strong></th>
                                                <td><p>{ratingAccount.acc_like_seller == null ? 0 : ratingAccount.acc_like_seller} </p></td>
                                            </tr>
                                            <tr>
                                                <th className="pl-0 w-25" scope="row"><strong><li>Điểm trừ: </li></strong></th>
                                                <td><p>{ratingAccount.acc_dis_like_seller == null ? 0 : ratingAccount.acc_dis_like_seller} </p></td>
                                            </tr>
                                            <tr>
                                                <th style={{ borderTop: "1px solid black", borderStyle: "dashed", borderColor: "#2877F5" }} className="pl-0 w-25" scope="row"><strong>Người giữ giá:</strong></th>
                                                <td style={{ borderTop: "1px solid black", borderStyle: "dashed", borderColor: "#2877F5" }}><p>{productDetails.prod_price_holder == null ? 'Chưa có thông tin' : productDetails.prod_price_holder} </p></td>
                                                <th className="pl-0 w-25" scope="row"><strong></strong></th>
                                            </tr>
                                            <tr>
                                                <th className="pl-0 w-25" scope="row"><strong><li>Điểm cộng: </li></strong></th>
                                                <td><p>{ratingAccount.acc_like_bidder == null ? 0 : ratingAccount.acc_like_bidder} </p></td>
                                            </tr>
                                            <tr>
                                                <th className="pl-0 w-25" scope="row"><strong><li>Điểm trừ: </li></strong></th>
                                                <td><p>{ratingAccount.acc_dis_like_bidder == null ? 0 : ratingAccount.acc_dis_like_bidder} </p></td>
                                            </tr>
                                            <tr>
                                                <th style={{ borderTop: "1px solid black", borderStyle: "dashed", borderColor: "#2877F5" }} className="pl-0 w-25" scope="row"><strong>Thời điểm đăng: </strong></th>
                                                <td style={{ borderTop: "1px solid black", borderStyle: "dashed", borderColor: "#2877F5" }}><p>{productDetails.prod_created_date == null ? 'Chưa có thông tin' : productDetails.prod_created_date}</p></td>
                                                <th className="pl-0 w-25" scope="row"><strong></strong></th>
                                            </tr>
                                            <tr>
                                                <th style={{ borderTop: "0.5px solid", borderStyle: "dashed", borderColor: "#2877F5" }} className="pl-0 w-25" scope="row"><strong>Ngày hết hạn: </strong></th>
                                                <td style={{ borderTop: "0.5px solid", borderStyle: "dashed", borderColor: "#2877F5" }}><p>{productDetails.prod_end_date == null ? 'Chưa có thông tin' : productDetails.prod_end_date}</p></td>
                                                <th className="pl-0 w-25" scope="row"><strong></strong></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div>
                                        <Button className="ml-2" size="sm" hidden={isShowButtonBid} variant="outline-primary" onClick={() => openModalHandlerBid()}>Đấu giá</Button>
                                        <Button className="ml-2" size="sm" hidden={isShowButtonHis} variant="outline-info" onClick={() => openModalHandlerHis()}>Xem lịch sử</Button>
                                        <Button className="ml-2" size="sm" hidden={isShowButtonSellerComment} variant="outline-success" onClick={() => openModalCommentSellerHandler()}>Xem đánh giá seller</Button>
                                        {/* <Button hidden={isShowButtonWat}  className="ml-2" size="sm" variant="outline-light" onClick={() => addWatchList({ prodId: productDetails.prod_id })}>Xem đánh giá seller</Button> */}
                                        <button hidden={isShowButtonWat} onClick={() => addWatchList({ prodId: productDetails.prod_id })} type="button" className="btn btn-danger btn-sm px-3 mb-0.5 ml-2 material-tooltip-main" data-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="far fa-heart" /></button>
                                        <Toast show={show} onClose={toggleShowA} className="d-inline-block m-1" bg="primary">
                                            <Toast.Header>
                                                <strong className="me-auto">thông báo</strong>
                                            </Toast.Header>
                                            <Toast.Body className="text-white">{text}</Toast.Body>
                                        </Toast>
                                    </div>
                                </div>
                                <hr />
                                <div className="table-responsive mb-2">

                                    <div className="col-12">
                                        <div className="row scroll">


                                            <div className="view overlay rounded z-depth-1 gallery-item" style={{ width: "100%", height: "200px" }}>
                                                <Carousel className="center" style={{ width: "100%", height: "200px", objectFit: "fill" }}>
                                                    {productDetails.prod_img?.length > 0 &&
                                                        productDetails.prod_img.map((image, index) => (
                                                            <Carousel.Item>
                                                                <img
                                                                    style={{ width: "100%", height: "300px" }}
                                                                    className="d-block w-100 photo"
                                                                    src={image}
                                                                    alt="Fifth slide"
                                                                />
                                                                <Carousel.Caption >

                                                                </Carousel.Caption>
                                                            </Carousel.Item>
                                                        ))}
                                                </Carousel>
                                            </div>


                                        </div>
                                    </div>


                                    {/* <div className="table-responsive mb-2">
                                        <div className="col-12">
                                            <div className="row scroll">
                                                {productDetails.prod_img?.length > 0 &&
                                                    productDetails.prod_img.map((image, index) => (

                                                        <div className="col">
                                                            <div className="view overlay rounded z-depth-1 gallery-item">

                                                                <img src={image} className="img-fluid" />

                                                                <div className="mask rgba-white-slight" />
                                                            </div>

                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>


                        {/* Classic tabs */}
                        <div className="classic-tabs border rounded px-4 pt-1 mt-5" style={{ backgroundColor: "#d9d5d0" }}>
                            <ul className="nav nav-tabs" id="advancedTab" role="tablist">
                                <li className="nav-item active">
                                    <a className="nav-link active show" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
                                </li>
                                {/* <li className="nav-item">
                                    <a className="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews (1)</a>
                                </li> */}
                            </ul>
                            <div className="tab-content p-5 mb-5" id="advancedTabContent" style={{ backgroundColor: "#ebe9e6" }}>
                                <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                    <h5>Mô tả sản phẩm</h5>
                                    <Markup content={productDetails.prod_description} />
                                </div>
                                {/* <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                    <h5><span>1</span> review for <span>Fantasy T-shirt</span></h5>
                                    <div className="media mt-3 mb-4">
                                        <img className="d-flex mr-3 z-depth-1" src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg" width={62} alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <div className="d-sm-flex justify-content-between">
                                                <p className="mt-1 mb-2">
                                                    <strong>Marthasteward </strong>
                                                    <span>– </span><span>January 28, 2020</span>
                                                </p>

                                            </div>
                                            <p className="mb-0">Nice one, love it!</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <h5 className="mt-4">Add a review</h5>
                                    <p>Your email address will not be published.</p>

                                    <div>
                                    
                                        <div className="md-form md-outline">
                                            <textarea id="form76" className="md-textarea form-control pr-6" rows={4} defaultValue={""} />
                                            <label htmlFor="form76">Your review</label>
                                        </div>
                                       
                                        <div className="md-form md-outline">
                                            <input type="text" id="form75" className="form-control pr-6" />
                                            <label htmlFor="form75">Name</label>
                                        </div>
                                      
                                        <div className="md-form md-outline">
                                            <input type="email" id="form77" className="form-control pr-6" />
                                            <label htmlFor="form77">Email</label>
                                        </div>
                                        <div className="text-right pb-2">
                                            <button type="button" className="btn btn-primary">Add a review</button>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        {/* Classic tabs */}




                    </Container>
                    <section className="text-center mt-5" >
                        <h4>Sản phẩm cùng chuyên mục</h4>
                        {/* Grid row */}
                        <div className="row justify-content-center flex-fill">
                            {productCategory?.length > 0 &&
                                productCategory.map((prod, index) => (
                                    <div key={prod.prod_id} className="col-2">
                                        <Card className="h-100">
                                            <Card.Body>
                                                <ChildProductCard
                                                    id={prod.prod_id}
                                                    title={prod.prod_name}
                                                    description={prod.prod_description}
                                                    image={prod.prod_main_image}
                                                    price={prod.prod_price}
                                                    endDate={prod.prod_end_date}
                                                    currentPrice={prod.prod_price_current}
                                                    catName={prod.cate_name}
                                                />
                                            </Card.Body>

                                        </Card>
                                        {/* Card */}
                                    </div>

                                ))}


                        </div>
                    </section>
                </div>
            </div>
            <div className={classes.content}>
                <Footer />
            </div>
        </>





    );
}

export default Home;