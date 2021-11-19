import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductInfoCard from '../components/ProductCard/ProductInfoCard';
import { Card } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getProductByCategory } from '../reducers/homeCategory'
import Pagination from '@material-ui/lab/Pagination';
import {
    Container,
    makeStyles,
} from '@material-ui/core';
import '../index.css';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '50vh',
        maxHeight: '-webkit-fill-available',
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
    pagination: {
        '& > *': {
            justifyContent: 'center',
            display: 'flex',
        },
    },
    content: {
        padding: '5vh 0',
    },
}));

function Home() {
    const classes = useStyles()
    const dispatch = useDispatch();
    const { catID } = useParams();
    const [productCatInfo, setProductCatInfo] = useState({});

    let { loading, listProduct, numberProduct, numberOfPage } = productCatInfo;
    const [page, setPage] = useState(1);
    const [catName, setCatName] = useState('');
    console.log(catName)
    const [error, setError] = useState('');
    const getProductByCategoryListHandler = useCallback(
        async (page = 1, catID) => {
            try {

                const limit = 8;

                const response = await dispatch(getProductByCategory({ page, limit, catID: +catID })).unwrap();
                //process start date and end date here
                setProductCatInfo(response);
                setCatName(response.listProduct[0].cate_name)
            } catch (err) {
                setError(err);
            }
        },
        [dispatch]
    );
    const pageChangeHandler = (event, value) => {
        setPage(value);

    };
    useEffect(() => {
        if (catID)
            getProductByCategoryListHandler(page, catID)
    }, [dispatch, getProductByCategoryListHandler, page, catID]);//when page change, get the new list

    useEffect(() => {
        document.title = 'Sản phẩm theo chuyên mục';
    }, []);

    return (
        <>

            <div className={classes.root}>
                <Header />
                <div className={classes.content}>
                    <Container>
                        <div className="container">
                            <h2><p>{catName != '' ? "Danh sách sản phẩm cho chuyên mục '" + catName + "':" : 'Không tồn tại chuyên mục mà bạn đã chọn!'}</p></h2>
                            <section className="text-center mt-5" >

                                {/* Grid row */}
                                <div className="row justify-content-center flex-fill">
                                    {listProduct?.length > 0 &&
                                        listProduct.map((prod, index) => (
                                            <div key={prod.prod_id} className="col-4">
                                                <Card className="h-100">
                                                    <Card.Body>
                                                        <ProductInfoCard
                                                            id={prod.prod_id}
                                                            title={prod.prod_name}
                                                            description={prod.prod_description}
                                                            image={prod.prod_main_image}
                                                            price={prod.prod_price}
                                                            endDate={prod.prod_end_date}
                                                            currentPrice={prod.prod_price_current}
                                                            catName={prod.cate_name}
                                                            holder={prod.prod_price_holder}
                                                            seller={prod.prod_seller_id}
                                                            numberBid={prod.number_bid}
                                                            createdDate = {prod.prod_created_date}
                                                            priceHolder = {prod.prod_price_holder}
                                                        />
                                                    </Card.Body>

                                                </Card>
                                                {/* Card */}
                                            </div>

                                        ))}


                                </div>
                            </section>

                        </div>

                    </Container>
                    <div className={`${classes.pagination} ${classes.section}`}>
                        <Pagination count={numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
                    </div>
                </div>
            </div>

            <div className={classes.content}>
                <Footer />
            </div>
        </>
    );
}

export default Home;