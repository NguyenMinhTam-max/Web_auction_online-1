//Component
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductCard from '../components/ProductCard/ProductCard';
//Library
import { mainColor } from '../utils';
import {
  Container,
  makeStyles,
} from '@material-ui/core';
import { Card, Row, Col, Alert, Carousel } from 'react-bootstrap';
import { FcAlarmClock, FcDebt, FcCurrencyExchange } from 'react-icons/fc';
import '../index.css';
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductAboutToEnd, listProductHighestPrice, listProductHighestBid } from '../reducers/unauthorizedProduct';
import { Link, useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    maxHeight: '-webkit-fill-available',
  },
  content: {
    padding: '5vh 0',
  },
}));

function Home() {
  const classes = useStyles()
  const dispatch = useDispatch();
  const [productAboutToEnd, setProductAboutToEnd] = useState({});//{} is the initial value
  const [productHighestPrice, setProductHighestPrice] = useState({});//{} is the initial value
  const [productHighestBids, setProductHighestBids] = useState({});//{} is the initial value

  const getHomePageProductHandler = useCallback(async () => {
    try {
      //use reducer function to get data and put it into local store
      const responseAboutToEnd = await dispatch(listProductAboutToEnd()).unwrap();
      const responseHighestPrice = await dispatch(listProductHighestPrice()).unwrap();
      const responseHighestBids = await dispatch(listProductHighestBid()).unwrap();
      setProductAboutToEnd(responseAboutToEnd.productAboutToEndList);//set new state for productAboutToEnd with the returned data from BE when user change value
      setProductHighestPrice(responseHighestPrice.productHighestPriceList);//set new state for productHighestPrice with the returned data from BE when user change value
      setProductHighestBids(responseHighestBids.productHighestBidList);//set new state for productHighestBids with the returned data from BE when user change value
    } catch (err) {
      alert(err);
    }
  }, [dispatch]);

  useEffect(() => {//this function always run first
    getHomePageProductHandler();
  }, [getHomePageProductHandler]);//followed value, when data's changed, this function defined here will be called again

  return (
    <>

      <div className={classes.root}>
        <Header />
        <div className={classes.content}>
          <Container bg="primary">

            <div className="container">
              <div style={{ backgroundColor: '#e8e4da' }} className="mb-3">
                <Carousel className="center">
                  {productAboutToEnd?.length > 0 &&		//want to use function of react, need to add "?"
                    productAboutToEnd.map((prod, index) => (
                      <Carousel.Item>
                        <img
                          className="d-block w-100 photo"
                          src={prod.prod_main_image || 'https://giaoducthuydien.vn/wp-content/themes/consultix/images/no-image-found-360x250.png'}
                          alt="Third slide"
                        />
                        <Carousel.Caption >
                          <Link to={`/details/${prod.prod_id}`} style={{ textDecoration: "none", color: "white" }}>
                            <h3>{prod.prod_name}</h3>
                            <p>Loại sản phẩm: <strong>{prod.cate_name}</strong></p>
                            <p style={{ color: "light" }}>Ngày hết hạn: <strong>{prod.prod_end_date}</strong> </p>
                            <p style={{ color: "light" }}>Giá hiện tại: <strong>{prod.prod_price_current == null ? 'Chưa có thông tin' : prod.prod_price_current + 'VNĐ'} </strong> </p>
                          </Link>
                        </Carousel.Caption>
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>




              <Row xs={1} md={2} className="g-2">
                <Col>
                  <Alert variant="success" style={{ marginBlock: "-3px" }}><FcDebt className="iconaler" /> 5 sản phẩm có nhiều lượt ra giá nhất!</Alert>
                  <div style={{ backgroundColor: '#e8e4da' }} className="p-3">
                    {productHighestPrice?.length > 0 &&		//want to use function of react, need to add "?"
                      productHighestPrice.map((prod, index) => (
                        <Card className="mt-2" style={{ backgroundColor: '#e8e4da', border: "0" }} key={index}>
                          <Card.Body>
                            <ProductCard
                              id={prod.prod_id}
                              title={prod.prod_name}
                              description={prod.prod_description}
                              image={prod.prod_main_image}
                              price={prod.prod_price}
                              endDate = {prod.prod_end_date}
                              currentPrice = {prod.prod_price_current}
                              catName = {prod.cate_name}
                            />
                          </Card.Body>
                        </Card>
                      ))}
                  </div>
                </Col>
                <Col >
                  <Alert variant="primary" style={{ marginBlock: "-2px" }}><FcCurrencyExchange className="iconaler" /> 5 sản phẩm có giá cao nhất!</Alert>
                  <div style={{ backgroundColor: '#e8e4da' }} className="p-3">
                    {productHighestBids?.length > 0 &&		//want to use function of react, need to add "?"
                      productHighestBids.map((prod, index) => (

                        <Card className="mt-2" style={{ backgroundColor: '#e8e4da', border: "0" }} key={index*2}>
                          <Card.Body>
                          <ProductCard
                              id={prod.prod_id}
                              title={prod.prod_name}
                              description={prod.prod_description}
                              image={prod.prod_main_image}
                              price={prod.prod_price}
                              endDate = {prod.prod_end_date}
                              currentPrice = {prod.prod_price_current}
                              catName = {prod.cate_name}
                            />
                          </Card.Body>
                        </Card>

                      ))}
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
      <div className={classes.content}>
        <Footer />
      </div>
    </>
  );
}

export default Home;