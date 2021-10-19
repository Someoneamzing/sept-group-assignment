import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withRouter, Link} from 'react-router-dom';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {useRecoilValue} from 'recoil';
import {userAtom} from '../../state/user/authentication';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    title: {
        color: 'white',
        textDecoration: 'none',
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    menuItemDesktop: {
        marginLeft: theme.spacing(5),
        color: '#FFFFFF',
    },
}));

const title = 'Bookeroo';

const defaultLinks = {
    Home: '/',
    Contact: '/contact',
    Books: '/books',
};

const authedLinks = {
    Logout: '/logout',
    Users: '/users',
    Profile: '/users/profile',
};

const businessLinks = {Store: '/store'};

const adminLinks = {Admin: '/admin'};

const unauthedLinks = {
    Register: '/register',
    Login: '/login',
};

function Header() {
    const userState = useRecoilValue(userAtom);

    // array of nav-links for the navbar
    let menuItems = defaultLinks;
    if (!userState) {
        menuItems = {...menuItems, ...unauthedLinks};
    } else {
        if (userState.authorities.includes('BUSINESS')) {
            menuItems = {...menuItems, ...businessLinks};
        }
        if (userState.authorities.includes('ADMIN')) {
            menuItems = {...menuItems, ...adminLinks};
        }
        menuItems = {...menuItems, ...authedLinks};
    }
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    // mobile menu/drawer handler
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    // mobile menu/drawer nav links
    const drawer = (
        <div>
            <List>
                {Object.entries(menuItems).map(([menuTitle, pageURL]) => (
                    <Link
                        key={pageURL}
                        to={pageURL}
                        style={{textDecoration: 'none'}}
                        onClick={handleDrawerToggle}
                    >
                        <ListItem key={menuTitle} button>
                            <ListItemText primary={menuTitle} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {/* Menu for Mobile*/}
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Title*/}
                    <Link to={'/'} className={classes.title}>
                        <Typography variant="h6" noWrap>
                            {title}
                        </Typography>
                    </Link>

                    {/* Menu for Desktop*/}
                    <Hidden xsDown implementation="css">
                        {Object.entries(menuItems).map(
                            ([menuTitle, pageURL]) => (
                                <Link to={pageURL} key={menuTitle}>
                                    <Button className={classes.menuItemDesktop}>
                                        {menuTitle}
                                    </Button>
                                </Link>
                            )
                        )}
                    </Hidden>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer*/}
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <IconButton
                            onClick={handleDrawerToggle}
                            className={classes.closeMenuButton}
                        >
                            <CloseIcon />
                        </IconButton>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            {/* Spacer for content below navbar */}
            <div className={classes.content}>
                <div className={classes.toolbar} />
            </div>
        </div>
    );
}

export default withRouter(Header);
