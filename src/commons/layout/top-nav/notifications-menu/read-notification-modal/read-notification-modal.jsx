import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {safeRetrieve} from "../../../../../utils/retrieve-value-utils";

class ReadNotificationModal extends Component {

    render() {
        const {isOpen, toggle, notification} = this.props;
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Chi tiết thông báo</ModalHeader>
                <ModalBody>
                    <p className="font-weight-bold">{safeRetrieve(notification, ['title'])}</p>
                    <p>{safeRetrieve(notification, ['message'])}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={toggle}>Đóng</Button>
                </ModalFooter>
            </Modal>
        );
    };

}

ReadNotificationModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    notification: PropTypes.object.isRequired,
};

export default ReadNotificationModal;