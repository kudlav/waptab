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

		var dd = String(date.getDate()).padStart(2, '0');
    	var mm = String(date.getMonth() + 1).padStart(2, '0'); 
    	var yyyy = date.getFullYear();

    	var output = dd + '.' + mm+'.';
    	return output;

		return ;
	}

	componentDidMount() {
		 import("./dataSource/accuweather").then(source => {
			source.getWeather('London').then(items => this.setState({items, ready: true}));
		  });
	  }

	render() {
		console.log(this.state.number);
		console.log(this.state.items);

		if(this.state.ready)
		{
			return (
				<div className={"forecastWidget"}>
					<div className={"weatherColumn"}>
						<div className={"columnHeader"}>Dnes</div><br/>
						<h2>{this.state.items[0].temp} °C</h2> <br/>
						<span>{this.state.items[0].weather}</span><br/>
						<img src={this.state.items[0].icon} />
					</div>
					<div className={"weatherColumn"}>
						<div className={"columnHeader"}>Zítra</div><br/>
						<h2>{this.state.items[1].temp} °C</h2> <br/>
						<span>{this.state.items[1].weather}</span><br/>
						<img src={this.state.items[1].icon} />
					</div>
					<div className={"weatherColumn"}>
					<div className={"columnHeader"}>{this.getFutureDate(2)}</div><br/>
						<h2>{this.state.items[2].temp} °C</h2> <br/>
						<span>{this.state.items[2].weather}</span><br/>
						<img src={this.state.items[2].icon} />
					</div>
					<div className={"weatherColumn"}>
					<div className={"columnHeader"}>{this.getFutureDate(3)}</div><br/>
						<h2>{this.state.items[3].temp} °C</h2> <br/>
						<span>{this.state.items[3].weather}</span><br/>
						<img src={this.state.items[3].icon} />
					</div>
				</div>
			);
		}
		else
		{
			return (
				<div className={"forecastWidget"}>

			</div>
			);
		}
	  }

	
}



