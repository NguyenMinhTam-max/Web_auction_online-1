import { createTheme, ThemeProvider } from '@material-ui/core';
// import 'react-toastify/dist/ReactToastify.css';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { langActions } from './reducers/lang';
import { authActions as userAuthActions } from './reducers/auth';
import { ToastContainer } from 'react-toastify';
import { ProtectedRoute } from './components/Common/ProtectedRoute';
import { routes, adminRoutes } from './config/routes';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from './pages/404NotFound';
import Loading from './components/Loading/Loading';
import { CheckRole } from './components/Common/CheckRole';
import { mainColor } from './utils/colors';
import { AdminTemplate } from './components/Layout/AdminTemplate';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { unauthorizedProduct as unauProduct } from "./reducers/unauthorizedProduct";
// const AdminLoginPage = lazy(() => import('./components/LoginPage'));

//authentication route

const theme = createTheme({
  palette: {
    primary: {
      main: mainColor,
      contrastText: '#fff',
    },
  },
});

// ...rest = path = "link"
//children = page -------  example : <Category />
// function PrivateRouter({children, ...rest}) {
//   let auth = {
//     user:true
//   }
//   return (
//     <Route {...rest} render={() => {
//       //check whether user authenticated or not, if not return to homepage
//       if(auth.user){
//         return children; 
//       }else{
//         return <Redirect to={{ pathname: '/'}} />
//       }
//     }} />
//   );
// };
//the main component of ReactJS is App component
function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation()
  const client = new W3CWebSocket('ws://localhost:45678')
  const dataProductDetail = useSelector((state) => state.unauthorizedProduct.dataProductDetail);

  client.onopen = function () {
    console.log('connected');
    //client.send('Hello server');
  }
  client.onmessage = (e) => {
    //console.log(e.data);

    let result = (e.data.toString()).split("|")

    localStorage.setItem('TextNotifyBid', e.data)

    const userLocal = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    let check = false;

    if (userLocal) {
      for (var i = 3; i < result.length; i++) {
        if (userLocal.accId === Number(result[i])) {
          check = true;
          break;
        }
      }

      if (dataProductDetail.productDetail) {
        if (dataProductDetail.productDetail.prod_id === Number(result[0])) {
          dispatch(unauProduct.EditSocketInDetail())
          if (check === true) {
            dispatch(unauProduct.EditSocketInNotify())
          }
        }
        else {
          dispatch(unauProduct.EditSocketInHome())
          if (check === true) {
            dispatch(unauProduct.EditSocketInNotify())
          }
        }
      }
      else {
        dispatch(unauProduct.EditSocketInHome())
        if (check === true) {
          dispatch(unauProduct.EditSocketInNotify())
        }
      }
    }

  }

  useEffect(() => {
    const existingLang = localStorage.getItem('lang');
    if (!existingLang || (existingLang !== 'vn' && existingLang !== 'en')) return;

    dispatch(langActions.updateLang(existingLang));

    i18n.changeLanguage(existingLang);
  }, [i18n, dispatch]);

  useEffect(() => {
    try {
      const userLocal = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
      const accessToken = localStorage.getItem('accessToken');
      if (!userLocal || !accessToken) return;
      dispatch(
        userAuthActions.loginVerified({
          user: userLocal,
          accessToken,
        })
      );
    } catch (err) { }
  }, [dispatch]);


  return (
    //     <div>
    //       <Switch>
    //         <Route exact path="/" render = {() =>{return <HomePage />}} />

    //         <Route exact path="/seller/History-bid" render = {() =>{return <HistoryBidSeller />}} />
    //         <Route exact path="/bidder/History-bid" render = {() =>{return <HistoryBidBidder />}} />

    //         <PrivateRouter path="/category">
    //           <Category />
    //         </PrivateRouter>

    //         <Route path="*">
    //           <PageNotFound />
    //         </Route>
    //       </Switch>
    //     </div>
    <ThemeProvider theme={theme}>
      <ToastContainer
        autoClose={5000}
        closeOnClick
        position="top-right"
      />
      <Suspense fallback={<Loading />}>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  if (route.protected) {
                    return (
                      <ProtectedRoute {...props}>
                        <CheckRole roles={route.roles}>
                          <route.component {...route.props} additional={route?.additional} />
                        </CheckRole>
                      </ProtectedRoute>
                    );
                  }
                  return (
                    <CheckRole roles={route.roles}>
                      <route.component {...props} {...route.props} additional={route?.additional} />
                    </CheckRole>
                  );
                }}
              />
            );
          })}

          <Route
            path="/admin"
            render={(props) => {
              return (
                <AdminTemplate>
                  {adminRoutes.map((route, index) => {
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => {
                          return (
                            <ProtectedRoute {...props}>
                              <CheckRole roles={route.roles}>
                                <route.component {...props} {...route.props} additional={route?.additional} />
                              </CheckRole>
                            </ProtectedRoute>
                          );
                        }}
                      />
                    );
                  })}
                </AdminTemplate>
              );
            }}
          />
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;