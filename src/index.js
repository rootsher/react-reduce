import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Transform extends PureComponent {
    static propTypes = {
        transformers: PropTypes.arrayOf(PropTypes.string),
        toTransform: PropTypes.array,
    };

    constructor(...args) {
        super(...args);

        this._refs = {};
        this._attached = {};

        this.props.transformers.forEach(transformer => {
            this._refs[transformer] = component => {
                this._attached[transformer] = component;
            };
        });
    }

    render() {
        return this.props.children({
            response: this._transform(this.props.toTransform),
            refs: this._refs,
            onChange: () => this.forceUpdate(),
        });
    }

    _transform(toTransform) {
        return Object.keys(this._attached).reduce((result, name) => {
            return this._attached[name].transform(result);
        }, toTransform);
    }
}
