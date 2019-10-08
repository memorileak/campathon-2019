import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'reactstrap';
import {noti} from "../../../services/noti-service";
import {getUserProfileInformation} from "../../../api/user-profile-api";
import {getDayMonthYearString} from "../../../utils/datetime-utils";
import {isNumber, safeRetrieve} from "../../../utils/retrieve-value-utils";
import {toLocaleFormattedString} from "../../../utils/number-format-utils";

function UserProfileCard(props) {

    async function getUserProfile() {
        try {
            const {user} = await getUserProfileInformation(props.userId || '');
            setUserProfile(user);
        } catch (err) {
            console.error(err);
            noti('error', err);
        }
    }

    const [user_profile, setUserProfile] = useState({});
    useEffect(() => {getUserProfile()}, []);

    return (
        <Card body className="user-profile-card">
            <h5>{user_profile.full_name || ''}</h5>
            <p>Thành viên từ {getDayMonthYearString(safeRetrieve(user_profile, ['create_time'])) || 'không rõ'}</p>
            <div>
                <span className="user-profile-label">Đánh giá tốt:</span>
                {isNumber(user_profile.up_vote) ? toLocaleFormattedString(user_profile.up_vote) : 0}
            </div>
            <div>
                <span className="user-profile-label">Đánh giá không tốt:</span>
                {isNumber(user_profile.down_vote) ? toLocaleFormattedString(user_profile.down_vote) : 0}
            </div>
        </Card>
    );

}

UserProfileCard.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default UserProfileCard;