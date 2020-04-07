/**
 * @file App component
 * @author kudlav & anik97 (MIT License)
 */

import React, { Component } from 'react';
import './widget.scss'

export default class ForecastWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {items: [],ready: false,number: 1};
	  }

	getFutureDate(numberOfDays){
		const date = new Date();
		date.setDate(date.getDate() + numberOfDays);

		const dd = String(date.getDate()).padStart(2, '0');
		const mm = String(date.getMonth() + 1).padStart(2, '0');

		return dd + '.' + mm + '.';
	}

	componentDidMount() {
		 import("./dataSource/accuweather").then(source => {
			source.getWeather('London').then(items => this.setState({items, ready: true}));
		 });

		 this.props.done();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.ready !== this.state.ready) this.props.done();
	}

	render() {
			return (
				<div className={"forecastWidget"}>
					<div className={"weatherColumn"}>
						<div className={"columnHeader"}>Dnes</div><br/>
						{this.state.ready && <>
							<h2>{this.state.items[0].temp} °C</h2> <br/>
							<span>{this.state.items[0].weather}
							</span><br/>
							<img src={this.state.items[0].icon}  alt={"weather pictogram"}/>
						</>}
					</div>
					<div className={"weatherColumn"}>
						<div className={"columnHeader"}>Zítra</div><br/>
						{this.state.ready && <>
							<h2>{this.state.items[1].temp} °C</h2> <br/>
							<span>{this.state.items[1].weather}</span><br/>
							<img src={this.state.items[1].icon} alt={"weather pictogram"} />
						</>}
					</div>
					<div className={"weatherColumn"}>
					<div className={"columnHeader"}>{this.getFutureDate(2)}</div><br/>
						{this.state.ready && <>
							<h2>{this.state.items[2].temp} °C</h2> <br/>
							<span>{this.state.items[2].weather}</span><br/>
							<img src={this.state.items[2].icon} alt={"weather pictogram"} />
						</>}
					</div>
					<div className={"weatherColumn"}>
					<div className={"columnHeader"}>{this.getFutureDate(3)}</div><br/>
						{this.state.ready && <>
							<h2>{this.state.items[3].temp} °C</h2> <br/>
							<span>{this.state.items[3].weather}</span><br/>
							<img src={this.state.items[3].icon} alt={"weather pictogram"} />
						</>}
					</div>
				</div>
			);
	  }
}
