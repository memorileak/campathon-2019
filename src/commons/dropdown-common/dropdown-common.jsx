import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import PropTypes from 'prop-types';

export default class DropdownCommon extends Component {
    static propTypes = {
        items: PropTypes.array,
        value_field: PropTypes.string,
        id_field: PropTypes.string,
        color: PropTypes.string,
        activeItem: PropTypes.object,
        defaultTitle: PropTypes.string,
        isSearchMode: PropTypes.bool,
        setMaxHeight: PropTypes.bool,
        maxHeight: PropTypes.number
    }

    componentWillMount() {
        const { items } = this.props;
        this.setState({
            items: items
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            searchedItems: [],
            items: []
        }
    }

    componentWillReceiveProps(nextProps) {
        const { items: _items } = nextProps;
        const { items } = this.state;
        if (_items !== items) {
            this.setState({ items: _items })
        }
    }
    _renderItems = () => {
        const { id_field, value_field } = this.props;
        const { items } = this.state;
        if (!!items) {
            return items.map((item) => {
                return (
                    <DropdownItem key={id_field ? item[id_field] : item.id} onClick={() => {
                        this.props.selectItem(item)
                    }}>{value_field ? item[value_field] : item.value}</DropdownItem>
                )
            })
        }
    }

    _handleToggleDropDown = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    _handleChangeSearchInput = () => {
        const { searchInput } = this.refs;
        const { items } = this.props;
        const { value_field } = this.props;

        const searchedItems = items.filter((item) => {
            return (!!value_field) ?
                (!!item[value_field] ? item[value_field].includes(searchInput.value) : false) :
                (!!item.value ? item.value.includes(searchInput.value) : false)
        })
        this.setState({
            items: searchedItems
        })
    }

    _renderSearchInput = () => {
        const { isSearchMode } = this.props;
        return (isSearchMode) ? (
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className="fas fa-search"></i>
                    </InputGroupText>
                </InputGroupAddon>
                <input className='form-control' placeholder="Enter Brand" ref="searchInput" onChange={this._handleChangeSearchInput} />
            </InputGroup>
        ) : null
    }

    render() {
        const { isOpen } = this.state;
        const { activeItem, color, value_field, defaultTitle, maxHeight } = this.props;
        return (
            <Dropdown
                direction="down"
                className="sel-dropdown"
                isOpen={isOpen}
                toggle={this._handleToggleDropDown}
            >
                <DropdownToggle caret color={!!color ? color : 'light'}>
                    {
                        activeItem ? ((value_field) ? activeItem[value_field] : activeItem.value) : (defaultTitle)
                    }
                </DropdownToggle>
                <DropdownMenu
                    modifiers={(!!maxHeight) ? {
                        setmaxheight: {
                            enabled: true,
                            order: 890,
                            fn: (data) => {
                                return {
                                    ...data,
                                    styles: {
                                        ...data.styles,
                                        overflow: 'auto',
                                        maxHeight: maxHeight,
                                    },
                                };
                            },
                        },
                    } : null}
                >
                    {this._renderSearchInput()}
                    {this._renderItems()}
                </DropdownMenu>
            </Dropdown>
        )
    }
}

