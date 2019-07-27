import moment from 'moment';

export const VI_DATE_FORMAT = 'DD/MM/YYYY';

export function isValidDate(time_sign, format) {
    return moment(time_sign, format).isValid();
}

export function ISOtoValue(ISOString) {
    return moment(ISOString).format(VI_DATE_FORMAT);
}

export function valueToISO(value) {
    return moment(value, VI_DATE_FORMAT).toISOString();
}

export function stampToValue(timeStamp) {
    return moment(timeStamp).format(VI_DATE_FORMAT);
}

export function valueToStamp(value) {
    return moment(value, VI_DATE_FORMAT).valueOf();
}

export function anyTimeStringToValue(time_string) {
    return moment(time_string).format(VI_DATE_FORMAT);
}