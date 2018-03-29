import React, { Component } from 'react';

import { sendMessage } from '../../browser';
import { Types } from '../../common';
import { closeWindow } from '../../window';

import { Card, Title, Text } from './styled/app';
import { Button, ButtonGroup } from './styled/buttons';
import { Form } from './styled/form';

import CheckboxGroup from './CheckboxGroup';


const errorMessage = (message) => (
    <Text color="red">* {message}</Text>
);

export default class _Form extends Component {

    static displayName = 'Form';

    constructor(props) {
        super(props);
        let state = {
            error: undefined,
            form: {}
        };

        for (const groupArr of Object.values(props.data))
            for (const { meta } of groupArr)
                for (const { id } of meta)
                    state.form[id] = false;

        this.state = state;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        if (!Object.values(this.state.form).some(x => x)) {
            this.setState({
                error: 'Need to select at least one checkbox.'
            });
        } else {
            const submitData = {
                form: this.state.form,
                data: this.props.data,
                machine_name: this.props.machine_name
            };
            sendMessage({ type: Types.DOWNLOAD_REQUEST, payload: submitData });
            closeWindow();
        }
    }

    onChange({ target: { id }}) {
        this.setState(prevState => {
            const nextState = !prevState.form[id];
            return {
                form: {
                    ...prevState.form,
                    [id]: nextState
                },
                error: nextState ? undefined : prevState.error
            };
        });
    }

    isChecked(id) {
        return this.state.form[id];
    }

    render() {
        const { data, title } = this.props;
        const { error } = this.state;

        const checkboxGroups = Object.entries(data).map(([ platform, groups ]) => (
            groups.map((group, idx) => (
                <CheckboxGroup key={idx}
                               platform={platform}
                               group={group}
                               onChange={this.onChange}
                               isChecked={this.isChecked} />
            ))
        ));

        return (
            <Form onSubmit={this.onSubmit}>
              <Card>
                <Title>{title}</Title>
                {checkboxGroups}
                {error && errorMessage(error)}
              </Card>
              <ButtonGroup>
                <Button type="submit">Download</Button>
              </ButtonGroup>
            </Form>
        );
    }
}
