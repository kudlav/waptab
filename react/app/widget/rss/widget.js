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
		const RSS_URL = 'http://www.nasa.gov/rss/dyn/breaking_news.rss';
		return fetch('https://cors-anywhere.herokuapp.com/'+RSS_URL)
		.then((response) => response.text())
		.then((responseData) => rssParser.parse(responseData))
		.then((rss) => {
		this.setState({channel: rss,ready:true});
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

			console.log(this.state.channel.items);
			return (
				<div className={"rssWidget"}>
				{items}
				</div>
				);
		}
		else
		{
			return (
				<p>
					Načítání...
				</p>
			);
		}
	}
}
