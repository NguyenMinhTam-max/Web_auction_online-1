import { CardContent, makeStyles, Typography, Card, CardMedia } from '@material-ui/core';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { deleteHTML } from '../../helpers/deleteHTML';
import { useDispatch, useSelector } from 'react-redux';
import { bidAddWatchList } from '../../reducers/users/bidder';
import { FcLike } from "react-icons/fc";
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow:
            'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px',
        transition: 'all .5s',
        '&:hover': {
            boxShadow: '0px 2px 8px rgba(0,0,0,.5)',
            '& $title': {
                textDecoration: 'underline',
            },
        },
    },

    link: {
        textDecoration: 'none',
    },

    content: {
        padding: '10px !important',
    },
    display_image: {
        height: "100%",
        paddingTop: '56.25%',

    },
    title: {
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#333',
        fontSize: ({ size }) => (size === 'small' ? 14 : 22),
        fontFamily: "bold",
    },
    hasSale: {
        textDecoration: 'line-through',
        color: '#333 !important',
        opacity: 0.9,
        fontSize: '12px !important',
    },
    price: {
        color: theme.palette.secondary.dark,//https://mui.com/customization/palette/   from '@material-ui/core'
    },
    description: {
        display: '-webkit-box',
        '-webkit-line-clamp': ({ size }) => (size === 'small' ? 2 : 4),
        '-webkit-box-orient': 'vertical',
        //https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_text-overflow basic css
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ////////////////////////
        fontSize: ({ size }) => (size === 'small' ? 13 : 14),
    },
    subInfomation: {
        display: '-webkit-box',
        '-webkit-line-clamp': ({ size }) => (size === 'small' ? 2 : 4),
        '-webkit-box-orient': 'vertical',
        //https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_text-overflow basic css
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ////////////////////////
        fontSize: ({ size }) => (size === 'small' ? 13 : 14),
    },
}));

const ProductCard = ({
    id,
    title,
    image,
    endDate,
    currentPrice,
    price,
    catName,
    holder,
    seller,
    numberBid,
    createdDate,
    priceHolder,
    size = 'normal'
}) => {
    const classes = useStyles({ size });
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const [isButtonWat, setIsButtonWat] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const addWatchList = useCallback(async ({ prodId }) => {
        try {
            console.log(prodId)
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
        if (!isAuthenticated) {
            setIsButtonWat(true);
        }
        handleVisible();
    }, [handleVisible]);

    return (
        <div>
            <Card className={classes.card}>

                <Link to={`/details/${id}`} className={classes.link}>
                    <CardMedia
                        className={classes.display_image}
                        image={image || 'https://giaoducthuydien.vn/wp-content/themes/consultix/images/no-image-found-360x250.png'}
                        title={title}
                    />
                    <CardContent className={classes.content}>
                        <Typography className={classes.title} variant="body1">
                            {title}
                        </Typography>
                        <Typography className={classes.subInfomation}
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            Ngày hết hạn: <strong>{endDate}</strong>
                        </Typography>

                        <Typography className={classes.subInfomation}
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            Giá hiện tại: <strong>{currentPrice == null ? 'Chưa có thông tin' : ''}
                                <NumberFormat
                                    value={currentPrice}
                                    variant="standard"
                                    thousandSeparator={true}
                                    suffix={' VND'}
                                    displayType={'text'}
                                />
                            </strong>
                        </Typography>
                        <Typography className={classes.subInfomation}
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            Ngày đăng: <strong>{createdDate == null ? 'Chưa có thông tin' : createdDate} </strong>
                        </Typography>
                        <Typography className={classes.subInfomation}
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            Người giữ giá: <strong>{holder == null ? 'Chưa có thông tin' : holder} </strong>
                        </Typography>
                        <Typography className={classes.subInfomation}
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            Giá mua ngay: <strong>{price == null ? 'Chưa có thông tin' : ''}
                                <NumberFormat
                                    value={price}
                                    variant="standard"
                                    thousandSeparator={true}
                                    suffix={' VND'}
                                    displayType={'text'}
                                />
                            </strong>
                        </Typography>
                        <Typography className={classes.subInfomation}
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            Thời gian còn lại: <strong>{endDate == null ? 'Chưa có thông tin' : endDate } </strong>
                        </Typography>
                        <Typography className={classes.subInfomation}
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            Số lần ra giá: <strong>{numberBid == null ? 'Chưa có thông tin' : numberBid} </strong>
                        </Typography>
                      
                    </CardContent>
                </Link>
                <Typography variant="body1">
                    {/* <Button hidden={isButtonWat} variant="outline-light" onClick={() => addWatchList({ prodId: id })}><FcLike className="iconaler" /></Button> */}
                    <button hidden={isButtonWat} onClick={() => addWatchList({ prodId: id })} type="button" className="btn btn-danger btn-sm px-2 mb-2 ml-2 material-tooltip-main" data-toggle="tooltip" data-placement="top" title="Add to wishlist"><i className="far fa-heart" /></button>
                    <ToastContainer position="top-end" className="p-3">
                        <Toast show={show} onClose={toggleShowA} bg="primary">
                            <Toast.Header>
                                <strong className="me-auto">thông báo</strong>
                            </Toast.Header>
                            <Toast.Body className="text-white">{text}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Typography>
            </Card>
        </div>
    );
};
export default ProductCard;
