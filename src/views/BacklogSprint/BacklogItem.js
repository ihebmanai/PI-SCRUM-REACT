import React, { Component } from 'react';
import { Progress, Badge } from 'reactstrap';
import axios from 'axios';
class BacklogItem extends Component {
	state = { backlog: {}, prog: 0 };
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		axios.get('http://localhost:3000/backlog_sprint/user/5ccebbc46db2a922743dcf65').then((data) => {
			this.props.backlog.username = data.data.firstName;
			this.setState({ backlog: this.props.backlog });
			console.log(this.state.backlog);
		});

		axios.get('http://localhost:3000/backlog_sprint/dispalystory/' + this.props.backlog._id).then((data) => {
			var c = 0;
			data.data.map((i) => {
				if (i.state == 'done') c = c + 1;
			});
			this.setState({ prog: c / data.data.length * 100 });
		});
	}
	etat() {
		if (this.props.backlog.state == 'to do') {
			return (
				<td className="text-center">
					<Badge color="danger">TO DO</Badge>
				</td>
			);
		} else if (this.props.backlog.state == 'done') {
			return (
				<td className="text-center">
					<Badge color="success">DONE</Badge>
				</td>
			);
		} else {
			return (
				<td className="text-center">
					<Badge color="warning">DOING </Badge>
				</td>
			);
		}
	}
	handleClick = () => {
		this.props.props.history.push('/BackLogDetail/' + this.props.backlog._id);
	};
	render() {
		return (
			<tr onClick={this.handleClick}>
				<td className="text-center">
					<div className="avatar">
						<img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
						<span className="avatar-status badge-success" />
					</div>
				</td>
				<td>
					<div>{this.props.backlog.username}</div>
					<div className="small text-muted">
						<span>New</span> | Registered: Jan 1, 2015
					</div>
				</td>
				<td className="text-center">
					<div>{this.props.backlog.taskname}</div>
				</td>
				<td>
					<div className="clearfix">
						<div className="float-left">
							<strong>{Math.trunc(this.state.prog)}%</strong>
						</div>
						<div className="float-right">
							<small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
						</div>
					</div>
					<Progress className="progress-xs" color="success" value={Math.trunc(this.state.prog)} />
				</td>
				{this.etat()}
			</tr>
		);
	}
}
export default BacklogItem;
