/*
	@constructor
	@classdesc - image that is connected with areas

*/
class Image {

	/*
		@constructs
		@param {object} options
		@param {object} options.node - dom-element
	*/
	constructor(options) {
		this._node = options.node;
	}
	
	/*
		@description - get [currentWidth/originalWidth, currentHeight/originalHeight]
		@return {array} [number, number]
	*/
	getSizeDiffs() {
		var currentWidth = this._node.width;
		var currentHeight = this._node.height;
		var originalWidth = this._node.naturalWidth;
		var originalHeight = this._node.naturalHeight;
		return [currentWidth/originalWidth, currentHeight/originalHeight];
	}
}

export default Image;