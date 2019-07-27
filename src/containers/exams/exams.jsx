import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import TopNav from "../../commons/layout/top-nav/top-nav";
import Content from "../../commons/layout/content/content";
import Footer from "../../commons/layout/footer/footer";
import MainContent from "../../commons/layout/main-content/main-content";

class Exams extends Component {

    render() {
        return (
            <div className="exams full-height">
                <TopNav />
                <Content container className="exams-container">
                    <MainContent>
                        
                    </MainContent>
                </Content>
                <Footer />
            </div>
        );
    }

}

Exams.propTypes = {};

export default Exams;