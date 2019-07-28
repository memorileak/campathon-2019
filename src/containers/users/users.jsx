import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {Card} from 'reactstrap';
import TopNav from "../../commons/layout/top-nav/top-nav";
import Content from "../../commons/layout/content/content";
import Footer from "../../commons/layout/footer/footer";
import MainContent from "../../commons/layout/main-content/main-content";
import TableWithAutoPaging from "../../commons/high-abstraction-tables/table-with-auto-paging/table-with-auto-paging";
import uuidv4 from 'uuid/v4';
import {getListUsers} from "../../api/users-api";
import {produceHeaderClassName, produceNewSortState} from "../../utils/sel-table-sort-utils";
import UserItem from "./user-item/user-item";
import ChangeUserRoleModal from "./change-user-role-modal/change-user-role-modal";

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reload_items_key: uuidv4(),
            sort_attribute: 'up_vote',
            ascending: false,
            selected_user: {},
            show_change_role_modal: false,
        };
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.sort_attribute !== this.state.sort_attribute || prevState.ascending !== this.state.ascending) {
            this.setState({reload_items_key: uuidv4()});
        }
    };

    _handleChangeRoleClick(user) {
        this.setState({
            selected_user: user,
            show_change_role_modal: !this.state.show_change_role_modal,
        })
    };

    render() {
        const {reload_items_key, sort_attribute, ascending, selected_user, show_change_role_modal} = this.state;
        return (
            <div className="users d-flex flex-column">
                <TopNav />
                <Content container className="users-container">
                    <MainContent title="Quản lý người dùng">
                        <Card body>
                            <TableWithAutoPaging
                                striped className="users-table"
                                headConfig={[
                                    {title: 'STT'},
                                    {title: 'Họ và tên'},
                                    {title: 'Vai trò'},
                                    {
                                        title: 'Đánh giá tốt',
                                        className: produceHeaderClassName('up_vote', sort_attribute, ascending),
                                        onClick: () => {this.setState(produceNewSortState('up_vote', {sort_attribute, ascending}))},
                                    },
                                    {
                                        title: 'Đánh giá không tốt',
                                        className: produceHeaderClassName('down_vote', sort_attribute, ascending),
                                        onClick: () => {this.setState(produceNewSortState('down_vote', {sort_attribute, ascending}))},
                                    },
                                    {title: 'Ngày tham gia'},
                                    {title: 'Thao tác'},
                                ]}

                                reloadItemsKey={reload_items_key}
                                getItems={({page_size, page_number}) => getListUsers({page_size, page_number, sort_attribute, ascending})}
                                itemKeyGen={user => user.id}
                                itemPattern={UserItem}
                                itemProps={() => ({
                                    onChangeRoleClick: (user) => {this._handleChangeRoleClick(user)}
                                })}

                                itemsGen={data => data.users}
                                totalCountGen={data => data.count}
                                produceNewItems={items => items}
                            />
                        </Card>
                        <ChangeUserRoleModal
                            isOpen={show_change_role_modal}
                            toggle={() => {this.setState({show_change_role_modal: !this.state.show_change_role_modal})}}
                            user={selected_user}
                            onRoleChanged={() => {this.setState({reload_items_key: uuidv4()})}}
                        />
                    </MainContent>
                </Content>
                <Footer />
            </div>
        );
    }
}

Users.propTypes = {};

export default Users;