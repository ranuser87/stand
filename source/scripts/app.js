window.$ = window.jQuery = require("jquery");
import Stand from "./stand";

$(".js-stand").each((index, node)=>{
	let stand = new Stand({
		$node: $(node),
		areasSelector: ".js-stand-area",
		imageSelector: ".js-stand-overlay",
		screenSelector: ".js-stand-screen",
		highlightingClass: "shape",
		animationSpeed: 300,
		informerSelector: ".js-stand-informer",
		createInformerMarkup: function(area) {
			let quarter = area.getAttribute("data-quarter");
			return `You move mouse over quarter: ${quarter}`;
		}
	})
	stand.init();
});

