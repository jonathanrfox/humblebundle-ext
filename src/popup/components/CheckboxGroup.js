import React, { Component } from 'react';

import { Row } from './styled/app';
import { CheckboxGroup, CheckboxGroupName } from './styled/checkbox';

import CheckboxItem from './CheckboxItem';


export default class _CheckboxGroup extends Component {

    static displayName = 'CheckboxGroup';

    render() {
        const { group, platform, onChange, isChecked } = this.props;
        const len = Math.round(group.products.length / group.meta.length);
        const name = len > 1 && !platform.endsWith('s') ? platform + 's' : platform;
        const checkboxItems = group.meta.map(({ id, format, totalFileSize }) => (
            <CheckboxItem key={id}
                          id={id}
                          format={format}
                          totalFileSize={totalFileSize}
                          onChange={onChange}
                          checked={isChecked(id)} />
        ));
        return (
            <Row>
              <CheckboxGroupName>
                {`${len} ${name}`}
              </CheckboxGroupName>
              <CheckboxGroup>
                {checkboxItems}
              </CheckboxGroup>
            </Row>
        );
    }
}
