import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import NotificationCounterService from "../../../../services/notification-counter-service";
import {getAllNotifications, markNotificationAsRead} from "../../../../api/notifications-api";
import {noti} from "../../../../services/noti-service";
import {getNotificationTimeString} from "../../../../utils/datetime-utils";
import {safeRetrieve} from "../../../../utils/retrieve-value-utils";
import ReadNotificationModal from "./read-notification-modal/read-notification-modal";

class NotificationsMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            not_read: 0,
            notifications: [],
            selected_notification: {},
            show_notification_modal: false
        };
        this._getAllNotifications = this._getAllNotifications.bind(this);
    };

    componentDidMount() {
        this._getAllNotifications();
        NotificationCounterService.register('NotificationsMenu', this.forceUpdate.bind(this));
    };

    componentWillUnmount() {
        NotificationCounterService.unregister('NotificationsMenu');
    };

    async _getAllNotifications() {
        try {
            const {count, not_read, notifications} = await getAllNotifications();
            this.setState({notifications, count, not_read});
            NotificationCounterService.setNotificationCount(not_read);
        } catch (err) {
            console.error(err);
            noti('error', err);
        }
    };

    async _handleNotificationClick(notification) {
        try {
            const {id} = notification;
            this.setState({
                selected_notification: notification,
                show_notification_modal: true,
            });
            if (notification.is_read !== 'true') {
                const {not_read} = await markNotificationAsRead(id, {is_read: 'true'});
                this.setState({
                    notifications: this.state.notifications.map(noti => noti.id === id ? {...noti, is_read: 'true'} : noti)
                });
                NotificationCounterService.setNotificationCount(not_read);
            }
        } catch (err) {
            console.error(err);
            noti('error', err);
        }
    };

    render() {
        const {notifications, selected_notification, show_notification_modal} = this.state;
        const notification_count = NotificationCounterService.getNotificationCount();
        return (
            <Fragment>
                <UncontrolledDropdown nav inNavbar className="notifications-menu">
                    <DropdownToggle nav>
                        <i className="fa fa-bell" />
                        {
                            notification_count ? (
                                <Badge className="count-info" color="danger">
                                    {NotificationCounterService.getNotificationCount()}
                                </Badge>
                            ) : null
                        }
                    </DropdownToggle>
                    <DropdownMenu right className="menu">
                        <div className="menu-header d-flex justify-content-between">
                            <span className="font-weight-bold">Thông báo</span>
                        </div>
                        <DropdownItem divider />
                        {
                            notifications.length > 0
                                ? notifications.map(notification => (
                                    <DropdownItem
                                        key={notification.id}
                                        className={`notification ${notification.is_read === 'true' ? '' : 'unread'}`}
                                        onClick={() => {this._handleNotificationClick(notification)}}
                                    >
                                        <div className="title d-flex align-items-center justify-content-between">
                                            <span className={`title-text flex-grow-1 ${notification.read ? '' : 'font-weight-bold'}`}>
                                                {safeRetrieve(notification, ['title'])}
                                            </span>
                                            <span className="timestamp small">
                                                {getNotificationTimeString(notification.create_time)}
                                            </span>
                                        </div>
                                        <div className="content small">
                                            {safeRetrieve(notification, ['message'])}
                                        </div>
                                    </DropdownItem>
                                ))
                                : <div className="no-notifications text-center text-secondary">No notifications</div>
                        }
                    </DropdownMenu>
                </UncontrolledDropdown>
                <ReadNotificationModal
                    isOpen={show_notification_modal}
                    toggle={() => {this.setState({show_notification_modal: !show_notification_modal})}}
                    notification={selected_notification}
                />
            </Fragment>
        );
    }
}

NotificationsMenu.propTypes = {};

export default withRouter(NotificationsMenu);