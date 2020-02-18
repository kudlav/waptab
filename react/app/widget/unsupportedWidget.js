/**
 * @file Fallback widget component
 * @author kudlav & anik97 (MIT License)
 */

import React, { Component } from 'react';

export default class UnsupportedWidget extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	/**
	 * Update state so the next render will show the fallback UI.
	 * @param error
	 * @returns {{hasError: boolean}}
	 */
	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <strong>Widget se nepodařilo načíst.</strong>;
		}

		return this.props.children;
	}
}
