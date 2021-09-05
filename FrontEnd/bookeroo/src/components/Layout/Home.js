import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import BooksPic from '../../assets/BooksPicHome.jpg';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: '5vw',
        marginRight: '5vw',
    },
    img: {
        objectFit: 'contain',
        maxWidth: '100%',
    },
    grid: {
        '@media (max-width: 767px)': {
            justifyContent: 'flex-start',
        },
    },
    gridItemText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        height: '40vh',
        '@media (max-width: 767px)': {
            marginTop: '2vh',
            height: '100%',
        },
    },
    gridButton: {
        marginTop: '3vh',
        '@media (max-width: 767px)': {
            marginTop: '1vh',
            marginBottom: '3vh',
        },
    },
    gridItemImg: {
        display: 'flex',
        justifyContent: 'center',
        maxHeight: '40vh',
    },
}));

function Home(props) {
    const classes = useStyles();
    const {history} = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    function handleButtonClick(pageURL) {
        history.push(pageURL);
    }
    

    const text1 = (
        <Grid item sm={6} className={classes.gridItemText}>
            <div>
                <Typography variant="h4" gutterBottom>
                    Find your favourite books
                </Typography>
                <Typography variant="body1" component="p">
                    From fantasy to thrillers<br></br>
                    We have everything you ar elooking for!<br></br>
                    Completely new books and used books for a fair price
                    <br></br>
                    Register now to order your dream books<br></br>
                    or sell books you have read<br></br>
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick('/register')}
                    className={classes.gridButton}
                >
                    Register as a Customer
                </Button>
            </div>
        </Grid>
    );

    const text2 = (
        <Grid item sm={6} className={classes.gridItemText}>
            <div>
                <Typography variant="h4" gutterBottom>
                    Grow your business
                </Typography>
                <Typography variant="body1" component="p">
                    Register your own buisness now!<br></br>
                    Easily sell your books<br></br>
                    Have an overview of your sales<br></br>
                    Manage it all from one place<br></br>
                    And profit from all other benefits<br></br>
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick('/register')}
                    className={classes.gridButton}
                >
                    Register as a Business
                </Button>
            </div>
        </Grid>
    );

    const pic1 = (
        <Grid item sm={6} className={classes.gridItemImg}>
            <img src={BooksPic} className={classes.img} alt="Books" />
        </Grid>
    );

    const pic2 = (
        <Grid item sm={6} className={classes.gridItemImg}>
            <img src={BooksPic} className={classes.img} alt="Books" />
        </Grid>
    );

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.grid}
            >   
                {isMobile ? (
                    <>
                    {pic1}

                    {text1}

                    {pic2}

                    {text2}
                    </>
                ) : (
                    <>
                    {text1}

                    {pic1}

                    {pic2}

                    {text2}
                    </>
                )}
            </Grid>
        </div>
    );
}

export default Home;
