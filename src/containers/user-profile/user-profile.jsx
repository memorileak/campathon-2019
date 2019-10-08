import React from 'react';
import TopNav from "../../commons/layout/top-nav/top-nav";
import Content from "../../commons/layout/content/content";
import MainContent from "../../commons/layout/main-content/main-content";
import Footer from "../../commons/layout/footer/footer";
import UserProfileCard from "./user-profile-card/user-profile-card";
import {safeRetrieve} from "../../utils/retrieve-value-utils";

function UserProfile(props) {
    return (
        <div className="user-profile d-flex flex-column">
            <TopNav />
            <Content container className="user-profile-container">
                <MainContent className="user-profile" title="Thông tin thành viên">
                    <UserProfileCard userId={safeRetrieve(props, ['match', 'params', 'user_id'])} />
                </MainContent>
            </Content>
            <Footer />
        </div>
    );
}

UserProfile.propTypes = {};

export default UserProfile;