import { makeStyles } from '@material-ui/core';
import React from 'react';

const pushCommentHandler = async () => {
  setError('');

  const enteredProdName = prodNameRef.current.value;
  const enteredProdCategoryId = prodCategoryIdRef.current.value;
  const enteredProdPriceStarting = prodPriceStartingRef.current.value;
  const enteredProdPriceStep = prodPriceStepRef.current.value;
  const enteredProdEndDate = prodEndDateRef.current.value;
  let formData = new FormData();

  if (
    enteredProdName?.length > 0 &&
    enteredProdCategoryId?.length > 0 &&
    enteredProdPriceStarting?.length > 0 &&
    enteredProdPriceStep?.length > 0 &&
    enteredProdEndDate?.length > 0
  ) {
    setSubmitIsValid(true);
  } else {
    setSubmitIsValid(false);
    return;
  }

  formData.append('prodName', enteredProdName);
  formData.append('prodCategoryId', enteredProdCategoryId);
  formData.append('prodPriceStarting', enteredProdPriceStarting);

  try {
    await dispatch(postAuctionComment(formData)).unwrap();
  } catch (err) {
    setError(err);
  }
};

const useStyles = makeStyles((theme) => ({
    description: {
      display: '-webkit-box',
      '-webkit-line-clamp': ({ size }) => (size === 'small' ? 2 : 4),
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: ({ size }) => (size === 'small' ? 13 : 14),
    },
  }));
  
  const ProductComment = ({
    isLike,
    textComment
  }) => {
    const classes = useStyles({ size });
  
    return (
      <form
			noValidate
			autoComplete="off"
			className={classes.form}
			onSubmit={formSubmitHandler}
		>
			<FormControl className={classes.formControl}>
				<TextField
					label={"Bình luận"}
					type="text"
					fullWidth
					size="small"
					variant="standard"
					value={textComment}
				/>
			</FormControl>
      <Checkbox
        label={"Like"}
        value={isLike}
      />
			<Button
				variant="contained"
				color="primary"
				fullWidth
				type="submit"
				//disabled={!formIsValid}
        onClick={() => pushCommentHandler()}
			>
				{t("Thêm bình luận")}
			</Button>
		</form>
    );
  };
  export default ProductComment;