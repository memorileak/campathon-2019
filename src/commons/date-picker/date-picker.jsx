import React, {Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import {isValidDate, stampToValue, valueToStamp, VI_DATE_FORMAT} from "../../utils/date-transform-utils";

class DatePicker extends Component {

    componentDidMount() {
        this._updateValueByProps();
        $(this.date_picker).change(this._handlePickerChange.bind(this));
        $(this.date_picker).datepicker({dateFormat: 'dd/mm/yy', showAnim: 'fadeIn'});
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        this._updateValueByProps();
    };

    componentWillUnmount() {
        $(this.date_picker).datepicker('destroy');
    };

    _handlePickerChange(e) {
        const {value} = e.target;
        this._updateValueByProps();
        if (isValidDate(value, VI_DATE_FORMAT)) {
            this.props.onChange(valueToStamp(value));
        }
    };

    _updateValueByProps() {
        this.date_picker.value = stampToValue(this.props.value);
    };

    render() {
        const {className} = this.props;
        return (
            <input
                autoComplete="off"
                className={`date-picker form-control ${className}`}
                ref={(el) => {this.date_picker = el}}
            />
        );
    };

}

DatePicker.propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
    className: '',
};

export default DatePicker;