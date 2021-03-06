import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = {
  commentImage: {
    maxWidth: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',

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
}

class Comments extends Component {
  render() {
    const { comments, classes } = this.props
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const {
            body,
            createdAt,
            userImage,
            userHandle,
          } = comment
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img src={userImage} alt="comment" className={classes.commentImage} />
                  </Grid>
                  <Grid item sm={1}></Grid>
                  <Grid item sm={9}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecodary">
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">
                      {body}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              { index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          )
        })}
      </Grid>
    )
  }
}


Comments.protoTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Comments)
