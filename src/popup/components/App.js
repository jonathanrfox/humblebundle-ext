import path from 'path';
import React, { Component } from 'react';
import MDSpinner from 'react-md-spinner';
import {
    onMessage,
    removeMessageListener,
    sendMessage
} from '../../browser';
import { Types } from '../../types';
import { closeWindow } from '../../window';
import { Center, Header, Main, Popup } from './styled/app';
import Error from './Error';
import Form from './Form';


export default class App extends Component {

    CompFns = {
        PopupErrorFn: () => <Error/>,
        FormFn: (props = {}) => (
            <Form bundleName={props.bundleName}
                  categories={props.categories} />
        ),
        SpinnerFn: () => <Center><MDSpinner/></Center>
    };

    typeToComponent = {
        [Types.BACKGROUND_ACK]: this.CompFns.SpinnerFn,
        [Types.FETCH_RESPONSE]: this.CompFns.FormFn,
        [Types.FETCH_ERROR]: this.CompFns.PopupErrorFn,
        [Types.STORAGE_CHANGE]: this.CompFns.FormFn,
        TRANSITION: this.CompFns.SpinnerFn
    };

    constructor() {
        super();
        this.state = { getActiveComponent: this.typeToComponent.TRANSITION };
        this._handleIncomingData = this._handleIncomingData.bind(this);
    }

    _handleIncomingData(data) {
        const { type, payload } = data;
        const ComponentFn = this.typeToComponent[type];
        this.setState({ getActiveComponent: () => ComponentFn(payload) });
    }

    componentDidMount() {
        sendMessage({ type: Types.FETCH_REQUEST })
            .then(this._handleIncomingData, console.error);

        this.listener = onMessage(this._handleIncomingData);
    }

    componentWillUnmount() {
        removeMessageListener(this.listener);
    }

    render() {
        return (
            <Popup>
              <Header>
                <div>Humble Bundle</div>
                <a onClick={closeWindow}>×</a>
              </Header>
              <Main>
                {this.state.getActiveComponent()}
              </Main>
            </Popup>
        );
    }
}
