import React, { Component, Fragment } from 'react'
import {formTheme} from '../../util/theme'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

// Redux
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'

// MUI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

// Icons
import EditIcon from '@material-ui/icons/Edit'

const styles = () => ({
  ...formTheme,
  editButton: {
    float: 'right'
  }
})

class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false,
  }
  componentDidMount() {
    this.mapUserDetailsToState(this.props.credentials)
  }
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio || '',
      website: credentials.website || '',
      location: credentials.location || '',
    })
  }
  handleOpen = () => {
    this.setState({ open: true })
    this.mapUserDetailsToState(this.props.credentials)
  }
  handleClose = () => {
     this.setState({ open: false })
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit = (event) => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    }
    this.props.editUserDetails(userDetails)
    this.handleClose()
  }
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <MyButton tip="Edit user details" onClick={this.handleOpen} btnClassName={classes.editButton}>
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                placeholder="Short bio about yourself"
                multiline
                rows="3"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleSubmit}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
}) 

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails))
