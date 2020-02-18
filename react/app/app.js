/**
 * @file App component
 * @author kudlav & anik97 (MIT License)
 */

import React, { Component } from 'react';
import WidgetContainer from './widget/widgetContainer';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default class App extends Component {
	constructor(props) {
		super(props);

		this.removeWidget = this.removeWidget.bind(this);

		if (typeof window.localStorage.getItem('state') === 'string') {
			this.state = JSON.parse(window.localStorage.getItem('state'));
		}
		else {
			this.state = {
				cols: 1,
				widgets: [{
					type: 'rss',
					column: 0,
					title: 'RSS - odkaz.na.zdroj.dat',
					data: {}
				}, {
					type: 'rss',
					column: 0,
					title: 'RSS - www.paralelnilisty.cz',
					data: {}
				}, {
					type: 'forecast',
					column: 0,
					title: 'Počasí - Brno',
					data: {}
				}, {
					type: 'fzz',
					column: 0,
					title: 'Horoskop - Lev',
					data: {}
				}]
			};
		}
	}

	render () {
		return (
			<>
				<button onClick={this.resetState}>RESET</button>
				<ResponsiveGridLayout
					className="layout"
					breakpoints={{all: 0}}
					cols={{all: this.state.cols}}
					isResizable={false}
					onLayoutChange={this.onLayoutChange}
				>
					{this.state.widgets.map((widget, index) =>
						<div key={index} data-grid={{x: widget.column, y: index, w: 1, h: 1}}>
							<WidgetContainer
								widget={widget}
								id={index}
								onRemove={this.removeWidget}
							/>
						</div>
					)}
				</ResponsiveGridLayout>
			</>
		);
	}

	onLayoutChange(layout) {
		console.log(layout);
	}

	removeWidget(id) {
		this.setState((state) => {
			state.widgets.splice(id, 1);
			return {widgets: state.widgets.slice()};
		})
	}

	componentDidUpdate() {
		window.localStorage.setItem("state", JSON.stringify(this.state));
	}

	resetState() {
		alert("ok");
		window.localStorage.clear();
		location.reload();
	}
}
