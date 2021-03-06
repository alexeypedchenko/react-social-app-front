import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import CommentForm from './CommentForm'
import Comments from './Comments'

// MUI
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'

import { connect } from 'react-redux'
import { getScream, clearErrors } from '../../redux/actions/dataActions'

const styles = {
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  expandButton: {
    float: 'right'
  },
  profileImage: {
    width: 200,
    height: 200,
    display: 'block',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
  dialogContent: {
    padding: 20,
  },
  spinner: {
    textAlign: 'center',
    margin: '10px 0'
  }
}

class ScreamDialog extends Component {
  state = {
    open: false,
  }
  handleOpen = () => {
    this.setState({ open: true })
    this.props.getScream(this.props.screamId)
  }
  handleClose = () => {
    this.setState({ open: false })
    this.props.clearErrors()
  }
  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading }
    } = this.props
    const dialogMarkup = loading ? (
      <div className={classes.spinner}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{ userHandle }
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography
            variant="body1"
          >
            { body }
          </Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm screamId={screamId}/>
        <Comments comments={comments}/>
      </Grid>
    )

    return (
      <Fragment>
        <MyButton
          tip="Expand scream"
          tipClassName={classes.expandButton}
          onClick={this.handleOpen}
        >
          <UnfoldMoreIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon color="primary" />
          </MyButton>
          <DialogTitle>Scream details</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            { dialogMarkup }
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
})

const mapActionsToProps = {
  getScream,
  clearErrors,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))
 