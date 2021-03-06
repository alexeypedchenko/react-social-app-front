import React, { Component, Fragment } from 'react'
import { formTheme } from '../../util/theme'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

// MUI
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

// Icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

// Redux
import { connect } from 'react-redux'
import { postScream, clearErrors } from '../../redux/actions/dataActions'

const styles = () => ({
  ...formTheme,
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  submitButton: {
    position: 'relative',
    margin: '20px auto 20px auto',
    float: 'right'
  },
})

class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      console.log('nextProps.UI.errors:', nextProps.UI.errors)
      this.setState({
        errors: nextProps.UI.errors
      })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: '',
        open: false,
        errors: {}
      })
    }
  }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.props.clearErrors()
    this.setState({
      open: false,
      errors: {}
    })
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.postScream({ body: this.state.body })
  }
  render() {
    const { errors } = this.state
    const { classes, UI: {loading} } = this.props
    return (
      <Fragment>
        <MyButton tip="Post a Scream!" onClick={this.handleOpen}>
          <AddIcon />
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
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Scream"
                multiline
                rows="3"
                placeholder="Your new scream"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.TextField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
                onClick={this.handleSubmit}
              >
                Submit
                {loading && (
                  <CircularProgress size="20" className={classes.progress} />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  UI: state.UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream))
