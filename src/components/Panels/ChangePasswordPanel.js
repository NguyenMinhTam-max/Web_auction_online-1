import { Button, FormControl, FormHelperText, makeStyles, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Validate } from '../../helpers';
import { useInput } from '../../hooks/use-input';
import { accNewPassword } from '../../reducers/users/profile';
const useStyles = makeStyles((theme) => ({
  form: {
    width: '30rem',
    background: '#fff',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '50px 25px',
    [theme.breakpoints.down('xs')]: {
      padding: '35px 15px',
    },
  },
  formControl: {
    display: 'block',
    marginBottom: 15,
  },
  button: {
    '&:disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'all !important',
    },
  },
}));
const ChangePasswordPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const {
    enteredInput: enteredCurrentPassword,
    hasError: currentPasswordHasError,
    inputBlurHandler: currentPasswordBlurHandler,
    inputChangeHandler: currentPasswordChangeHandler,
    inputIsValid: currentPasswordIsValid,
    inputReset: currentPasswordReset,
  } = useInput(Validate.isNotEmpty);
  const {
    enteredInput: enteredNewPassword,
    hasError: newPasswordHasError,
    inputBlurHandler: newPasswordBlurHandler,
    inputChangeHandler: newPasswordChangeHandler,
    inputIsValid: newPasswordIsValid,
    inputReset: newPasswordReset,
  } = useInput(Validate.isNotEmpty);
  const {
    enteredInput: enteredConfirmPassword,
    hasError: confirmPasswordHasError,
    inputBlurHandler: confirmPasswordBlurHandler,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputIsValid: confirmPasswordIsValid,
    inputReset: confirmPasswordReset,
  } = useInput((value) => Validate.isNotEmpty(value) && value === enteredNewPassword);

  const formIsValid = currentPasswordIsValid && confirmPasswordIsValid && newPasswordIsValid;
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) return;

    try {
      const result = await dispatch(
        accNewPassword({
          userId: user.acc_id,
          newpassword: enteredNewPassword,
          oldpassword: enteredCurrentPassword
        })
      ).unwrap();

      setSuccess(result.message);
      setError(null);

      currentPasswordReset();
      newPasswordReset();
      confirmPasswordReset();
    } catch (e) {
      setError(e);
      setSuccess(null);
    }
  };
  return (
    <form noValidate autoComplete="off" className={classes.form} onSubmit={formSubmitHandler}>
      <FormControl className={classes.formControl}>
        <TextField
          error={currentPasswordHasError}
          label="Mật khẩu hiện tại"
          type="password"
          fullWidth
          size="small"
          variant="outlined"
          value={enteredCurrentPassword}
          onChange={currentPasswordChangeHandler}
          onBlur={currentPasswordBlurHandler}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          error={newPasswordHasError}
          label="Mật khẩu mới"
          type="password"
          fullWidth
          size="small"
          variant="outlined"
          value={enteredNewPassword}
          onChange={newPasswordChangeHandler}
          onBlur={newPasswordBlurHandler}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          error={confirmPasswordHasError}
          label="Xác nhận mật khẩu"
          type="password"
          helperText={confirmPasswordHasError && 'Xác nhận mật khẩu không chính xác'}
          fullWidth
          size="small"
          variant="outlined"
          value={enteredConfirmPassword}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
        />
      </FormControl>
      {error?.length > 0 && (
        <FormHelperText error style={{ marginBottom: 10 }}>
          {error}
        </FormHelperText>
      )}
      {success?.length > 0 && (
        <FormHelperText focused style={{ marginBottom: 10, color: "blue" }}>
          {success}
        </FormHelperText>
      )}
      <Button variant="contained" color="primary" fullWidth type="submit" disabled={!formIsValid}>
        Lưu thay đổi
      </Button>
    </form>
  );
};

export default ChangePasswordPanel;
