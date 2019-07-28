import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Col, Input} from 'reactstrap';
import {noti} from "../../../services/noti-service";
import {getAllRole} from "../../../constants/role-api";
import FormGroup from "reactstrap/es/FormGroup";
import CustomInput from "reactstrap/es/CustomInput";
import {VIETNAMESE_PERMISSIONS} from "../../../constants/user-permissions-vietnamese-mapping";
import {toString} from "../../../utils/tostring-utils";
import {changeRoleUser} from "../../../api/users-api";

class ChangeUserRoleModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: [],
            role_id: '',
            reason: '',
        };
    };

    componentDidMount() {
        this._getRoles();
    };

    async _getRoles() {
        try {
            const {role} = await getAllRole();
            this.setState({role});
        } catch (err) {
            console.error(err);
            noti('error', err);
        }
    };

    _handleModalOpened() {
        const {user} = this.props;
        this.setState({role_id: user.role_id});
    };

    _handleModalClosed() {
        this.setState({role_id: '', reason: ''});
    };

    async _handleSubmit() {
        try {
            const user_id = this.props.user.id;
            const {role_id, reason} = this.state;
            await changeRoleUser(user_id, {role_id, reason});
            noti('success', 'Thay đổi vai trò thành công');
            this.props.onRoleChanged();
            this.props.toggle();
        } catch (err) {
            console.error(err);
            noti('error', err);
        }

    };

    render() {
        const {isOpen, toggle, user} = this.props;
        const {role: roles, role_id, reason} = this.state;
        return (
            <Modal
                isOpen={isOpen} toggle={toggle}
                onOpened={this._handleModalOpened.bind(this)}
                onClosed={this._handleModalClosed.bind(this)}
            >
                <ModalHeader toggle={toggle}>Thay đổi vai trò</ModalHeader>
                <ModalBody>
                    <p>Người dùng: <span className="font-weight-bold">{user.full_name}</span></p>
                    <FormGroup row>
                        <Label md={2}>Vai trò:</Label>
                        <Col md={10}>
                            {
                                roles.map((role, i) => (
                                    <CustomInput
                                        key={role.id} id={`role-${i}`} name="role-select" type="radio" className="mb-2"
                                        label={`${role.name} (${role.permission.map(perm => VIETNAMESE_PERMISSIONS[perm]).join(', ')})`}
                                        checked={toString(role_id) === toString(role.id)}
                                        onChange={() => {this.setState({role_id: role.id})}}
                                    />
                                ))
                            }
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label md={2}>Lý do:</Label>
                        <Col md={10}>
                            <Input
                                type="textarea" style={{resize: 'none'}} rows={5}
                                value={reason}
                                onChange={(e) => {this.setState({reason: e.target.value})}}
                            />
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={toggle}>Đóng</Button>
                    <Button color="primary" onClick={this._handleSubmit.bind(this)}>Lưu thay đổi</Button>
                </ModalFooter>
            </Modal>
        );
    };

}

ChangeUserRoleModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    onRoleChanged: PropTypes.func.isRequired,
};

export default ChangeUserRoleModal;