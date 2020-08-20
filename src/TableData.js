import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default class TableData extends Component {
    render() {
        return (
            <tr onClick={() => this.props.handleClick(this.props.obj)}>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.status}</td>
                <td>{new Date(this.props.obj.date.timestamp).toISOString()}</td>
            </tr>
        );
    }
}