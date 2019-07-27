import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, DropdownToggle, DropdownMenu} from 'reactstrap';
import uuidv4 from 'uuid/v4';

export default class HoverDropdown extends Component {

    static propTypes = {
        className: PropTypes.string,
        direction: PropTypes.oneOf(['up', 'right', 'bottom', 'left']),
        label: PropTypes.string,
        toggleTag: PropTypes.any,
        items: PropTypes.array.isRequired,
        itemKey: PropTypes.func,
        itemRender: PropTypes.func.isRequired,
        onChooseItem: PropTypes.func.isRequired,
        onHoverItem: PropTypes.func,
    };

    state = {isOpen: false};

    _toggle(isOpen) {
        if (isOpen === undefined) {
            this.setState({isOpen: !this.state.isOpen});
        } else {
            this.setState({isOpen: isOpen ? true : false});
        }
    };

    render() {
        const {isOpen} = this.state;
        const {
            className,
            direction, label, toggleTag,
            items, itemKey, itemRender,
            onChooseItem, onHoverItem,
        } = this.props;
        return (
            <Dropdown 
                className={className + ' hover-dropdown'}
                direction={direction}
                isOpen={isOpen} toggle={this._toggle.bind(this)} 
                onMouseEnter={() => {this._toggle(true)}}
                onMouseLeave={() => {this._toggle(false)}}
            >
                <DropdownToggle caret tag={toggleTag}>
                    {label}
                </DropdownToggle>
                <DropdownMenu>{
                    items.map(item => (
                        <div 
                            key={itemKey ? itemKey(item) : uuidv4()} 
                            className="dropdown-item"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onChooseItem) onChooseItem(item)
                            }}
                            onMouseEnter={(e) => {
                                if (onHoverItem) onHoverItem(item)
                            }}
                        >
                            {itemRender(item)}
                        </div>
                    ))
                }</DropdownMenu>
            </Dropdown>
        )
    }
}
