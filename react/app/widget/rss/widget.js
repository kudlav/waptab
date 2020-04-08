/**
 * @file App component
 * @author kudlav & anik97 (MIT License)
 */

import React, { Component } from 'react';
import * as rssParser from 'react-native-rss-parser';
import './widget.scss'

export default class RssWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {channel: [],ready: false};
	  }

	componentDidMount() {
		return fetch(`https://cors-anywhere.herokuapp.com/${this.props.data.source}`)
		.then((response) => response.text())
		.then((responseData) => rssParser.parse(responseData))
		.then((rss) => {
		this.setState({channel: rss,ready:true});
		this.props.done();
		});
	}

	render() {
		if(this.state.ready)
		{
			const items = this.state.channel.items.map((item, key) =>
				<div className={"itemContainer"}>
					<div className={"itemTitle"}>{item.title}</div>
					<div className={"itemDesc"}>{item.description}</div>
				</div>
			);

			return (
				<div className={"rssWidget"}>
				{items}
				</div>
				);
		}
		else
		{
			return (
				<div>
					Načítání...
				</div>
			);
		}
	}
}
