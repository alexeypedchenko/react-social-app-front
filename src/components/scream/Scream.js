import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'

// redux
import { connect } from 'react-redux'

// MUI Staff
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

// icons
import ChatIcon from '@material-ui/icons/Chat'

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    width: 200,
  },
  content: {
    padding: 25,
    width: '100%',
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
        screamId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: {
          handle
        }
      }
    } = this.props

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null

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
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} /> 
        </CardContent>
      </Card>
    )
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Scream))
