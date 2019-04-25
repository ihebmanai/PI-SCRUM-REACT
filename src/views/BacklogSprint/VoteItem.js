import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	cssModule: PropTypes.object,
	dataBox: PropTypes.func
};

const defaultProps = {
	dataBox: () => ({ variant: 'facebook', friends: '-', feeds: '-', name: '', user: '' })
};

class Widget03 extends Component {
	state = {
		visible: true,
		user: '',
		task: ''
	};
	componentDidMount() {
		console.log(this.props.dataBox().user.user_id);
		axios.get('http://localhost:3000/backlog_sprint/user/5ca4c3ac3bfc1ab634ecab55').then((data) => {
			this.setState({ user: data.data.name });
		});
		axios.get('http://localhost:3000/backlog_sprint/taskByid/' + this.props.dataBox().user.task_id).then((data) => {
			this.setState({ task: data.data.taskname });
		});
	}
	accept = () => {
		axios.post('http://localhost:3000/backlog_sprint/acceptTask', {
			vote_id: this.props.dataBox().user._id,
			task_id: this.props.dataBox().user.task_id,
			user_id: this.props.dataBox().user.user_id
		});
		console.log('accpted');
		this.setState((prevState) => ({
			visible: !prevState.visible
		}));
	};
	refuse = () => {
		axios.get('http://localhost:3000/backlog_sprint/refuseTask/' + this.props.dataBox().user._id);
		console.log('refused');
		this.setState((prevState) => ({
			visible: !prevState.visible
		}));
	};
	render() {
		if (!this.state.visible) {
			return null;
		}
		console.log(this.state);

		// eslint-disable-next-line
		const { children, className, cssModule, dataBox, ...attributes } = this.props;

		// demo purposes only
		const data = dataBox();
		const variant = data.variant;

		if (!variant || [ 'facebook', 'twitter', 'linkedin', 'google-plus' ].indexOf(variant) < 0) {
			return null;
		}

		const back = 'bg-' + variant;
		const icon = 'fa fa-' + variant;
		const keys = Object.keys(data);
		const vals = Object.values(data);

		const classCard = 'brand-card';
		const classCardHeader = classNames(`${classCard}-header`, back);
		const classCardBody = classNames(`${classCard}-body`);
		const classes = mapToCssModules(classNames(classCard, className), cssModule);

		return (
			<div className={classes}>
				<b>
					{this.state.task} : {this.state.user}
				</b>
				<div className={classCardHeader}>
					<div className="">
						<img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
						<span className="avatar-status badge-success" />
					</div>{' '}
					{children}
				</div>
				<div className={classCardBody}>
					<div>
						<Button block color="success" onClick={this.accept}>
							Accept
						</Button>
					</div>
					<div>
						<Button onClick={this.refuse} block color="danger">
							Decline
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

Widget03.propTypes = propTypes;
Widget03.defaultProps = defaultProps;

export default Widget03;
