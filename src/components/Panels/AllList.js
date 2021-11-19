import { makeStyles } from "@material-ui/core";
import { Modal, Container, Button, Tabs, Tab, Table, Alert, DropdownButton, Dropdown } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistory } from '../../reducers/historyBid';
import { getListFavoriteProducts, getListJoiningProducts, getListHighestPriceProducts, deleteProductInWatchLists, getListComments } from '../../reducers/users/profile';
import Pagination from '@material-ui/lab/Pagination';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../../index.css';
import NumberFormat from 'react-number-format';
import CommentModel from './Comment';

const useStyles = makeStyles((theme) => ({
	root: {
		width: "30rem",
		background: "#fff",
		maxWidth: "100%",
		margin: "0 auto",
		padding: "50px 25px",
		[theme.breakpoints.down("xs")]: {
			padding: "35px 15px",
		},
	},
	top: {
		width: 200,
		margin: "0 auto 30px",
	},
	image: {
		width: "100%",
		position: "relative",
		paddingTop: "calc((3/4)*100%)",
		marginBottom: 10,
		"& img": {
			position: "absolute",
			top: 0,
			width: "100%",
			height: "100%",
		},
	},
	section: {
		borderRadius: theme.shape.borderRadius,
		background: 'white',
		boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
		padding: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	pagination: {
		'& > *': {
			justifyContent: 'center',
			display: 'flex',
		},
	}
}));
const AllList = () => {
	const classes = useStyles();
	var [page, setPage] = useState(1);
	var limit = 5;
	var prodId = 2
	const [status, setStatus] = useState(0);
	const data = useSelector((state) => state.history.data);
	const dataFavorite = useSelector((state) => state.profile.dataFavorite);
	const dataJoiningProduct = useSelector((state) => state.profile.dataJoiningProduct);
	const dataHighestPriceProduct = useSelector((state) => state.profile.dataHighestPriceProduct);
	const dataComment = useSelector((state) => state.profile.dataComment);
	const dispatch = useDispatch();
	const [keys, setKeys] = useState('bid');
	const [showFailed, setShowFailed] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [text, setText] = useState('');
	const [sortByPrice, setSortByPrice] = useState('NON');
	const [isActiveSort1, setIsActiveSort1] = useState(false);
	const [isActiveSort2, setIsActiveSort2] = useState(false);
	const [isActiveSort3, setIsActiveSort3] = useState(false);
	const [hiddenText, setHiddenText] = useState(false);
	const [hiddenText2, setHiddenText2] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [openModalComment, setOpenModalComment] = useState(false);
	const [productId, setProductId] = useState(0);
	const [statusRating, setStatusRating] = useState(0);
	const user = useSelector((state) => state.auth.user);//get current user role here
	console.log(user)

	const pageChangeHandler = (event, value) => {
		setPage(value);
	};

	const getListHistoryHandler = useCallback(async ({ page, limit, prodId, status, sortByPrice }) => {
		try {
			var result = await dispatch(getListHistory({ page, limit, prodId, status, sortByPrice })).unwrap();

			if (result.statusCode === 3) {
				setHiddenText(true);
			}
			else if (result.statusCode === 4) {
				setHiddenText2(true);
				setHiddenText(true);
			}
		} catch (err) {
			alert(err);
		}
	}, [dispatch]);

	const getListFavoriteHandler = useCallback(async ({ page, limit}) => {
		try {
			var result = await dispatch(getListFavoriteProducts({ page, limit})).unwrap();

		} catch (err) {
			alert(err);
		}
	}, [dispatch]);

	const getListJoiningProductHandler = useCallback(async ({ page, limit}) => {
		try {
			var result = await dispatch(getListJoiningProducts({ page, limit})).unwrap();

		} catch (err) {
			alert(err);
		}
	}, [dispatch]);

	const getListHighestPriceProductsHandler = useCallback(async ({ page, limit}) => {
		try {
			var result = await dispatch(getListHighestPriceProducts({ page, limit})).unwrap();

		} catch (err) {
			alert(err);
		}
	}, [dispatch]);

	const getListCommentsHandler = useCallback(async ({ page, limit}) => {
		try {
			var result = await dispatch(getListComments({ page, limit})).unwrap();

		} catch (err) {
			alert(err);
		}
	}, [dispatch]);

	const deleteProductInWatchListHandler = useCallback(async ({ id}) => {
		try {
			var result = await dispatch(deleteProductInWatchLists({ id})).unwrap();
			getListFavoriteHandler({page, limit});
			setText("Xóa sản phẩm yêu thích thành công");
			setShowSuccess(true);
		} catch (err) {
			setText(err);
			setShowFailed(true);
		}
	}, [dispatch]);

	const handleSelectSort = (event, eventKey) => {
		if (Number(event) === 1) {
			setSortByPrice('ASC');
			setIsActiveSort1(true);
			setIsActiveSort2(false);
			setIsActiveSort3(false);
		}
		else if (Number(event) === 2) {
			setSortByPrice('DESC');
			setIsActiveSort1(false);
			setIsActiveSort2(true);
			setIsActiveSort3(false);
		}
		else {
			setSortByPrice('NON');
			setIsActiveSort1(false);
			setIsActiveSort2(false);
			setIsActiveSort3(true);
		}
	}

	const handleCloseBid = () => {
        setOpenModalComment(false);
    };

    const openModalHandlerBid = (prod_id, statusRating) => {
		setProductId(prod_id);
		setStatusRating(statusRating);
        setOpenModalComment(true);
    };

	useEffect(() => {
		if (prodId !== undefined && isAuthenticated) {
			getListHistoryHandler({ page, limit, prodId, status, sortByPrice });
		}
		getListFavoriteHandler({page, limit});
		getListJoiningProductHandler({page, limit});
		getListHighestPriceProductsHandler({page, limit});
		getListCommentsHandler({page, limit});

	}, [getListHistoryHandler, page, limit, prodId, status, sortByPrice, keys]);

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
	return (
		<div>
			<Container>
				<CommentModel
					isOpen={openModalComment}
					onClose={handleCloseBid}
					prod_id={productId}
					statusS={statusRating}
				/>
				<Alert variant="danger" show={showFailed} onClose={() => setShowFailed(false)} dismissible>
					<Alert.Heading>{text}</Alert.Heading>
				</Alert>
				<Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
					<Alert.Heading>{text}</Alert.Heading>
				</Alert>
				<DropdownButton
					id={`dropdown-variants-primary`}
					variant={"outline-primary"}
					title={"Sắp xếp"}
					size="sm"
					onSelect={handleSelectSort}
					style={{ marginLeft: '90%', marginBottom: '-4%', marginTop: '3%' }}
					hidden={true}
				>
					<Dropdown.Item eventKey="1" active={isActiveSort1}>Giá tăng dần</Dropdown.Item>
					<Dropdown.Item eventKey="2" active={isActiveSort2}>Giá giảm dần</Dropdown.Item>
					<Dropdown.Item eventKey="3" active={isActiveSort3}>Mặt định</Dropdown.Item>
				</DropdownButton>
				<Tabs id="controlled-tab-example"
					activeKey={keys}
					onSelect={(k) => setKeys(k)}
					className="mb-2">
					<Tab eventKey="watchList" title="Danh sách yêu thích">
						<div>
							<Table responsive="sm">
								<thead>
									<tr style={{ backgroundColor: "lightblue"}}>
										<th>#</th>
										<th>Tên</th>
										<th>Giá mua ngay</th>
										<th>Giá bắt đầu</th>
										<th>Giá hiện tại</th>
										<th>Ngày đăng bán</th>
										<th>Thao tác</th>
									</tr>
								</thead>
								<tbody>
									{dataFavorite.watchList?.length > 0 &&
										dataFavorite.watchList.map((row, index) => (
											<tr key={index}>
												<td>{index + 1 + ((page - 1) * limit)}</td>
												<td><Link to={`/details/${row.prod_id}`} className={classes.link}>{row.prod_name}</Link></td>
												<td>
													<NumberFormat
														value={row.prod_price}
														variant="standard"
														thousandSeparator={true}
														suffix={' VND'}
														displayType={'text'}
													/>
												</td>
												<td>
													<NumberFormat
														value={row.prod_price_starting}
														variant="standard"
														thousandSeparator={true}
														suffix={' VND'}
														displayType={'text'}
													/>
												</td>
												<td>
													<NumberFormat
														value={row.prod_price_current}
														variant="standard"
														thousandSeparator={true}
														suffix={' VND'}
														displayType={'text'}
													/>
												</td>
												<td>{row.prod_created_date}</td>
												<td>
													<Button size="sm" variant="danger" onClick={()=>{deleteProductInWatchListHandler({ id: row.fav_id })}}><BsXLg /> Xóa</Button>
												</td>
											</tr>
										))}
								</tbody>
							</Table>
						</div>
						<div className={`${classes.pagination} ${classes.section}`}>
							<Pagination count={dataFavorite.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
						</div>
					</Tab>
					<Tab eventKey="joiningList" title="Danh sách đang đấu giá" >
						<div>
							<Table responsive="sm">
								<thead>
									<tr style={{ backgroundColor: "lightblue"}}>
										<th>#</th>
										<th>Tên sản phẩm</th>
										<th>Người giữ giá</th>
									</tr>
								</thead>
								<tbody>
									{dataJoiningProduct.joiningList?.length > 0 &&
										dataJoiningProduct.joiningList.map((row, index) => (
											<tr key={index * 2}>
												{row.prod_price_holder === user.accId && (
													<td style={{ backgroundColor: "lightgray" }}>{index + 1 + ((page - 1) * limit)}</td>
												)}
												{row.prod_price_holder !== user.accId && (
													<td >{index + 1 + ((page - 1) * limit)}</td>
												)}
												{row.prod_price_holder === user.accId && (
													<td style={{ backgroundColor: "lightgray" }}><Link to={`/details/${row.his_product_id}`} className={classes.link}>{row.prod_name}</Link></td>
												)}
												{row.prod_price_holder !== user.accId && (
													<td><Link to={`/details/${row.his_product_id}`} className={classes.link}>{row.prod_name}</Link></td>
												)}
												{row.prod_price_holder === user.accId && (
													<td style={{ backgroundColor: "lightgray" }}>{row.acc_full_name}</td>
												)}
												{row.prod_price_holder !== user.accId && (
													<td>{row.acc_full_name}</td>
												)}
											</tr>
										))}
								</tbody>
							</Table>
						</div>
						<div className={`${classes.pagination} ${classes.section}`}>
							<Pagination count={dataJoiningProduct.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
						</div>
					</Tab>
					<Tab eventKey="productWin" title="Danh sách đã thắng">
						<div>
							<Table responsive="sm">
								<thead>
									<tr style={{ backgroundColor: "lightblue"}}>
										<th>#</th>
										<th>Tên sản phẩm</th>
										<th>Giá mua ngay</th>
										<th>Giá hiện tại</th>
										<th>Giá bạn thắng</th>
										<th>Ngày kết thúc</th>
										<th>Thao tác</th>
									</tr>
								</thead>
								<tbody>
									{dataHighestPriceProduct.highestPrice?.length > 0 &&
										dataHighestPriceProduct.highestPrice.map((row, index) => (
											<tr key={index * 3}>
												<td>{index + 1 + ((page - 1) * limit)}</td>
												<td><Link to={`/details/${row.prod_id}`} className={classes.link}>{row.prod_name}</Link></td>
												<td>
													<NumberFormat
														value={row.prod_price}
														variant="standard"
														thousandSeparator={true}
														suffix={' VND'}
														displayType={'text'}
													/></td>
												<td>
													<NumberFormat
														value={row.prod_price_current}
														variant="standard"
														thousandSeparator={true}
														suffix={' VND'}
														displayType={'text'}
													/></td>
												<td>
													<NumberFormat
														value={row.prod_price_highest}
														variant="standard"
														thousandSeparator={true}
														suffix={' VND'}
														displayType={'text'}
													/></td>
												<td>{row.prod_end_date}</td>
												<td>
												<Button size="sm" variant="primary" onClick={()=>{openModalHandlerBid(row.prod_id, 0)}}> like</Button>
												<Button size="sm" variant="danger" onClick={()=>{openModalHandlerBid(row.prod_id, 1)}}> dis like</Button>
												</td>
											</tr>
										))}
								</tbody>
							</Table>
						</div>
						<div className={`${classes.pagination} ${classes.section}`}>
							<Pagination count={dataHighestPriceProduct.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
						</div>
					</Tab>
					<Tab eventKey="rating" title="Danh sách đánh giá">
						<div>
							{dataComment.rating?.length > 0 &&
								dataComment.rating.map((row, index) => (
									<tr key={index * 4}>
										<td><p>Số lượt chập nhân: {row.acc_like_bidder}</p><p>Số lượt hủy: {row.acc_dis_like_bidder}</p></td>
									</tr>
								))}
							<Table responsive="sm">
								<thead>
									<tr style={{ backgroundColor: "lightblue"}}>
										<th>#</th>
										<th>Nhận xét</th>
										<th>Người gửi</th>
										<th>Tên sản phẩm</th>
										<th>Loại nhận xét</th>
										<th>Ngày tạo</th>
									</tr>
								</thead>
								<tbody>
									{dataComment.commentList?.length > 0 &&
										dataComment.commentList.map((row, index) => (
											<tr key={index * 4}>
												<td>{index + 1 + ((page - 1) * limit)}</td>
												<td>{row.acom_note}</td>
												<td>{row.acc_full_name}</td>
												<td>{row.prod_name}</td>
												<td>{row.acc_status_rating}</td>
												<td>{row.acom_created_date}</td>
											</tr>
										))}
								</tbody>
							</Table>
						</div>
						<div className={`${classes.pagination} ${classes.section}`}>
							<Pagination count={dataComment.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
						</div>
					</Tab>
				</Tabs>
			</Container>
		</div>
	);
};

export default AllList;
