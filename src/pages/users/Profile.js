


import {
	Box,
	Container,
	makeStyles,
	Paper,
	Tab,
	Tabs,
	Card,
	CardHeader,
	CardContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import BasicProfilePanel from "../../components/Panels/BasicProfilePanel";
import SellerProfilePanel from "../../components/UserInfomation/SellerProfilePanel";
import AllList from "../../components/Panels/AllList";
import ChangePasswordPanel from "../../components/Panels/ChangePasswordPanel";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import { Role } from '../../config/role';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100vh',
		maxHeight: '-webkit-fill-available',
	},
	tabPanel: {
		background: "#fff",
	},
	tabs: {
		borderBottom: "1px solid #ddd",
	},
	tabActive: {
		background: theme.palette.primary.main,
	},
	label: {
		color: "#fff",
	},
	boxstyle:{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	carheader:{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
    	fontfamily: "Roboto",
	},
	carcontent:{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
    	fontfamily: "Roboto",
	},
}));

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
};

const Profile = (props) => {
	const history = useHistory();
	let { slug } = useParams();
	const classes = useStyles();
	const [tabValue, setTabValue] = useState(0);
	const [hiddenList, setHiddenList] = useState(false);
	const user = useSelector((state) => state.auth.user);

	const indexToTabName = {
		0: "basic",
		1: "password",
		2: "list",
	};
	const tabChangeHandler = (event, newValue) => {
		history.push(`/profile/${indexToTabName[newValue]}`);
		setTabValue(newValue);
	};

	useEffect(() => {
		// if(user.role === Role.Seller){
		// 	setHiddenList(true);
		// }
		const tabNameToIndex = {
			basic: 0,
			password: 1,
			list: 2,
		};
		setTabValue(tabNameToIndex[slug || "basic"]);
	}, [slug]);

	useEffect(() => {
		document.title = "Thông tin cá nhân"
	});

	const cardBidder = (
		<React.Fragment>
			<CardHeader
				className={classes.carheader}
				justifyContent="center" 
				alignItems="center"
				title='Bidder Infomation'
				variant="body2"
			/>
		  <CardContent 
				className={classes.carcontent}>
		  	<BasicProfilePanel />
		  </CardContent>
		</React.Fragment>
	  );
	const cardSeller = (
		<React.Fragment>
			<CardHeader
				className={classes.carheader}
				justifyContent="center" 
				alignItems="center"
				title='Seller Infomation'
				variant="body2"
			/>
		  <CardContent
				className={classes.carcontent}>
		  	<SellerProfilePanel />
		  </CardContent>
		</React.Fragment>
	  );

	return (
		<>
			<div className={classes.root}>
				<Header showCart />
				<Container>
					<Paper>
						<Tabs
							indicatorColor="primary"
							value={tabValue}
							onChange={tabChangeHandler}
							variant="fullWidth"
							className={classes.tabs}
							TabIndicatorProps={{ className: classes.tabActive }}
						>
							<Tab label="Hồ sơ cá nhân" />
							<Tab label="ĐỔI MẬT KHẨU" />
							<Tab hidden={hiddenList} label="Danh sách" />
						</Tabs>
					</Paper>
					<TabPanel
						value={tabValue}
						index={0}
						className={classes.tabPanel}
					>
						<Box className={classes.boxstyle}
							sx={{ typography: 'body2', }}>
      						<Card variant="outlined">{cardBidder}</Card>
    					</Box>
						{user != null && user.role === Role.Seller && (
						<Box className={classes.boxstyle}
							sx={{ typography: 'body2' }}>
      						<Card variant="outlined">{cardSeller}</Card>
    					</Box>
						)}
						{/* <BasicProfilePanel /> */}
					</TabPanel>
					<TabPanel
						value={tabValue}
						index={1}
						className={classes.tabPanel}
					>
						<ChangePasswordPanel />
					</TabPanel>
					<TabPanel
						value={tabValue}
						index={2}
						className={classes.tabPanel}
					>
						<AllList />
					</TabPanel>
				</Container>
			</div>
			<Footer />
		</>
	);
};

export default Profile;