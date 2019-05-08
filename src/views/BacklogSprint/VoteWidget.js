import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardFooter, Button, Alert } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import axios from 'axios';

const propTypes = {
	header: PropTypes.string,
	mainText: PropTypes.string,
	icon: PropTypes.string,
	color: PropTypes.string,
	variant: PropTypes.string,
	footer: PropTypes.bool,
	link: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	cssModule: PropTypes.object
};

const defaultProps = {
	header: 'Login',
	mainText: 'Income',
	icon: 'fa fa-cogs',
	color: 'primary',
	variant: '0',
	link: '#',
	vote: {}
};

class VoteWidget extends Component {
	state = {
		click: true
	};
	componentDidMount() {
		console.log(this.props.vote._id);
	}
	clicko = () => {
			axios.post('http://localhost:3000/backlog_sprint/voteTask', {
				user_id: '5ca4c3ac3bfc1ab634ecab55',
				task_id: this.props.vote._id
			});
			console.log(this.props.vote._id);
			this.setState({ click: false });
	};
	footerr = () => {
		if (this.state.click == true)
			return (
				<Button onClick={this.clicko} block color="success">
					Wish List
				</Button>
			);
		else
			return (
				<div>
					<br />
					<Alert color="success">
						{/*eslint-disable-next-line*/}
						Check {' '}
						<a href={'/wishlist'} className="alert-link">
							Wish list
						</a>
					</Alert>
				</div>
			);
	};
	redirect = () => {
		this.props.props.history.push('/backlogdetail/' + this.props.vote._id);
	};
	render() {
		const {
			className,
			cssModule,
			header,
			mainText,
			icon,
			color,
			footer,
			link,
			children,
			variant,
			...attributes
		} = this.props;

		// demo purposes only
		const padding =
			variant === '0'
				? { card: 'p-3', icon: 'p-3', lead: 'mt-2' }
				: variant === '1'
					? {
							card: 'p-0',
							icon: 'p-4',
							lead: 'pt-3'
						}
					: { card: 'p-0', icon: 'p-4 px-5', lead: 'pt-3' };

		const card = { style: 'clearfix', color: color, icon: icon, classes: '' };
		card.classes = mapToCssModules(classNames(className, card.style, padding.card), cssModule);

		const lead = { style: 'h5 mb-0', color: color, classes: '' };
		lead.classes = classNames(lead.style, 'text-' + card.color, padding.lead);

		const blockIcon = function(icon) {
			const classes = classNames(icon, 'bg-' + card.color, padding.icon, 'font-2xl mr-3 float-left');
			return <i className={classes} />;
		};

		const cardFooter = function() {
			if (footer) {
				return (
					<CardFooter className="px-3 py-2">
						<a
							onClick={this.redirect}
							className="font-weight-bold font-xs btn-block text-muted"
							href={link}
						>
							Task Detail
							<i className="fa fa-angle-right float-right font-lg" />
						</a>
					</CardFooter>
				);
			}
		};

		return (
			<Card>
				<CardBody className={card.classes} {...attributes}>
					{blockIcon(card.icon)}
					<div className={lead.classes}>{header}</div>
					<div className="text-muted text-uppercase font-weight-bold font-xs">{mainText}</div>
					{this.footerr()}
				</CardBody>
				<CardFooter className="px-3 py-2">
					<a onClick={this.redirect} className="font-weight-bold font-xs btn-block text-muted">
						Task Detail
						<i className="fa fa-angle-right float-right font-lg" />
					</a>
				</CardFooter>{' '}
			</Card>
		);
	}
}

VoteWidget.propTypes = propTypes;
VoteWidget.defaultProps = defaultProps;

export default VoteWidget;
