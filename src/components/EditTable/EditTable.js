import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Input, Typography } from '@material-ui/core';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Paper from 'material-ui/Paper'
import TextField from '@material-ui/core/TextField';

export default class EditTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleRemove(index) {
        return (event) => {
            this.setState((prev) => {
                prev.rows.splice(index, 1);
                return { rows: prev.rows };
            });
            this.props.onChange(this.state.rows);
        }
    }
    handleAdd(event) {
        this.setState((prev) => {
            let a = {};
            for (let i = 0; i < this.props.cols.length; i++) {
                a[this.props.cols[i].fieldName] = '';
            }
            this.props.onChange(prev.rows.concat([a]));
            return { rows: prev.rows.concat([a]) };
        });

    }
    handleChange(index, col) {
        return (event) => {
            this.setState((prev) => {
                let row = prev.rows[index];
                row[col] = document.getElementById(col + '' + index).value;
                prev.rows[index] = row;
                return { rows: prev.rows };
            });
            this.props.onChange(this.state.rows);
        }
    }
    render() {
        const { id } = this.props;
        return (
            <div>
                <Paper style={{ /*display: 'flex', flexDirection: 'column',*/ height: '40vh', overflowX: 'scroll', overFlowY: 'scroll' }}>
                    <Table style={{ /*display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',*/ height:'40vh',overflowX:'scroll' }}>
                        <TableHead style={{ display: 'flex', flexDirection: 'column' }}>
                            <TableRow style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                {this.props.cols.map((obj, index) =>(
                                    <TableCell
                                        key={id + '_head_' + index}
                                        style={{
                                            flex: '1',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            boxSizing: 'border-box',
                                            paddingTop: '1rem',
                                            ...obj.style,
                                        }}><Typography variant='body1' >{obj.title}</Typography></TableCell>
                                ))}
                                <TableCell style={{ flex: '0.25' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ display: 'flex', flexDirection: 'column' }}>
                            {
                                this.state.rows.map((row, rowindex) => {
                                    return (
                                        <TableRow
                                            key={id + '_row_' + rowindex}
                                            style={{
                                                boxSizing: 'border-box',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-evenly', height: '4rem', padding: '0.5rem 0rem'
                                            }}>
                                            {Object.keys(row).map((val, index) => {
                                                return (
                                                    <TableCell
                                                        key={id + '_rowcell_' + index}
                                                        style={{ flex: '1', justifyContent: 'center', padding: '0rem 1.5rem' }}>
                                                        <TextField
                                                            key={id + '_text_' + index}
                                                            variant='standard'
                                                            placeholder={val}
                                                            id={val + '' + rowindex} name={val}
                                                            fullWidth={true}
                                                            onChange={this.handleChange(rowindex, val)}
                                                            value={row[val]}
                                                            inputProps={this.props.cols[index].inputProps}
                                                        />
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell
                                                key={id + '_remove_' + rowindex}
                                                style={{ flex: '0.25', boxStyle: 'border-box', padding: 0 }}>
                                                <IconButton iconStyle={{ color: '#03a9f4' }} margin='none' onClick={this.handleRemove(rowindex)}>
                                                    <ContentRemoveCircle />
                                                </IconButton>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
                <RaisedButton
                    label='Add'
                    primary={true}
                    style={{ margin: '1em' }}
                    onClick={this.handleAdd}
                />
            </div>
        );
    }
}