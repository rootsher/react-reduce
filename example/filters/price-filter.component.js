import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PriceFilter extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        defaultValue: PropTypes.string,
    };

    static defaultProps = {
        onChange: () => {},
        value: 'all',
    };

    state = ModeFilter.defaultProps;

    render() {
        return (
            <select
                value={this.state.value}
                onChange={event => this._onChange(event)}
            >
                <option value="all">all</option>
                <option value="less">price less than 100</option>
                <option value="greater">price greater than 100</option>
            </select>
        );
    }

    transform(list) {
        if (this.state.value === 'all') {
            return list;
        }

        if (this.state.value === 'less') {
            return list.filter(element => (element.price < 100));
        } else if (this.state.value === 'greater') {
            return list.filter(element => (element.price > 100));
        }
    }

    _onChange(event) {
        const { value } = event.target;

        this.setState({ value }, () => this.props.onChange(value));
    }
}
