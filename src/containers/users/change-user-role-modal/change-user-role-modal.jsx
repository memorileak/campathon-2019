import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input} from 'reactstrap';
import {noti} from "../../../services/noti-service";
import {getAllRole} from "../../../constants/role-api";
import FormGroup from "reactstrap/es/FormGroup";
import CustomInput from "reactstrap/es/CustomInput";
import {VIETNAMESE_PERMISSIONS} from "../../../constants/user-permissions-vietnamese-mapping";
import {toString} from "../../../utils/tostring-utils";
import {changeRoleUser} from "../../../api/users-api";
import SortableTableWithItemPattern from "../../../commons/sortable-tables/sortable-table-with-item-pattern";
import {safeRetrieve} from "../../../utils/retrieve-value-utils";

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
        const user_id = this.props.user.id;
        const {role_id, reason} = this.state;
        if (reason) {
            try {
                await changeRoleUser(user_id, {role_id, reason});
                noti('success', 'Thay đổi vai trò thành công');
                this.props.onRoleChanged();
                this.props.toggle();
            } catch (err) {
                console.error(err);
                noti('error', err);
            }
        } else {
            noti('warning', 'Xin hãy cung cấp lý do');
        }

    };

    render() {
        const {isOpen, toggle, user} = this.props;
        const {role: roles, role_id, reason} = this.state;
        return (
            <Modal
                isOpen={isOpen} toggle={toggle} size="lg"
                onOpened={this._handleModalOpened.bind(this)}
                onClosed={this._handleModalClosed.bind(this)}
            >
                <ModalHeader toggle={toggle}>Thay đổi vai trò</ModalHeader>
                <ModalBody>
                    <p>Người dùng: <span className="font-weight-bold">{user.full_name}</span></p>
                    <FormGroup>
                        <Label>Chọn vai trò</Label>
                        <SortableTableWithItemPattern
                            striped className="role-select-table"
                            titles={['Chọn', 'Vai trò', 'Quyền truy cập']}

                            items={roles}
                            itemPattern={RoleTableItem}
                            itemKeyGen={role => role.id}
                            itemProps={{
                                selectedRoleId: role_id,
                                onSelectRole: (role) => {this.setState({role_id: role.id})}
                            }}

                            sortConfig={[]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Lý do</Label>
                        <Input
                            type="textarea" style={{resize: 'none'}} rows={5}
                            value={reason}
                            onChange={(e) => {this.setState({reason: e.target.value})}}
                        />
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

function RoleTableItem({item, index, selectedRoleId, onSelectRole}) {
    return (
        <tr>
            <td>
                <CustomInput
                    id={`role-${index}`} name="role-select" type="radio"
                    checked={toString(item.id) === toString(selectedRoleId)}
                    onChange={() => {onSelectRole(item)}}
                />
            </td>
            <td>{safeRetrieve(item, ['name'])}</td>
            <td>
                {
                    (safeRetrieve(item, ['permission']) || []).map(perm => VIETNAMESE_PERMISSIONS[perm]).join(', ')
                }
            </td>
        </tr>
    );
}

ChangeUserRoleModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    onRoleChanged: PropTypes.func.isRequired,
};

export default ChangeUserRoleModal;