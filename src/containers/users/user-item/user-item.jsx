import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {safeRetrieve} from "../../../utils/retrieve-value-utils";
import {getDayMonthYearString} from "../../../utils/datetime-utils";

function UserItem({item, index, onChangeRoleClick}) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{safeRetrieve(item, ['full_name'])}</td>
            <td>{safeRetrieve(item, ['role_name'])}</td>
            <td>{safeRetrieve(item, ['up_vote'])}</td>
            <td>{safeRetrieve(item, ['down_vote'])}</td>
            <td>{getDayMonthYearString(safeRetrieve(item, ['create_time']))}</td>
            <td>
                <div className="">
                    <Button size="sm" onClick={() => {onChangeRoleClick(item)}}>
                        Sửa vai trò
                    </Button>
                </div>
            </td>
        </tr>
    );
};

UserItem.propTypes = {
    onChangeRoleClick: PropTypes.func.isRequired,
};

export default UserItem;