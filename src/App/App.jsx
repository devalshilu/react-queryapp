import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions, userActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { HistoryPage } from '../HistoryPage';
class App extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert, authentication } = this.props;
        { console.log(authentication) }
        return (

            <Router history={history}>
                <div>
                    {/* <nav className="navbar" style={{ 'backgroundColor': 'lightgray', 'marginBottom': '10px' }}>
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="/">Search Query</a>
                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/login"><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
                            </ul>
                        </div>
                    </nav> */}

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">Search Query</a>
                        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
                        {authentication.loggedIn && <ul className="navbar-nav mr-auto navbar-right" style={{marginLeft: '80%'}}>


                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Hello {authentication.user.user.name} !!
        </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/History">History</a>

                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/login">logout</a>
                            </div>
                        </li>

                        </ul>}
                        {/* </div> */}
                    </nav>
                <div className="container">
                    {/* <div className="col-sm-8 col-sm-offset-2"> */}
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <div>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute exact path="/History" component={HistoryPage} />
                        <Route path="/login" component={LoginPage} />
                    </div>

                    {/* </div> */}
                </div>
                </div >
            </Router >

        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
    return {
        alert, authentication
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 