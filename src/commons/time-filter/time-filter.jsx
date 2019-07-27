import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isNumber} from "../../utils/retrieve-value-utils";
import {MS_PER_DAY} from "../../utils/datetime-utils";
import {noti} from "../../services/noti-service";
import DatePicker from "../date-picker/date-picker";

export default class TimeFilter extends Component {

    static propTypes = {
        timeFrom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        timeTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        onChangeTimeFrom: PropTypes.func.isRequired,
        onChangeTimeTo: PropTypes.func.isRequired,
    };

    _isValidTime(time_from, time_to) {
        if (isNumber(time_from) && isNumber(time_to)) {
            return parseInt(time_from) <= parseInt(time_to);
        } else {
            return false;
        }
    };

    _handleChooseTimeFrom(time_stamp) {
        if (this._isValidTime(time_stamp, this.props.timeTo)) {
            this.props.onChangeTimeFrom(time_stamp);
        } else {
            noti('error', 'You chose invalid time: From date was after To date');
        }
    };

    _handleChooseTimeTo(time_stamp) {
        if (this._isValidTime(this.props.timeFrom, time_stamp)) {
            this.props.onChangeTimeTo(time_stamp);
        } else {
            noti('error', 'You chose invalid time: To date was before From date');
        }
    };

    render() {
        const {timeFrom, timeTo} = this.props;
        return (
            <div className="time-filter d-flex align-items-center">
                From:&nbsp;&nbsp;
                <DatePicker
                    className="time-from-input short-input"
                    value={timeFrom}
                    onChange={value => {this._handleChooseTimeFrom(value)}}
                />
                To:&nbsp;&nbsp;
                <DatePicker
                    className="time-to-input short-input"
                    value={timeTo}
                    onChange={value => {this._handleChooseTimeTo(value - 1 + MS_PER_DAY)}}
                />
            </div>
        )
    }
}
