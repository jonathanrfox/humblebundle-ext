import React, { Component } from 'react';

import { formatBytes } from '../utils';

import {
    Checkbox,
    CheckboxItem,
    CheckboxLabel
} from './styled/checkbox';


export default class _CheckboxItem extends Component {

    static displayName = 'CheckboxItem';
    static propKeys = ['id', 'format', 'totalFileSize', 'checked'];

    shouldComponentUpdate(nextProps) {
        for (const key of _CheckboxItem.propKeys)
            if (nextProps[key] !== this.props[key])
                return true;
        return false;
    }

    render() {
        const { onChange, id, checked, format, totalFileSize } = this.props;
        return (
            <CheckboxItem>
              <CheckboxLabel>
                <Checkbox onChange={onChange}
                          id={id}
                          checked={checked} />
                <span>{format}</span>
              </CheckboxLabel>
              <span>{formatBytes(totalFileSize)}</span>
            </CheckboxItem>
        );
    }
}
