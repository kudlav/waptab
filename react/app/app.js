/**
 * @file App component
 * @author kudlav & anik97 (MIT License)
 */

import React, {Component} from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import WidgetContainer from './widget/widgetContainer';
import Settings from "./settings/settings";
import Search from './search/search';
import defaultState from './defaultState'
import AddWidget from './widget/addWidget';
import SettingsContainer from './widget/settingsContainer';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default class App extends Component {
	constructor(props) {
		super(props);

		this.addWidget = this.addWidget.bind(this);
		this.removeWidget = this.removeWidget.bind(this);
		this.moveWidget = this.moveWidget.bind(this);
		this.changeSettings = this.changeSettings.bind(this);
		this.exportState = this.exportState.bind(this);
		this.updateHeight = this.updateHeight.bind(this);
		this.changeWidgetData = this.changeWidgetData.bind(this);
		this.showWidgetSettings = this.showWidgetSettings.bind(this);

		if (typeof window.localStorage.getItem('state') === 'string') {
			this.state = JSON.parse(window.localStorage.getItem('state'));
		}
		else {
			this.state = defaultState;
		}

		this.state.heights = {};
	}

	render () {
		return (
			<>
				<div className={"head"}>
					<div />
					<Search engines={this.state.engines} engine={this.state.engine} />
					<Settings
						engines={this.state.engines}
						engine={this.state.engine}
						cols={this.state.cols}
						bgColor={this.state.bgColor}
						changeSettings={this.changeSettings}
						exportState={this.exportState}
					/>
				</div>

				{this.state.widgetSettings &&
					<SettingsContainer
						id={this.state.widgetSettings}
						widget={this.state.widgets[this.state.widgetSettings].type}
						data={this.state.widgets[this.state.widgetSettings].data}
						showWidgetSettings={this.showWidgetSettings}
						onSave={this.changeWidgetData}
					/>
				}

				<ResponsiveGridLayout
					className="layout"
					breakpoints={{all: 0}}
					cols={{all: this.state.cols}}
					layouts={{all: this.getLayout()}}
					isResizable={false}
					onLayoutChange={this.moveWidget}
					rowHeight={1}
					margin={[0,0]}
				>
					{Object.keys(this.state.widgets).map((id) => {
						const widget = this.state.widgets[id];
						return (
							<div key={id} id={id}>
								<WidgetContainer
									updateHeight={this.updateHeight}
									id={id}
									widget={widget}
									onRemove={this.removeWidget}
									showWidgetSettings={this.showWidgetSettings}
								/>
							</div>
						);
					})}

					{[...Array(this.state.cols)].map((_, col) =>
						<div key={`_add${col}`} id={`_add${col}`}>
							<AddWidget addWidget={this.addWidget} column={col} widgets={this.state.enabledWidgets} />
						</div>
					)}

				</ResponsiveGridLayout>
			</>
		);
	}

	componentDidUpdate() {
		window.localStorage.setItem("state", JSON.stringify(this.state));
		document.body.style.background = this.state.bgColor;
	}

	componentDidMount() {
		document.body.style.background = this.state.bgColor;
	}

	moveWidget(layout) {
		const newWidgets = Object.assign({}, this.state.widgets);
		Object.values(layout).forEach(item => {
			if (!/^_add/.test(item.i)) {
				newWidgets[item.i].column = item.x;
				newWidgets[item.i].row = item.y;
			}
		});
		this.setState({ widgets: newWidgets });
	}

	updateHeight(id, height) {
		this.setState(state => {
			const newHeights = Object.assign({}, state.heights);
			newHeights[id] = Math.ceil(height) + 20; // plus padding
			return { heights: newHeights };
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

	addWidget(column,widgetType,widgetText){
		this.setState(state => {
			const newWidgets = Object.assign({}, state.widgets);
			const newId = this.createKey(widgetType);
			newWidgets[newId] =
			{
				type: widgetType,
				column: column,
				row: this.getMaxRow(column),
				title: widgetText+" -",
				data:{}
			};

			return { widgets: newWidgets, widgetSettings: newId };
		});
	}

	createKey(widgetType){
		let index = 0;
		let key = widgetType + index;
		const newWidgets = Object.assign({}, this.state.widgets);

		while(newWidgets.hasOwnProperty(key)) {
			index++;
			key = widgetType + index;
		}

		return key;
	}

	getMaxRow(column){
		let maxRow=0;
		const newWidgets = Object.assign({}, this.state.widgets);
		Object.values(newWidgets).forEach(widget => {
			if (widget.column === column && widget.row > maxRow) {
				maxRow = widget.row + 1;
			}
		});
		return maxRow;
	}

	/**
	 * Change state of app
	 * @param values Object
	 */
	changeSettings(values) {
		const prevState = this.state;
		this.setState(values);
		if (typeof values.cols === 'number' && prevState.cols < values.cols) {
			location.reload();
		}
	}

	showWidgetSettings(widgetSettings) {
		this.setState({ widgetSettings: widgetSettings });
	}

	changeWidgetData(id, data, title) {
		let widget;
		this.setState(state => {
			const newWidgets = Object.assign({}, state.widgets);
			newWidgets[id].data = data;
			newWidgets[id].title = title;
			widget = newWidgets[id];
			return {
				widgetSettings: null,
				widgets: newWidgets
			};
		});

		location.reload();
	}

	exportState() {
		const element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state)));
		element.setAttribute('download', 'config.json');
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	getLayout() {
		const layout = Object.keys(this.state.widgets).map(id => {
			const height = this.state.heights.hasOwnProperty(id) ? this.state.heights[id] : 115;
			const widget = this.state.widgets[id];
			return {
				i: id,
				x: widget.column,
				y: widget.row,
				w: 1,
				h: height
			}
		});
		for (let col = 0; col < this.state.cols; col++) {
			layout.push({
				i: `_add${col}`,
				x: col,
				y: Infinity,
				w: 1,
				h: 100,
				isDraggable: false,
			});
		}
		return layout;
	}
}
