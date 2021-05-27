import React, { Component } from 'react'
import MyButton from '../util/MyButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Redux
import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../redux/actions/dataActions'

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

class LikeButton extends Component {
  isScreamLiked = () => {
    return (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.screamId === this.props.screamId)
    )
  }
  likeScream = () => {
    this.props.likeScream(this.props.screamId)
  }
  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId)
  }
  render() {
    const { authenticated } = this.props.user
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorderIcon color="primary" />
        </MyButton>
      </Link>
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
    return (
      likeButton
    )
  }
}

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
}

const mapActionsToProps = {
  likeScream,
  unlikeScream,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
