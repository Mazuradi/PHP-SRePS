import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Table extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: []
		};
	}

	componentDidMount() {
		//Get data for filling table.
	}

	render() {
		const columns = [
			{
				Header: 'Product Name',
				accessor: 'productName',
				style: {
					textAlign: 'center'
				}
			},
			{
				Header: 'Units Sold',
				accessor: 'unitsSold',
				filterable: false,
				style: {
					textAlign: 'center'
				},
				width: 100,
				maxWidth: 100,
				minWidth: 100
			},
			{
				Header: 'Revenue',
				accessor: 'revenue',
				filterable: false,
				style: {
					textAlign: 'center'
				},
				width: 100,
				maxWidth: 100,
				minWidth: 100
			},
			{
				Header: 'Populairty',
				accessor: 'popularity',
				filterable: false,
				style: {
					textAlign: 'center'
				},
				width: 100,
				maxWidth: 100,
				minWidth: 100
			}
		];

		return (
			<ReactTable
				columns={columns}
				data={this.state.data}
				filterable
				defaultPageSize={5}
				noDataText={'No Prediction Data Found'}
			/>
		);
	}
}

export default Table;
