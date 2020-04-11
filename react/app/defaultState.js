/**
 * @file Application default state object
 * @author kudlav & anik97 (MIT License)
 */

export default {
	cols: 2,
	engines: {
		'Google': 'https://www.google.com/search?q=',
		'DuckDuckGo': 'https://duckduckgo.com/?q=',
		'Seznam': 'https://search.seznam.cz/?q=',
		'Mapy.cz': 'https://mapy.cz/?q='
	},
	enabledWidgets: {
		rss: 'RSS',
		forecast: 'Počasí'
	},
	engine: 'DuckDuckGo',
	bgColor: '#b5a584',
	widgets: {
		'rss0': {
			type: 'rss',
			column: 0,
			row: 0,
			title: 'RSS - KAM VUT',
			data: { source: 'http://www.kam.vutbr.cz/rss.aspx', title: 'KAM VUT' }
		},
		'rss1': {
			type: 'rss',
			column: 0,
			row: 1,
			title: 'RSS - nasa.gov',
			data: { source: 'http://www.nasa.gov/rss/dyn/breaking_news.rss', title: 'nasa.gov' }
		},
		'forecast0': {
			type: 'forecast',
			column: 0,
			row: 2,
			title: 'Počasí - Brno',
			data: { city: 'Brno', source: 'accuweather' }
		}
	}
};
