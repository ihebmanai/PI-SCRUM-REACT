import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import axios from 'axios';

class demande extends Component {
	state = {
		backlog: {},
		state: ''
	};
	componentDidMount() {
		axios.get('http://localhost:3000/backlog_sprint/taskByid/' + this.props.vote.task_id).then((data) => {
			this.setState({ backlog: data.data, state: this.props.vote.state });
			console.log(data.data);
		});
	}
	etat() {
		if (this.state.state == 'en cours') return <Badge color="warning">pending</Badge>;
		if (this.state.state == 'accepted') return <Badge color="success">accpeted</Badge>;
		if (this.state.state == 'refused') return <Badge color="danger">refused</Badge>;
	}
	render() {
		return (
			<tr>
				<td>{this.state.backlog.taskname}</td>
				<td>{this.state.backlog.descrip}</td>
				<td>{this.state.backlog.estimation}</td>
				<td>{this.state.backlog.complexite}</td>
				<td>{this.etat()}</td>
			</tr>
		);
	}
}
export default demande;
