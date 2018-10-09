import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ModeFilter extends Component {
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
                <option value="virtual">virtual</option>
                <option value="real">real</option>
            </select>
        );
    }

    transform(list) {
        return (this.state.value === 'all') ? list : (
            list.filter(element => element.mode === this.state.value)
        );
    }

    _onChange(event) {
        const { value } = event.target;

        this.setState({ value }, () => this.props.onChange(value));
    }
}
