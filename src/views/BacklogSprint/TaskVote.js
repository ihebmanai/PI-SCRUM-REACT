import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Widget02 from './VoteWidget';
import api from '../../api';
import axios from 'axios';
export default class TaskVote extends Component {
	state = {
		backlogs: [],
		wishlist: []
	};
	list;
	async componentDidMount() {
		await axios.get('http://localhost:3000/backlog_sprint/unaffectedTasks/1').then(async (data) => {
			this.setState({ backlogs: data.data });
			this.list = data.data;
		});
		await axios
			.get('http://localhost:3000/backlog_sprint/displayVote/5ca4c3ac3bfc1ab634ecab55')
			.then(async (data) => {
				this.setState({ wishlist: data.data });
				console.log(this.state.wishlist);
			});
		this.state.backlogs.map((e, i) => {
			this.state.wishlist.map((x) => {
				if (e._id == x.task_id )  {
					this.list.splice(i, 1);
				}
			});
		});
		console.log(this.list);
		this.setState({ backlogs: this.list });
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
