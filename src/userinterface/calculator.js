UserInterface.model({
	name: "calculator",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		className: "padding grid-gap",
		style: "width: 250px; border: 1px solid #cecece;border-radius: 5px;padding: 2px; font-family: sans-serif; display: grid; background: linear-gradient(to top, rgba(238,238,238,1) 0%, rgba(238,238,238,1) 100%); grid-template-rows: repeat(4, auto); grid-template-columns: auto auto auto;",
		children: [
			{
				tagName: "div",
				className: "result",
				style: "display:grid; grid-template-rows: subgrid; grid-area: span 3 / span 5 / 3; border-radius: 4px; left: 5px; background: linear-gradient(to top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%); box-shadow: 0px 1.2px 0px white inset, 0px -1.2px 0px white inset, 1.2px 0px 0px white inset, -1.2px 0px 0px white inset; border: 1px solid black; font-family: 'Allerta', sans-serif; font-size: 24px; text-align: right;",
				children: [
					{
						tagName: "div",
						className: "operation",
						style: "font-size: 12px; color: rgb(102, 96, 96); grid-row: 1; height: 20px; overflow: auto;scrollbar-width: none;"
					},
					{
						tagName: "div",
						style: "grid-row: 2; overflow: auto;scrollbar-width: none;",
						className: "resultText"
					},
					{
						tagName: "div",
						className: "state",
						style: "font-size: 12px; grid-row: 3;"
					},
				]
			},
			{
				tagName: "div",
				style: "display: grid; grid-template-columns: subgrid; gap: 5px; grid-area: 3 / span 5; grid-template-columns: auto auto auto auto auto;",
				className: "buttons",
			}
		]
	}
})
