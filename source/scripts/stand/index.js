import Image from "./components/image.js";
import Area from "./components/area.js";
import Screen from "./components/screen.js";
import Informer from "./components/informer.js";

/*
	@constructor
	@classdesc - create image with highlight and informer
*/
class Stand {

	/*
		@constructs
		@param {object} options
		@param {object} options.$node - parentNode, wrapped in jquery.
		@param {string} options.areasSelector
		@param {string} options.imageSelector
		@param {string} options.screenSelector - selector of svg-element for vector shapes that implements highlighting
		@param {string} options.highlightingClass - css class for that vector shape (watch above)
		@param {number} options.animationSpeed - speed of informer appearing/disappearing
		@param {string} options.informerSelector - selector of element that displays additional information
		@param {function} options.createInformerMarkup
	*/
	constructor(options) {
		this._$node = options.$node;
		this._options = options;
		this.recalcAreasCoords = this.recalcAreasCoords.bind(this);
		this.highlightArea = this.highlightArea.bind(this);
	}

	/*
		@description - recalc area coords
	*/
	recalcAreasCoords() {
		let sizeDiffs = this._Image.getSizeDiffs();
		this._areas.forEach((area)=>{
			area.recalcCoords(sizeDiffs);
		});	
	}

	/*
		@description - show svg-shape over area
		@param {object} e - mouseover event object 
	*/
	highlightArea(e) {
		let areaInstance = e.target.areaInstance;
		let SVGElement = areaInstance.toSVGElement();
		this._Screen.render(SVGElement);
	}

	/*
		@description - get cursor placement relative to widget
		@param {object} e - mouseover event object
		@return {object} {left: number, top: number}
	*/
	_getCursorPosition(e) {
		var cursorLeft = e.pageX - this._$node.offset().left;
		var cursorTop = e.pageY - this._$node.offset().top;
		return {
			left:cursorLeft,
			top:cursorTop
		}
	}

	/*
		@description - add event handlers and protect from double initialization
	*/
	_attachEvents() {
		$(window).off(".resize").on("load.stand resize.stand", this.recalcAreasCoords);
		this._$node.off("mouseover.stand").on("mouseover.stand", this._options.areasSelector, (e)=>{
			this.highlightArea(e);
			this._informer.show(e.target);
		});
		this._$node.off("mouseleave.stand").on("mouseleave.stand", this._options.areasSelector, ()=>{
			this._Screen.clean();
			this._informer.hide();
		});
		this._$node.off("mousemove.stand").on("mousemove.stand", this._options.areasSelector, (e)=>{
			this._informer.position(
				this._getCursorPosition(e)
			);		
		});
	}
	
	init() {
		this._attachEvents();
		this._areas = this._$node.find(this._options.areasSelector)
		.map((index, node)=>{
			return new Area({
				node
			})
		}).get();
		this._areas.forEach((area)=>{
			area.cacheOriginalCoords();
		});
		this._Image = new Image({
			node: this._$node.find(this._options.imageSelector).get(0)
		});
		this._Screen = new Screen({
			$node: this._$node.find(this._options.screenSelector),
			highlightingClass: this._options.highlightingClass	
		});
		this._informer = new Informer({
			$node: this._$node.find(this._options.informerSelector),
			createInformerMarkup: this._options.createInformerMarkup,
			animationSpeed: this._options.animationSpeed
		});
	}
}

export default Stand;