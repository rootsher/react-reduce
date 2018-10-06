import React, { Component } from 'react';
import { render } from 'react-dom';

class Transform extends Component {
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

    componentDidMount() {
        this.forceUpdate();
    }

    _transform(toTransform) {
        return Object.keys(this._attached).reduce((result, name) => {
            return this._attached[name].transform(result);
        }, toTransform);
    }
}

class Filter extends Component {
    state = {
        value: "1",
    };

    render() {
        return (
            <select value={this.state.value} onChange={event => {
                this.setState({ value: event.target.value });
                this.props.onChange(event.target.value);
            }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        );
    }

    transform(list) {
        return list.slice(parseInt(this.state.value));
    }
}

class App extends Component {
    render() {
        return (
            <Transform toTransform={['a', 'b', 'c']} transformers={['filter', 'filter2']}>
                {({ response, refs, onChange }) => (
                    <React.Fragment>
                        <Filter ref={refs.filter} onChange={onChange}/>
                        <Filter2 ref={refs.filter2} onChange={onChange}/>
                        <pre>{JSON.stringify(response, null, '\t')}</pre>
                    </React.Fragment>
                )}
            </Transform>
        );
    }
}


class Filter2 extends Component {
    state = {
        value: "2",
    };

    render() {
        return (
            <select value={this.state.value} onChange={event => {
                this.setState({ value: event.target.value });
                this.props.onChange(event.target.value);
            }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        );
    }

    transform(list) {
        console.log(list);
        return list.slice(parseInt(this.state.value));
    }
}

render(<App/>, document.getElementById('root'));
