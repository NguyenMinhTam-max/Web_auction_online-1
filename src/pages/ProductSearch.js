/*
Using Redirect:
if (!id || user?.accStatus === 0) {
    return <Redirect to="/" />;
  }
using useHistory & useLocation: refer to header search & this page or register & account activation
*/
import {useLocation} from 'react-router-dom';//the function in library support to redirect
import ProductInfoCard from '../components/ProductCard/ProductInfoCard';
import {Card} from 'react-bootstrap';
import Pagination from '@material-ui/lab/Pagination';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import {listProductSearch} from '../reducers/unauthorizedProduct';
import {useState, useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {mainColor} from '../utils';
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
    const location = useLocation();
    const dispatch = useDispatch();
    const sortKey = "";
    const searchKeyWord = location.search.slice(15);//get search keyword
    const [searchProductInfo, setSearchProductInfo] = useState({});
    const [error, setError] = useState('');
    let {listProduct, numberProduct, numberOfPage} = searchProductInfo;//object destructuring from productInfo
    const [page, setPage] = useState(1);
    const getListProductSearchHandler = useCallback(
        async (page = 1, searchKey) => {
            try {
                //default search page info
                const limit = 10;
                const filterField = 'prod_created_date';//sort by created date
                const AndOrCondition = 'or';//get product with name = searchKey or category name = searchKey
                const orderBy = 'desc'
                const response = await dispatch(listProductSearch({
                    searchKey,
                    limit,
                    page,
                    orderBy,
                    filterField,
                    AndOrCondition
                })).unwrap();


                setSearchProductInfo(response);
            } catch (error) {
                setError(error);
            }
        },
        [dispatch]
    );
    const [data, setData] = useState(listProduct);
    const [sortType, setSortType] = useState('price');

    const pageChangeHandler = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const sortArray = type => {
            const types = {
                price: 'prod_price',
                price2: 'prod_price desc',
                time: 'prod_end_date',
                time2: 'prod_end_date desc',
            };
            const sortProperty = types[type];
            if (data) {
                const sorted = data.sort((a, b) => {
                    // if (a.prod_price > b.prod_price) {
                    //     return 1;
                    // }
                    // else if (a.prod_price < b.prod_price) {
                    //     return -1;
                    // }
                    // else if (a.prod_price < b.prod_price) {
                    //     return 1;
                    // }
                    // else {
                    //     return -1;
                    // }
                    if (sortProperty == types.time) {
                        console.log("sortProperty == types.time");
                        return -1 * a.prod_end_date.localeCompare(b.prod_end_date);
                    } else if (sortProperty == types.time2) {
                        console.log("sortProperty == types.timedesc");
                        return 1 * a.prod_end_date.localeCompare(b.prod_end_date);
                    } else if (sortProperty == types.price) {
                        console.log("sortProperty == types.price");
                        return -1 * a.prod_price_current.localeCompare(b.prod_price_current);
                    } else {
                        return 1 * a.prod_price_current.localeCompare(b.prod_price_current);
                    }

                    // if (sortProperty == types.time && a.prod_end_date > b.prod_end_date) {
                    //     return a;
                    // }
                    // else if(sortProperty == types.timedesc)
                    // {
                    //     return a.prod_end_date < b.prod_end_date;
                    // }
                    // else if(sortProperty == types.price && a.prod_price > b.prod_price)
                    // {
                    //     return a;
                    // }
                    // else
                    // {
                    //     return b;
                    // }
                });
                //console.log(sortProperty == types.time);
                setData(sorted);
            }
        };

        sortArray(sortType);
    }, [sortType]);

    useEffect(() => {
        document.title = 'Tìm kiếm sản phẩm';
        setData(listProduct);
    }, [searchProductInfo]);

    useEffect(() => {
        getListProductSearchHandler(page, searchKeyWord)
    }, [dispatch, getListProductSearchHandler, page, searchKeyWord]);//when page change, get the new list

    return (
        <>
            <div className={classes.root}>
                <Header/>
                <div className={classes.content}>
                    <Container>
                        <div className="container">
                            <h2><p>Từ khóa tìm kiếm : {searchKeyWord}</p></h2>
                            {/* Sort item in grid */}
                            <select id="sortList" onChange={(e) => setSortType(e.target.value)}>
                                <option value="price">Giá tăng dần</option>
                                <option value="price2">Giá giảm dần</option>
                                <option value="time">Thời gian kết thúc tăng dần</option>
                                <option value="time2">Thời gian kết thúc giảm dần</option>
                            </select>
                            <section className="text-center mt-5">
                                {/* Grid row */}
                                <div className="row justify-content-center flex-fill">
                                    {data?.length > 0 &&
                                    data.map((prod, index) => (
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
                                                        createdDate={prod.prod_created_date}
                                                        priceHolder={prod.prod_price_holder}

                                                    />
                                                </Card.Body>

                                            </Card>
                                            {/* Card */}
                                        </div>

                                    ))}

                                    <h3>{data?.length == 0 ? 'Không có kết quả' : ''}</h3>
                                </div>
                            </section>

                        </div>

                    </Container>
                    <div className={`${classes.pagination} ${classes.section}`}>
                        <Pagination count={numberOfPage} color="primary" variant="outlined" shape="rounded" page={page}
                                    onChange={pageChangeHandler}/>
                    </div>
                </div>
            </div>

            <div className={classes.content}>
                <Footer/>
            </div>
        </>
    );
}

export default Home;