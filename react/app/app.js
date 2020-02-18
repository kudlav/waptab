/**
 * @file App component
 * @author kudlav & anik97 (MIT License)
 */

import React, { Component, Suspense } from 'react';
import WidgetMissingErrorBoundary from './widget/unsupportedWidget';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.widgets = [{type: 'rss'}, {type: 'rss'}, {type: 'forecast'}, {type: 'fzz'}];
	}

	render () {
		return (
			<>
				{this.widgets.map((widget, index) => {
					const Widget = React.lazy(() => import(`./widget/${widget.type}/widget`));
					return (
						<div className={"widget"} key={index}>
							<WidgetMissingErrorBoundary>
								<Suspense fallback={<div>Načítám widget...</div>}>
									<Widget />
								</Suspense>
							</WidgetMissingErrorBoundary>
						</div>
					);
				})}
			</>
		);
	}
}
