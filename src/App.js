import './App.css';
import { appTheme } from './util/theme'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'

// Components
import Navbar from './components/Navbar'
import AuthRoute from './util/AuthRoute'

// Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

// @material-ui
import { MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme(appTheme);

let authenticated
const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  console.log('decodedToken:', decodedToken)

  if (decodedToken.exp * 1000 < Date.now()) {
    // window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar></Navbar>
            <div className="container">
              <Switch>
                <Route exact path="/" component={home}/>
                <AuthRoute exact path="/login" authenticated={authenticated} component={login}/>
                <AuthRoute exact path="/signup" authenticated={authenticated} component={signup}/>
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
