import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'

// redux
import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../redux/actions/dataActions'

// MUI Staff
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

// icons
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

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
  isScreamLiked = () => {
    return (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.screamId === this.props.scream.screamId)
    )
  }
  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId)
  }
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId)
  }
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

    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorderIcon color="primary" />
        </Link>
      </MyButton>
    ) : (
      this.isScreamLiked() ? (
        <MyButton tip="Undo Like" onClick={this.unlikeScream}>
          <FavoriteIcon color="primary" />
        </MyButton>
      ) : (
        <MyButton tip="Like" onClick={this.likeScream}>
          <FavoriteBorderIcon color="primary" />
        </MyButton>
      )
    )

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
          {likeButton}
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
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapActionsToProps = {
  likeScream,
  unlikeScream,
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream))
