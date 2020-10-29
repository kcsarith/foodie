
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './RestaurantCard.css'
import { useHistory } from 'react-router-dom';
import RestReviews from './RestReviews';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RestaurantCard({ rest }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [reviews, setReviews] = useState([])
    const history = useHistory()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const routeChange = () => {
        let path = `restaurant/profile/${rest.id}`
        history.push(path)
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/home/restaurant/${rest.id}`)
            const data = await res.json()
            setReviews(data.reviews)
        }
        fetchData()
    }, [])

    const restReviews = reviews.map(item => <RestReviews key={item.id} review={item} />)

    return (
        <div className='rest-card'>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
          </Avatar>
                    }
                    title={rest.name}
                    subheader={rest.address}
                    onClick={routeChange}
                />
                <CardContent onClick={routeChange}>
                    <Typography variant="body2" color="textSecondary" component="p">
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Reviews:</Typography>
                        <Typography paragraph>
                            {restReviews}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}
