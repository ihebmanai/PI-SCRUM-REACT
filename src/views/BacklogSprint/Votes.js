import React, { Component } from 'react';
import Widget03 from './VoteItem';
import { Col, Row } from 'reactstrap';
import axios from 'axios';
export default class Votes extends Component {
	state = {
		backlogs: []
	};
	componentDidMount() {
		axios.get('http://localhost:3000/backlog_sprint/diplayallVote').then((data) => {
			this.setState({ backlogs: data.data });
			console.log(data.data);
		});
	}
	render() {
		return (
			<Row>
				{this.state.backlogs.map((back, index) => (
					<Col xs="12" sm="6" lg="3">
						<Widget03
							vote={back}
							dataBox={() => ({
								variant: 'facebook',
								friends: '89k',
								feeds: '459',
								name: back.task_id,
								user: back
							})}
						>
							<div className="chart-wrapper" />
						</Widget03>
					</Col>
				))}
			</Row>
		);
	}
}
