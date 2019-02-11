import React, { Component } from 'react';
import { formatBytes } from '../utils';
import * as checkbox from './styled/checkbox';


export default class CheckboxItem extends Component {

    static propKeys = ['id', 'format', 'totalFileSize', 'checked'];

    shouldComponentUpdate(nextProps) {
        for (const key of CheckboxItem.propKeys) {
            if (nextProps[key] !== this.props[key]) {
                return true;
            }
        }
        return false;
    }

    render() {
        const { onChange, id, checked, format, totalFileSize } = this.props;
        return (
            <checkbox.CheckboxItem>
              <checkbox.CheckboxLabel>
                <checkbox.Checkbox onChange={onChange}
                                   id={id}
                                   checked={checked} />
                <span>{format}</span>
              </checkbox.CheckboxLabel>
              <span>{formatBytes(totalFileSize)}</span>
            </checkbox.CheckboxItem>
        );
    }
}
