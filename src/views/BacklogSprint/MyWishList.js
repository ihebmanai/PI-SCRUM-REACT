import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import WishItem from './WishItem';
import axios from 'axios';

export default class extends Component {
	state = { votes: [] };
	componentDidMount() {
		axios.get('http://localhost:3000/backlog_sprint/displayVote/5ccebbc46db2a922743dcf65').then((data) => {
			this.setState({ votes: data.data });
		});
	}
	render() {
		return (
			<Card>
				<CardHeader>
					<i className="fa fa-align-justify" /> My wish List
				</CardHeader>
				<CardBody>
					<Table responsive striped>
						<thead>
							<tr>
								<th>Task Name</th>
								<th>Description</th>
								<th>Time Estimation</th>
								<th>Complexite Estimation</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>{this.state.votes.map((vote) => <WishItem vote={vote} />)}</tbody>
					</Table>
					<Pagination>
						<PaginationItem disabled>
							<PaginationLink previous tag="button">
								Prev
							</PaginationLink>
						</PaginationItem>
						<PaginationItem active>
							<PaginationLink tag="button">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink tag="button">2</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink tag="button">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink tag="button">4</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink next tag="button">
								Next
							</PaginationLink>
						</PaginationItem>
					</Pagination>
				</CardBody>
			</Card>
		);
	}
}
