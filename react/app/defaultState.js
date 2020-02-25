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
	engine: 'DuckDuckGo',
	bgColor: '#b5a584',
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
