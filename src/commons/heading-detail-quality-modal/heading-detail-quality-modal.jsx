import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, FormGroup, Col
} from 'reactstrap';

class HeadingDetailQualityModal extends Component {

    render() {
        const {heading, isOpen, toggle, className} = this.props;
        return (
            <Modal isOpen={isOpen} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Heading quality detail</ModalHeader>
                <ModalBody>
                    <FormGroup row>
                        <Col md={3}>Heading:</Col>
                        <Col md={9} className="font-weight-bold">{heading.content || ''}</Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={3}>Keywords:</Col>
                        <Col md={9} className="text-primary font-weight-bold">{(heading.keywords || []).join(', ')}</Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={3}>Quality:</Col>
                        <Col md={9}>{heading.real || ''}</Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={3}>Score:</Col>
                        <Col md={9}>{heading.score || ''}</Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    };

};

HeadingDetailQualityModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    className: PropTypes.string,
    heading: PropTypes.object,
};

export default HeadingDetailQualityModal;