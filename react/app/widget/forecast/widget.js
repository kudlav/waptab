/**
 * @file App component
 * @author kudlav & anik97 (MIT License)
 */

import React, { Component } from 'react';
import './widget.scss'

export default class ForecastWidget extends Component {
	render() {
		return (
			<div className={"forecastWidget"}>
				Jasno až polojasno, místy přeháňky, ojediněle silné bořky a vydatné sněžení.
			</div>
		);
	}
}
