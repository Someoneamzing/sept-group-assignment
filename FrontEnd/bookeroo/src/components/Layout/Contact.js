import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: '10vw',
        marginRight: '10vw',
    },
    title: {
        textAlign: 'left',
    },
    card: {
        maxWidth: theme.spacing(80),
        marginTop: theme.spacing(5),
        alignItems: 'center',
        justifyContent: 'center',
        background: '#3f51b5',
        color: '#ffff',
    },
    cardContent: {
        padding: theme.spacing(3),
    },
    cardTitle: {
        marginBottom: theme.spacing(3),
    },
    email: {
        textDecoration: 'none',
        color: 'hotpink',
    },
}));

function Contact() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h2" noWrap className={classes.title}>
                Contact us
            </Typography>
            <div>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Typography
                            className={classes.cardTitle}
                            variant="h4"
                            gutterBottom
                        >
                            Contact Information
                        </Typography>
                        <Typography variant="body1" component="p">
                            Mobile Number: +61976341
                        </Typography>
                        <Typography variant="body1" component="p">
                            <span>Email address: </span>
                            <a
                                href="mailto:test@bookeroo.com"
                                className={classes.email}
                            >
                                test@bookeroo.com
                            </a>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Contact;
