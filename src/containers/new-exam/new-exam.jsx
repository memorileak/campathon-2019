import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import TopNav from "../../commons/layout/top-nav/top-nav";
import Content from "../../commons/layout/content/content";
import Footer from "../../commons/layout/footer/footer";

class NewExam extends Component {
    render() {
        return (
            <div className="new-exam d-flex flex-column">
                <TopNav />
                <Content container className="new-exam-container">


                </Content>
                <Footer />
            </div>
        );
    }
}

NewExam.propTypes = {};

export default NewExam;