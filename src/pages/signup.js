import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {formTheme} from '../util/theme'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = formTheme

class signup extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      loading: false,
      errors: {},
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      loading: true
    })
    const newUserData = {
      handle: this.state.handle,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    }
    axios.post('/signup', newUserData)
      .then((res) => {
        console.log('res:', res.data)
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        this.setState({
          loading: false,
        })
        this.props.history.push('/')
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          errors: err.response.data,
          loading: false,
        })
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { classes } = this.props
    const { errors, loading } = this.state
    return (
      <Grid container className={classes.formWrap}>
        <Grid item sm />
        <Grid item sm >
          <img src={AppIcon} alt="morty" width="75" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              fullWidth
              helperText={errors.email}
              error={errors.email ? true : false}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              fullWidth
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              helperText={errors.handle}
              error={errors.handle ? true : false}
              fullWidth
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}
            </Button>
          </form>
          <small>
            Already have an account ? Login <Link to="/login">here</Link> 
          </small>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup)
