import React, { Component } from 'react';
import { sendMessage } from '../../browser';
import { Types } from '../../types';
import { closeWindow } from '../../window';
import { Card, Title, Text } from './styled/app';
import { Button, ButtonGroup } from './styled/buttons';
import * as form from './styled/form';
import CheckboxGroup from './CheckboxGroup';


const errorMessage = (message) => (
    <Text color="red">* {message}</Text>
);

export default class Form extends Component {

    constructor(props) {
        super(props);
        const state = {
            error: undefined,
            form: {}
        };

        for (const category of Object.values(props.categories)) {
            for (const { id } of Object.values(category.productGroups)) {
                state.form[id] = false;
            }
        }
        this.state = state;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    onSubmit(productData, event) {
        event.preventDefault();

        const selectedIds = Object.entries(this.state.form)
              .filter(([ id, selected ]) => selected)
              .map(([ id ]) => id);

        if (selectedIds.length === 0) {
            this.setState({ error: 'Need to select at least one checkbox.' });
        } else {
            const payload = selectedIds.reduce((arr, id) => arr.concat(productData[id]), []);
            sendMessage({ payload, type: Types.DOWNLOAD_REQUEST });
            closeWindow();
        }
    }

    onChange({ target: { id }}) {
        this.setState(prevState => {
            const updates = { [id]: !prevState.form[id] };
            return {
                form: {
                    ...prevState.form,
                    ...updates
                },
                error: updates[id] ? undefined : prevState.error
            };
        });
    }

    isChecked(id) {
        return this.state.form[id];
    }

    render() {
        const { categories, bundleName } = this.props;
        const { error } = this.state;

        const productData = {};
        for (const { productGroups } of Object.values(categories)) {
            for (const { id, products } of Object.values(productGroups)) {
                productData[id] = products;
            }
        }

        const checkboxGroups = Object.entries(categories)
              .map(([ category, { platform, count, productGroups }]) => (
                  <CheckboxGroup key={category}
                                 platform={platform}
                                 count={count}
                                 productGroups={productGroups}
                                 onChange={this.onChange}
                                 isChecked={this.isChecked} />
              ));

        return (
            <form.Form onSubmit={(event) => this.onSubmit(productData, event)}>
              <Card>
                <Title>{bundleName}</Title>
                {checkboxGroups}
                {error && errorMessage(error)}
              </Card>
              <ButtonGroup>
                <Button type="submit">Download</Button>
              </ButtonGroup>
            </form.Form>
        );
    }
}
