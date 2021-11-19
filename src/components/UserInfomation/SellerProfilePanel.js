import {
	makeStyles,
	Box,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import React, { useCallback, useEffect, useState } from 'react';
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { getProfile } from '../../reducers/users/seller';
import { toast } from 'react-toastify';
import { uiActions } from '../../reducers/ui';

const useStyles = makeStyles((theme) => ({
	root: {
		width: "30rem",
		background: "#fff",
		maxWidth: "100%",
		margin: "0 auto",
		padding: "20px 25px",
		[theme.breakpoints.down("xs")]: {
			padding: "35px 15px",
		},
	  },
}));

const SellerProfilePanel = () => {
	const { t } = useTranslation();
	const classes = useStyles();
	const [sellerInfo, setSellerInfo] = useState({});
	const dispatch = useDispatch();

	const sellerProfileHandler = useCallback(async () => {
		try {
			return await dispatch(getProfile()).unwrap();
		} catch (err) {
			toast.error(err);
		}
	}, [dispatch]);
	
	useEffect(() => {
		dispatch(uiActions.hideModal());
		sellerProfileHandler().then((result) => { setSellerInfo(result) });
	  }, [dispatch, sellerProfileHandler]);

	return (
		<div className={classes.root}>
			<Box sx={{ 
          		display: 'flex',
          		flexWrap: 'wrap',
				p: 1,
			}}>
				<Box sx={{ minWidth: 150 }}>{t('sellerProfile.expUpgrade')}</Box>
				<Box sx={{ }}>{sellerInfo?.accExpUpgrade || 'None'}</Box>
			</Box>
			<Box sx={{ 
          		display: 'flex',
          		flexWrap: 'wrap', 
				p: 1,
			}}>
				<Box sx={{ minWidth: 150  }}>{t('sellerProfile.likeSeller')}</Box>
				<Box sx={{ }}>{sellerInfo?.accLikeSeller || 0}</Box>
			</Box>
			<Box sx={{ 
          		display: 'flex',
          		flexWrap: 'wrap',
				p: 1,
			}}>
				<Box sx={{ minWidth: 150  }}>{t('sellerProfile.dislikeSeller')}</Box>
				<Box sx={{ }}>{sellerInfo?.accDisLikeSeller || 0}</Box>
			</Box>
	  	</div>
	);
};
export default SellerProfilePanel;
