import { makeStyles } from '@material-ui/core';
import SideBarItem from '../SideBar/SideBarItem/SideBarItem';

const useStyles = makeStyles((theme) => ({
  root: {
    listStyle: 'none',
  },
}));
export const AdminMenu = ({ options }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {options.map((option, index) => (
        <SideBarItem
          key={index}
          title={option.title}
          link={option?.link}
          subItems={option.subItems}
          IconComponent={option.icon}
        />
      ))}
    </div>
  );
};
