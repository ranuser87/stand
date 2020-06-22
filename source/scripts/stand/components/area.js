/*
	@constructor
	@classdesc - area of image that might be highlighted
*/
class Area {

	/*
		@constructs
		@param {object} options
		@param {object} options.node - dom-element
	*/
	constructor(options) {
		this._node = options.node;
		this._node.areaInstance = this;
	}

	/*
		@return {array} [number]
	*/
	_getCoords(attrName) {
		let src = attrName ? attrName : "coords";
		let coords = this._node.getAttribute(src);
		return coords.split(",").map(parseFloat);
	}

	/*
		@description - get geometry data of area
		@return {object} {
			left:number,
			right:number,
			top:number,
			bottom:number,
			horCenter:number,
			vertCenter:number,
			width:number,
			height:number
		}
	*/
	_getMetrics() {
		let coords = this._getCoords();
		let shape = area.shape;
		let minX = smartArea.getMinX(shape, coords);
		let maxX = smartArea.getMaxX(shape, coords);
		let minY = smartArea.getMinY(shape, coords);
		let maxY = smartArea.getMaxY(shape, coords);
		let width = maxX - minX;
		let height = maxY - minY;
		let centerX;
		let centerY;
		if(shape === "poly" || shape === "rect") {
			centerX = minX + width/2;
			centerY = minY + height/2;
		} else if(shape === "circle") {
			centerX = coords[0];
			centerY = coords[1];
		}
		return {
			left:minX,
			right:maxX,
			top:minY,
			bottom:maxY,
			horCenter:centerX,
			vertCenter:centerY,
			width:width,
			height:height
		}
	}

	/*
		@description - create svg shape, based on area shape
		@return {object}
	*/
	toSVGElement() {
		if(this._node.shape === "poly") {
			let poly = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
			poly.setAttribute("points", this._node.coords);
			return poly;
		} else if(this._node.shape === "circle") {
			let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
			let coords = this._getCoords();
			circle.setAttribute("cx", coords[0]);
			circle.setAttribute("cy", coords[1]);
			circle.setAttribute("r", coords[2]);
			return circle;
		} else if(this._node.shape === "rect") {
			let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
			let metrics = smartArea.getMetrics(area);
			rect.setAttribute("x", metrics.left);
			rect.setAttribute("y", metrics.top);
			rect.setAttribute("width", metrics.width);
			rect.setAttribute("height", metrics.height);
			return rect;
		}
	}

	/*
		@description - cache original coords for further calculation of current coords (basing on image ratio)
	*/
	cacheOriginalCoords() {
		this._node.setAttribute("data-original-coords",
			this._node.getAttribute("coords")	
		)	
	}

	/*
		@param {array} sizeDiffs - [currentPictureWith/originalPictureWith, currentPictureHeight/originalPictureHeight] ratio of current picture with to original width
	*/
	recalcCoords(sizeDiffs) {
		let [diffWidth, diffHeight] = sizeDiffs;
		let originalCoords = this._getCoords("data-original-coords");
		let newCoords = originalCoords.map(function(coordsUnit, index) {
			if( index % 2 ) {
				return Math.ceil(coordsUnit * diffWidth);
			} else {
				return Math.ceil(coordsUnit * diffHeight);
			}
		});
		this._node.setAttribute("coords", newCoords);
	}
}

export default Area;