import { AdminMenu } from './AdminMenu';
import HeaderAdmin from './HeaderAdmin';
import { Person, Menu, Loyalty } from '@material-ui/icons';
import SideBar from '../SideBar/SideBar';
import AdminInfomation from '../UserInfomation/AdminInfomation';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core';

const options = [
  {
    icon: Menu,
    title: 'Dashboard',
    link: '/admin/dashboard',
  },
  {
    icon: Loyalty,
    title: 'Products',
    subItems: [
      {
        title: 'Categories',
        link: '/admin/categories',
      },
      {
        title: 'Sub Categories',
        link: '/admin/sub-categories',
      },
      {
        title: 'Products',
        link: '/admin/products',
      },
    ],
  },
  {
    icon: Person,
    title: 'Users',
    // link: '/admin/users',
    subItems: [
      {
        title: 'Admins',
        link: '/admin/user/admins',
      },
      {
        title: 'Sellers',
        link: '/admin/user/sellers',
      },
      {
        title: 'Bidders',
        link: '/admin/user/bidders',
      },
    ],
  },
  // {
  //   icon: AttachMoney,
  //   title: 'Orders',
  //   link: '/admin/orders',
  // },
];

const useStyles = makeStyles((theme) => ({
  navBar: {

  },
  main: {
    background: '#FFF',
    minHeight: '80vh',
    maxHeight: 'calc(100% - 129px)',
    paddingTop: 64,
    marginBottom: 65,
    width: 'calc(100% - 300px)',
    marginLeft: 280,
    marginTop: 20,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 80,
      marginBottom: 85,
    },
  },
}));

const user = JSON.parse(localStorage.getItem('user'));
export const AdminTemplate = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <HeaderAdmin showMenu />
      <SideBar>
        <AdminInfomation
          avatar={user?.accAvatar || "http://themes.pixelstrap.com/multikart/assets/images/dashboard/man.png"}
          name={user?.accFullName || ""}
          user={user || null}
          position="ADMIN"
        />
        <AdminMenu options={options} />
      </SideBar>
      <main className={classes.main}>{children}</main>
      {/* <Footer hasSideBar /> */}
    </>
  );
};
