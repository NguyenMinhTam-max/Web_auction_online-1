import { lazy } from 'react';
// import UserManager from '../pages/auth/Admin/UserManager/UserManager';
import { Role } from './role';
// const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const ProfilePage = lazy(() => import('../pages/users/Profile'));
const ProductPage = lazy(() => import('../pages/users/product-mgt/Product'));
const ProductPageEnd = lazy(() => import('../pages/users/product-mgt-end/Product'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));

const HistoryBidBidder = lazy(() => import('../pages/users/bidder/HistoryBid'));
const HistoryBidSeller = lazy(() => import('../pages/users/seller/HistoryBid'));
const ProductSearch = lazy(() => import('../pages/ProductSearch'));
const ProductCategory = lazy(() => import('../pages/ProductCategory'));

const DashbroadPage = lazy(() => import('../pages/admin/DashbroadPage'));
const UserPage = lazy(() => import('../pages/admin/user-mgt/users'));
const AdminProductPage = lazy(() => import('../pages/admin/product-mgt/Product'));
const AdminCategoryPage = lazy(() => import('../pages/admin/category-mgt/Category'));
const AdminSubCategoryPage = lazy(() => import('../pages/admin/subCategory-mgt/SubCategory'));

const ForgotPasswordPage = lazy(() => import('../pages/ForgotPassword'));
const RecoveryPasswordPage = lazy(() => import('../pages/RecoveryPassword'));

const AccountActivationPage = lazy(() => import('../pages/AccountActivation'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
export const routes = [
  {
    path: '/',
    protected: false,
    exact: true,
    component: HomePage,
  },
  {
    path: '/details/:productId',
    protected: false,
    exact: true,
    component: ProductDetail,
  },
  {
    path: '/search',
    protected: false,
    exact: true,
    component: ProductSearch,
  },
  {
    path: '/category/:catID',
    protected: false,
    exact: true,
    component: ProductCategory,
  },
  {
    path: '/login',
    protected: false,
    exact: true,
    component: LoginPage,
  },
  {
    path: '/register',
    protected: false,
    exact: true,
    component: RegisterPage,
  },
  {
    path: '/profile/:slug',
    protected: true,
    exact: true,
    component: ProfilePage,
  },
  {
    path: '/profile',
    protected: true,
    exact: true,
    component: ProfilePage,
    roles: [Role.Bidder, Role.Seller],
  },
  {
    path: '/profile/basic',
    protected: true,
    exact: true,
    component: ProfilePage,
    roles: [Role.Bidder, Role.Seller],
  },
  {
    path: '/profile/password',
    protected: true,
    exact: true,
    component: ProfilePage,
    roles: [Role.Bidder, Role.Seller],

  },
  {
    path: '/product-mgt',
    protected: true,
    exact: true,
    component: ProductPage,
    roles: [Role.Seller],
  },
  {
    path: '/product-mgt-end',
    protected: true,
    exact: true,
    component: ProductPageEnd,
    roles: [Role.Seller],
  },
  {
    path: '/seller/history-bid',
    protected: false,
    exact: true,
    component: HistoryBidSeller,
    roles: [ Role.Seller],
  },
  {
    path: '/bidder/History-bid',
    protected: false,
    exact: true,
    component: HistoryBidBidder,
    roles: [Role.Bidder],
  },
  {
    path: '/forgot-password',
    protected: false,
    exact: true,
    component: ForgotPasswordPage,
  },
  {
    path: '/recovery-password',
    protected: false,
    exact: true,
    component: RecoveryPasswordPage,
  },
  {
    path: '/account-activation',
    protected: false,
    exact: true,
    component: AccountActivationPage,
  },
];

export const adminRoutes = [
  {
    path: '/admin',
    protected: true,
    exact: true,
    component: DashbroadPage,
    roles: [Role.Admin],
  },
  {
    path: '/admin/dashboard',
    protected: true,
    exact: true,
    component: DashbroadPage,
    roles: [Role.Admin],
  },
  {
    path: '/admin/user/admins',
    protected: true,
    exact: true,
    component: UserPage,
    roles: [Role.Admin],
    additional: {
      filter: Role.Admin,
    }
  },
  {
    path: '/admin/user/sellers',
    protected: true,
    exact: true,
    component: UserPage,
    roles: [Role.Admin],
    additional: {
      filter: Role.Seller,
    }
  },
  {
    path: '/admin/user/bidders',
    protected: true,
    exact: true,
    component: UserPage,
    roles: [Role.Admin],
    additional: {
      filter: Role.Bidder,
    }
  },
  {
    path: '/admin/products',
    protected: true,
    exact: true,
    component: AdminProductPage,
    roles: [Role.Admin],
  },
  {
    path: '/admin/categories',
    protected: true,
    exact: true,
    component: AdminCategoryPage,
    roles: [Role.Admin],
    additional: {
      filter: Role.Bidder,
    }
  },
  {
    path: '/admin/sub-categories',
    protected: true,
    exact: true,
    component: AdminSubCategoryPage,
    roles: [Role.Admin],
    additional: {
      filter: Role.Bidder,
    }
  }
];
