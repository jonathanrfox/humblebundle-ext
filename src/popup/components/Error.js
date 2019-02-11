import React, { Component } from 'react';
import { sendMessage } from '../../browser';
import { Types } from '../../types';
import { Text, Title } from './styled/app';
import { Button, ButtonGroup } from './styled/buttons';


export default class Error extends Component {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        sendMessage({ type: Types.RELOAD_TAB });
    }

    render() {
        return (
            <div>
              <Title color="white">No Data Found!</Title>
              <Text fontSize={14}>
                Click the button below to reload the current tab.
              </Text>
              <ButtonGroup alignment="center">
                <Button onClick={this.onClick}
                        background="#6DC066">Reload</Button>
              </ButtonGroup>
            </div>
        );
    }
}
