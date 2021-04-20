import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'

// MUI Staff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    width: 300,
  },
  content: {
    padding: 25,
  },
}

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime)
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        // screamId,
        // likeCount,
        // commentCount,
      }
    } = this.props
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          component="img"
          image={userImage || 'https://via.placeholder.com/300/000000/FFFFFF/?text=scream-image'}
          title="profile image"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">
            {body}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Scream)
