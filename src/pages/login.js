import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  login: {
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  image: {
    margin: '20px auto 20px auto',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    position: 'relative',
  },
  progress: {
    position: 'absolute',
  }
}

class login extends Component {
  constructor() {
    super()
    this.state = {
      email: 'new@email.com',
      password: '123456',
      loading: false,
      errors: {},
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      loading: true
    })
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('/login', userData)
      .then((res) => {
        // console.log('res:', res.data)
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
      <Grid container className={classes.login}>
        <Grid item sm />
        <Grid item sm >
          <img src={AppIcon} alt="morty" width="75" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
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
              Login
              {loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}
            </Button>
          </form>
          <small>
            dont have an account ? sign up <Link to="/signup">here</Link>
          </small>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
