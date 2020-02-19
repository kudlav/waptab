/**
 * @file App component
 * @author kudlav & anik97 (MIT License)
 */

import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import WidgetContainer from './widget/widgetContainer';
import Settings from "./settings/settings";
import Search from './search/search';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default class App extends Component {
	constructor(props) {
		super(props);

		this.removeWidget = this.removeWidget.bind(this);
		this.moveWidget = this.moveWidget.bind(this);
		this.changeCols = this.changeCols.bind(this);

		if (typeof window.localStorage.getItem('state') === 'string') {
			this.state = JSON.parse(window.localStorage.getItem('state'));
		}
		else {
			this.state = {
				cols: 2,
				engines: {
					'Google': 'https://www.google.com/search?q=',
					'DuckDuckGo': 'https://duckduckgo.com/?q=',
					'Seznam': 'https://search.seznam.cz/?q=',
					'Mapy.cz': 'https://mapy.cz/?q='
				},
				engine: 'DuckDuckGo',
				widgets: {
					'rss0': {
						type: 'rss',
						column: 0,
						row: 0,
						title: 'RSS - odkaz.na.zdroj.dat',
						data: {}
					},
					'rss1': {
						type: 'rss',
						column: 0,
						row: 1,
						title: 'RSS - www.paralelnilisty.cz',
						data: {}
					},
					'forecast0': {
						type: 'forecast',
						column: 0,
						row: 2,
						title: 'Počasí - Brno',
						data: {}
					},
					'fzz0': {
						type: 'fzz',
						column: 0,
						row: 3,
						title: 'Horoskop - Lev',
						data: {}
					}
				}
			};
		}
	}

	render () {
		return (
			<>
				<button onClick={this.resetState}>RESET</button>
				<div className={"head"}>
					<div />
					<Search engines={this.state.engines} engine={this.state.engine} />
					<Settings cols={this.state.cols} changeCols={this.changeCols} />
				</div>

				<ResponsiveGridLayout
					className="layout"
					breakpoints={{all: 0}}
					cols={{all: this.state.cols}}
					isResizable={false}
					onLayoutChange={this.moveWidget}
				>
					{Object.keys(this.state.widgets).map((id) => {
						const widget = this.state.widgets[id];
						return (
							<div key={id} data-grid={{x: widget.column, y: widget.row, w: 1, h: 1}}>
								<WidgetContainer id={id} widget={widget} onRemove={this.removeWidget} />
							</div>
						);
					})}
				</ResponsiveGridLayout>
			</>
		);
	}

	componentDidUpdate() {
		window.localStorage.setItem("state", JSON.stringify(this.state));
	}

	moveWidget(layout) {
		this.setState(state => {
			const newWidgets = Object.assign({}, state.widgets);
			Object.values(layout).forEach(item => {
				newWidgets[item.i].column = item.x;
				newWidgets[item.i].row = item.y;
			});
			return { widgets: newWidgets };
		});
	}

	/**
	 * Remove widget
	 * @param id int
	 */
	removeWidget(id) {
		this.setState(state => {
			const newWidgets = Object.assign({}, state.widgets);
			const column = newWidgets[id].column;
			const row = newWidgets[id].row;
			delete newWidgets[id]; // remove widget
			// decrease row of below widgets
			Object.values(newWidgets).forEach(widget => {
				if (widget.column === column && widget.row > row) {
					widget.row -= 1;
				}
			});
			return { widgets: newWidgets };
		});
	}

	resetState() {
		window.localStorage.clear();
		location.reload();
	}

	/**
	 *
	 * @param number int
	 */
	changeCols(number) {
		// todo workaround, see https://github.com/STRML/react-grid-layout/issues/1122
		const newState = Object.assign({}, this.state);
		newState.cols = number;
		window.localStorage.setItem("state", JSON.stringify(newState));
		location.reload();
	}
}
