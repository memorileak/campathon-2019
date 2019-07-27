import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import TopNav from "../../commons/layout/top-nav/top-nav";
import Content from "../../commons/layout/content/content";
import Footer from "../../commons/layout/footer/footer";
import MainContent from "../../commons/layout/main-content/main-content";
import {EXAMS_ROUTES} from "./exams-routes";

class Exams extends Component {

    render() {
        return (
            <div className="exams full-height">
                <TopNav />
                <Content container className="exams-container">
                    <Switch>
                        {
                            EXAMS_ROUTES.map(route => (
                                <Route path={route.path} exact={route.exact} component={route.component} />
                            ))
                        }
                        <Redirect to="/exams" />
                    </Switch>
                    {/*<MainContent>

                    </MainContent>*/}
                </Content>
                <Footer />
            </div>
        );
    }

}

Exams.propTypes = {};

export default Exams;