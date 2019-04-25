import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Widget02 from './VoteWidget';
import api from '../../api';
import axios from 'axios';
export default class TaskVote extends Component {
	state = {
		backlogs: []
	};
	componentDidMount() {
		axios.get('http://localhost:3000/backlog_sprint/unaffectedTasks/1').then(async (data) => {
			this.setState({ backlogs: data.data });
		});
	}
	render() {
		return (
			<div>
				<Row>
					{this.state.backlogs.map((back, index) => (
						<Col xs="12" sm="6" lg="3">
							<Widget02
								props={this.props}
								vote={back}
								header=""
								mainText={back.taskname}
								icon="fa fa-cogs"
								color="primary"
								footer
								link="#/charts"
							/>
						</Col>
					))}
				</Row>
			</div>
		);
	}
}
