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
			return (
				<div className={"rssWidget"}>
					{this.state.channel.items.map((item, key) =>
						<div key={key} className={"itemContainer"}>
							<div className={"itemTitle"} dangerouslySetInnerHTML={{__html: item.title}} />
							<div className={"itemDesc"} dangerouslySetInnerHTML={{__html: item.description}} />
						</div>
					)}
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
