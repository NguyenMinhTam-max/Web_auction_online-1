import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FcShop } from 'react-icons/fc';

import {
	Typography,
	makeStyles,
	IconButton,
} from "@material-ui/core";
import {
	Person,
	ExitToApp
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authActions as userAuthActions } from "../../reducers/auth";
import { Role } from "../../config/role";
import NotifyBidPriceModel from './notify';
import { unauthorizedProduct as unauProduct } from "../../reducers/unauthorizedProduct";

const useStyles = makeStyles((theme) => ({
	root: {},
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

	const [toggleUserDropdown, setToggleUserDropdown] = useState(false);
	const [openModalNotify, setOpenModalNotify] = useState(false);
	const SocketInNotify = useSelector((state) => state.unauthorizedProduct.SocketInNotify);


	useEffect(() => {
		if (SocketInNotify !== 0) {
			setOpenModalNotify(true);
			dispatch(unauProduct.ResetSocketInNotify());
		}
	}, [SocketInNotify]);

	const handleCloseModelBidProduct = () => {
		setOpenModalNotify(false);
	};
	const toggleUserDropdownHandler = () => {
		setToggleUserDropdown((prevState) => !prevState);
	};

	const logoutHandler = () => {
		dispatch(userAuthActions.logout());
		history.push("/login");
	};
	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
				<Container>
					<Navbar.Brand href="/">
						<FcShop className="iconhome" /> Auction Online</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto" disabled>
							{/* <Nav.Link href="#features">Features</Nav.Link> */}
							<NavDropdown title="Điện tử" id="collasible-nav-dropdown" hidden>
								<NavDropdown.Item href="#action/3.1">Điện thoại</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.1">Máy tính</NavDropdown.Item>
								{/* <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
							</NavDropdown>
							<NavDropdown title="Bếp" id="collasible-nav-dropdown" hidden>
								<NavDropdown.Item href="#action/3.1">Chảo chống dính</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.1">Nồi inox</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Form className="d-flex">
							<FormControl
								type="search"
								placeholder="Tìm kiếm"
								className="mr-2"
								aria-label="Search"
								hidden
							/>
							<Button variant="dark" hidden>Tìm kiếm</Button>
						</Form>
						<Nav>
							<IconButton
								aria-label="My profile"
								color="inherit"
								className={classes.iconButton}
								onClick={toggleUserDropdownHandler}
							>
								<Person />
								<ul
									className={`${classes.dropDown} ${toggleUserDropdown ? classes.dropDownActive : ""
										}`}
								>
									{user != null && isAuthenticated && (
										<>
											<li>
												<Link to="/profile">Trang cá nhân</Link>
											</li>
											{(user.role === Role.Seller) && (
												<li>
													<Link to="/product-mgt">Quản lý sản phẩm</Link>
												</li>
											)}
										</>
									)}
									{(user == null || !isAuthenticated) && (
										<li>
											<Link to="/login">Đăng nhập</Link>
										</li>
									)}
								</ul>
							</IconButton>
							{user != null && isAuthenticated && (
								<IconButton
									aria-label="My profile"
									color="inherit"
									className={classes.iconButton}
									onClick={logoutHandler}
								>
									<ExitToApp />
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