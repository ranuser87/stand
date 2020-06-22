/*
	@constructor
	@classdesc - implements window with additional information, that appears over image area
*/
class Informer {

	/*
		@constructs
		@param {object} options
		@param {object} options.$node - parent node, wrapped in jquery
		@param {function} options.createInformerMarkup
		@param {number} options.animationSpeed - speed of informer appearing
	*/
	constructor(options) {
		this._$node = options.$node;
		this._createInformerMarkup = options.createInformerMarkup;
		this._animationSpeed = options.animationSpeed;
	}

	/*
		@description - show informer
		@param {object} area - dom-element, corresponding to target area
	*/
	show(area) {
		let markup = this._createInformerMarkup(area);
		this._$node.html(markup);
		this._$node.fadeIn(this._animationSpeed);
	}

	/*
		@description - hide informer
	*/
	hide() {
		this._$node.hide(0);
	}

	/*
		@description - position informer relative to cursor
		@param {object} cursorPosition - cursor position relative to widget {top: number, left: number}
	*/
	position(cursorPosition) {
		let informerLeftPosition = cursorPosition.left - this._$node.outerWidth();
		this._$node.css({
			top:cursorPosition.top - this._$node.outerHeight(),
			left:informerLeftPosition > 0 ? informerLeftPosition : 0
		})
	}
}

export default Informer;