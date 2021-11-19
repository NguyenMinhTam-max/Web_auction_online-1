import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'; //, Row, Col, Dropdown
import { FcShop } from 'react-icons/fc';

import {
	Typography,
	makeStyles,
	IconButton
} from "@material-ui/core";
import {
	Person,
	ExitToApp
} from "@material-ui/icons";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getHomeCategory } from '../../reducers/homeCategory';
import { authActions as userAuthActions } from "../../reducers/auth";
import { Role } from "../../config/role";
import { CategoryItem } from "../Homepage/CatogoryItem"
import NotifyBidPriceModel from './notify';
import { unauthorizedProduct as unauProduct } from "../../reducers/unauthorizedProduct";

const useStyles = makeStyles((theme) => ({
	root: {},
	eventsNav: {

	},
	toolBar: {
		width: "100%",
		[theme.breakpoints.down("xs")]: {
			paddingLeft: theme.spacing(1),
			paddingRight: theme.spacing(1),
		},
	},
	logo: {
		flex: 1,
		display: "flex",
		alignItems: "center",
	},
	menuButton: {
		display: "none",
		[theme.breakpoints.down("sm")]: {
			display: "block",
		},
	},
	fromTablet: {
		display: "block",
		[theme.breakpoints.down("xs")]: {
			display: "none",
		},
	},
	mobileOnly: {
		display: "none",
		[theme.breakpoints.down("xs")]: {
			display: "block",
		},
	},

	home: {
		color: "inherit",
		textDecoration: "none",
		display: "flex",
		alignItems: "center",
		paddingLeft: ({ showMenu }) => (showMenu ? 0 : theme.spacing(1)),
		"& img": {
			width: 24,
			marginRight: 10,
			height: "auto",
			maxHeight: "100%",
			[theme.breakpoints.down("sm")]: {
				display: "none",
			},
		},
		"&>h2": {
			[theme.breakpoints.down("sm")]: {
				fontSize: "1rem",
			},
		},
	},
	sectionDesktop: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
	},
	search: {
		flex: 3,
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},

	navLink: {
		color: "inherit",
	},
	iconButton: {
		position: "relative",
		[theme.breakpoints.down("sm")]: {
			padding: "5px",
		},
		"&:hover $iconButtonCaption": {
			opacity: 1,
		},
	},
	iconButtonCaption: {
		position: "absolute",
		bottom: -theme.spacing(1.25),
		left: "50%",
		transform: "translate(-50%, 100%)",
		whiteSpace: "nowrap",
		color: "#333",
		padding: "0px 2px",
		background: theme.palette.common.white,
		borderRadius: theme.shape.borderRadius,
		opacity: 0,
		transition: "opacity .3s",
		pointerEvents: "none",
		boxShadow: "0px 1px 3px rgba(0,0,0,.3)",
	},
	dropDown: {
		position: "absolute",
		bottom: -theme.spacing(1.25),
		right: -5,
		transform: "translateY(100%)",
		color: "#333",
		padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
		background: theme.palette.common.white,
		borderRadius: theme.shape.borderRadius,
		opacity: 0,
		pointerEvents: "none",
		transition: "opacity .3s",
		boxShadow: "0px 1px 3px rgba(0,0,0,.3)",
		minWidth: "max-content",
		listStyle: "none",
		"& li:not(:last-child)": {
			display: "block",
			marginBottom: theme.spacing(1),
		},
		"& a": {
			fontSize: theme.typography.fontSize,
			textAlign: "left",
			display: "block",
			textDecoration: "none",
			color: "#333",
			"&:hover": {
				textDecoration: "underline",
			},
		},
	},
	dropDownActive: {
		opacity: 1,
		pointerEvents: "all",
	},
	selectLanguage: {
		color: "#fff",
		margin: "0 12px",
		"& svg": {
			color: "#fff",
		},
		"&:before": {
			border: "none !important",
		},
	},
	bump: {
		animation: "$bump 300ms ease-out",
	},
	"@keyframes bump": {
		"0%": {
			transform: "scale(1)",
		},
		"10%": {
			transform: "scale(0.9)",
		},
		"30%": {
			transform: "scale(1.1)",
		},
		"500%": {
			transform: "scale(1.15)",
		},
		"100%": {
			transform: "scale(1)",
		},
	},
}));
function Header({ showMenu }) {
	const classes = useStyles({ showMenu });
	const dispatch = useDispatch();
	const history = useHistory();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	//state : all data in local store
	//state.homeCategory : data from homeCategory reducer
	//state.homeCategory.data: data from data variable of homeCategory reducer
	const homeCatData = useSelector((state) => state.homeCategory.data)// get data from local store, can get at all pages, 
	const SocketInNotify = useSelector((state) => state.unauthorizedProduct.SocketInNotify);
	const [openModalNotify, setOpenModalNotify] = useState(false);//initialize data for local variable of this page
	const [searchKey, setSearchKey] = useState('');


	const logoutHandler = () => {
		dispatch(userAuthActions.logout());//dispatch is used to call function from reducer
		history.push("/login");
	};

	useEffect(() => {//UseEffect is the function when data this function monitor has been changed, it will be called again
		if (SocketInNotify !== 0) {
			setOpenModalNotify(true);
			dispatch(unauProduct.ResetSocketInNotify());
		}
	}, [SocketInNotify]);

	const handleCloseModelBidProduct = () => {
		setOpenModalNotify(false);
	};

	//define a handler function
	const getListCategoryHandler = useCallback(async () => {
		try {
			await dispatch(getHomeCategory()).unwrap();//dispatch's used to call a function inside reducer
		} catch (err) {
			alert(err);
		}
	}, [dispatch]);

	//searching
	const searchSubmitHandler = async (e) => {
		e.preventDefault();//prevent submit
		if (searchKey.trim().length == '0') {
			alert('Từ khóa tìm kiếm không được phép rỗng!');
			return;
		}
		//redirect to new page
		// const location = {
		// 	pathname: `/search?q=${searchKey}`,
		// 	state: { searchKeyWord: searchKey },
		// };
		
		history.push(`/search?searchKeyWord=${searchKey}`);
		return true;
	};

	const searchKeyChangeHandler = (e) => {
		/*
		e.target mean get current target that use this event
		we can print console.log(e), console.log(e.target) to learn more
		*/
		setSearchKey(e.target.value)//this is the way to get value in change handler
	};



	//useEffect run automatically, when data's changed, function define below it will be loaded again
	useEffect(() => {
		//in order to run handler function, we need to put it inside useEffect
		getListCategoryHandler();
		
	}, [getListCategoryHandler]);//followed value, when data's changed, this function defined here will be called again

	const domain = window.location.origin;
	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
				<Container>
					<Navbar.Brand href="/">
						<FcShop className="iconhome" /> Auction Online</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<NavDropdown title="Chuyên mục" id="collasible-nav-dropdown" menuVariant="dark">
								{homeCatData.paginationlist?.length > 0 &&		//want to use function of react, need to add "?"
									homeCatData.paginationlist.map((cat, index) => (
										<CategoryItem
											key={index}
											id={cat.cateId}
											title={cat.cateName}
											items={cat.subCategories} //pass data between 2 components
										/>
									))}

							</NavDropdown>
						</Nav>
						<Form className="d-flex"  >
							<FormControl
								type="search"
								placeholder="Search"
								className="mr-2"
								aria-label="Search"
								onChange={searchKeyChangeHandler}
							/>
							<Button
								variant="dark"
								type="submit"
								onClick={searchSubmitHandler}
							>
								Search
							</Button>
						</Form>
						<Nav>
							<NavDropdown title={<div style={{ display: "inline-block" }}><Person style={{ color: 'white' }} /></div>} id="collasible-nav-dropdown-2">
								{user != null && isAuthenticated && (
									<>
										<NavDropdown.Item href={domain + '/profile'} >Trang cá nhân</NavDropdown.Item>
										{(user.role === Role.Seller) && (
											<NavDropdown.Item href={domain + '/product-mgt'} >Quản lý sản phẩm</NavDropdown.Item>
										)}
										{(user.role === Role.Seller)  &&(
											<NavDropdown.Item href={domain + '/product-mgt-end'} >Quản lý sản phẩm kết thúc</NavDropdown.Item>
										)}
									</>
								)}
								{(user == null || !isAuthenticated) && (
									<NavDropdown.Item href={domain + '/login'} >Đăng nhập</NavDropdown.Item>
								)}
							</NavDropdown>
							{user != null && isAuthenticated && (
								<IconButton
									aria-label="My profile"
									color="inherit"
									className={classes.iconButton}
									onClick={logoutHandler}
								>
									<ExitToApp style={{ color: 'white' }} />
									<Typography
										variant="caption"
										className={classes.iconButtonCaption}
									>
										Đăng xuất
									</Typography>
								</IconButton>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<NotifyBidPriceModel
				isOpen={openModalNotify}
				onClose={handleCloseModelBidProduct}
				text="Có người đấu giá"
			/>
		</>
	);
}

export default Header;