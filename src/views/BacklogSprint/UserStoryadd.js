import React, { Component } from 'react';
import { Badge } from 'reactstrap';
class UserStoryadd extends Component {
	etat() {
		if (this.props.story.state == 'to do') {
			return (
				<td className="text-center">
					<Badge color="danger">TO DO</Badge>
				</td>
			);
		} else if (this.props.story.state == 'done') {
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
	render() {
		return (
			<tr>
				<td>{this.props.story.storyname}</td>
				<td>{this.props.story.description}</td>
				<td>{this.props.story.estimation}</td>
				<td>{this.props.story.complexite}</td>
				<td>{this.etat()}</td>
			</tr>
		);
	}
}
export default UserStoryadd;
