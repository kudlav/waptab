/**
 * Check if provided object is valid app state configuration
 * @author kudlav & anik97 (MIT License)
 * @param json Object
 * @returns {string|null} Null on success, otherwise return string with error message.
 */
export default function(json) {
	if (typeof json !== 'object') return 'chybí objekt s nastavením';

	if (typeof json.cols !== 'number' || Number.isNaN(json.cols) || !Number.isInteger(json.cols) || json.cols < 0)
		return 'cols: počet sloupců musí být nezáporné celé číslo';

	if (typeof json.engines !== 'object' || Object.entries(json.engines).length === 0)
		return 'engines: chybí dostupné vyhledávače';

	Object.keys(json.engines).forEach(engine => {
		if (typeof engine !== 'string' || typeof json.engines[engine] !== 'string')
			return 'engines: položky ve formátu { string: string }';
	});

	if (typeof json.engine !== 'string' || typeof json.engines[json.engine] !== 'string')
		return 'engine: musí být jeden z engines';

	return null;
}
