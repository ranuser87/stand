/*
	@constructor
	@classdesc - shows vector shapes over picture
*/
class Screen {

	/*
		@constructs
		@param {object} options
		@param {object} options.$node - parent node, wrapped in jquery
		@param {string} options.highlightingClass - css class for vector shape
	*/
	constructor(options) {
		this._$node = options.$node;
		this._highlightingClass = options.highlightingClass;
	}

	/*
		@description - lay vector shape over picture
		@param {object} SVGElement
	*/
	render(SVGElement) {
		this.clean();
		SVGElement.setAttribute("class", this._highlightingClass);
		this._$node.append(SVGElement);
	}

	/*
		@description - remove svg-shapes
	*/
	clean() {
		this._$node.empty();
	}
}

export default Screen;