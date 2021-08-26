import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
// MUI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Textfield from '@material-ui/core/Textfield'
// Redux stuff
import { connect } from 'react-redux'
import { submitComment } from '../../redux/actions/dataActions'

const styles = {
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    position: 'relative',
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
}

class CommentForm extends Component {
  state = {
    body: '',
    errors: {},
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.submitComment(this.props.screamId, { body: this.state.body })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const {
      classes,
      authenticated,
    } = this.props

    const errors = this.state.errors

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{textAlign: 'center'}}>
        <form onSubmit={this.handleSubmit }>
          <Textfield
            name="body"
            type="text"
            label="Comment on scream"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr />
      </Grid>
    ) : null
    return commentFormMarkup
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm))
