import React, { Component } from 'react';
import { Row } from './styled/app';
import * as checkbox from './styled/checkbox';
import CheckboxItem from './CheckboxItem';


export default class CheckboxGroup extends Component {

    render() {
        const { platform, count, productGroups, onChange, isChecked } = this.props;
        const name = count > 1 && !platform.endsWith('s') ? platform + 's' : platform;
        const checkboxItems = Object
              .entries(productGroups)
              .map(([ format, { id, totalFileSize }]) => (
                  <CheckboxItem key={id}
                                id={id}
                                format={format}
                                totalFileSize={totalFileSize}
                                onChange={onChange}
                                checked={isChecked(id)} />
              ));
        return (
            <Row>
              <checkbox.CheckboxGroupName>
                {`${count} ${name}`}
              </checkbox.CheckboxGroupName>
              <checkbox.CheckboxGroup>
                {checkboxItems}
              </checkbox.CheckboxGroup>
            </Row>
        );
    }
}
