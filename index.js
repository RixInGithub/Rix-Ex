// Rix-Ex. A revamp of RixxyX.

(function() {
	var cols = []
	class color {
		constructor(r, g, b) {
			this.r = Number(r)
			this.g = Number(g)
			this.b = Number(b)
			this.rgb = [...arguments]
			this.id = cols.push(this)
		}
		toString() {
			return `rgb(${this.rgb.join(", ")})`
		}
	}
	class RixEx {
		constructor() {
			this.name = "Rix-Ex"
			this.id = "RixEx"
			this.cols = ["#0f3", "#00801a", "#00801a"]
			this.menus = []
		}
		getInfo() {
			return {
				...this, // you can define anything on `this` to be returned by `getInfo`
				cols: undefined, // no witnesses, chaps
				...Object.fromEntries(this.cols.map(function(a,b){return[`color${b+1}`,a]})),
				tbShow: true, // lmfao
				blocks: [
					{
						opcode: "newColor",
						text: "color from [col]",
						blockType: Scratch.BlockType.REPORTER,
						arguments: {
							col: {
								type: Scratch.ArgumentType.COLOR,
								defaultValue: this.cols[0]
							}
						}
					}
				]
			}
		}
		newColor(args, util) {
			return new color(0, 0, 0)
		}
	}
	Scratch.extensions.register(new RixEx())
})()