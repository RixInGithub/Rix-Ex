// Rix-Ex. A revamp of RixxyX.
// Available under GNU AGPLv3.

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
			this.cols = ["#00ff33", "#00801a", "#00801a"]
			this.menus = {
				rgb: {
					acceptReporters: true,
					items: "RGB".split("")
				},
				tf: {
					acceptReporters: false,
					items: [true, false]
				}
			}
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
						text: "color ID from [col]",
						blockType: Scratch.BlockType.REPORTER,
						arguments: {
							col: {
								type: Scratch.ArgumentType.COLOR,
								defaultValue: this.cols[0]
							}
						}
					},
					{
						opcode: "colorEx",
						text: "color ID [col] exists?",
						blockType: Scratch.BlockType.BOOLEAN,
						arguments: {
							col: {
								type: Scratch.ArgumentType.NUMBER
							}
						}
					},
					{
						opcode: "rgbOfCol",
						text: "[rgb] of [col]",
						blockType: Scratch.BlockType.REPORTER,
						arguments: {
							rgb: {
								type: Scratch.ArgumentType.STRING,
								menu: "rgb",
								defaultValue: "R"
							},
							col: {
								type: Scratch.ArgumentType.NUMBER
							}
						}
					},
					{
						opcode: "setRgbInColTo",
						text: "set [col]'s [rgb] to [v]",
						blockType: Scratch.BlockType.COMMAND,
						arguments: {
							col: {
								type: Scratch.ArgumentType.NUMBER
							},
							rgb: {
								type: Scratch.ArgumentType.STRING,
								menu: "rgb",
								defaultValue: "R"
							},
							v: {
								type: Scratch.ArgumentType.NUMBER,
								defaultValue: parseInt(cols[0].slice(1, 3), 16)
							}
						}
					},
					"---",
					{
						opcode: "bool",
						text: "[v]",
						blockType: Scratch.BlockType.BOOLEAN,
						arguments: {
							v: {
								type: Scratch.ArgumentType.STRING,
								menu: "tf",
								defaultValue: true
							}
						}
					},
					{
						opcode: "bool",
						text: "[v]",
						blockType: Scratch.BlockType.BOOLEAN,
						arguments: {
							v: {
								type: Scratch.ArgumentType.STRING,
								menu: "tf",
								defaultValue: false
							}
						}
					}
				]
			}
		}
		newColor(args, util) {
			return new color(0, 0, 0).id
		}
		colorEx(args, util) {
			return Object.prototype.toString.call(cols[Scratch.Cast.toNumber(args.rgb)] ?? false) != Object.prototype.toString.call(false)
		}
		rgbOfCol(args, util) {
			return (cols[Scratch.Cast.toNumber(args.rgb)] ?? Reflect.construct(color, Array(3).fill(0)))[Scratch.Cast.toString(args.rgb).toLowerCase()]
		}
		setRgbInColTo(args, util) {
			var c = cols[Scratch.Cast.toNumber(args.rgb)] ?? Reflect.construct(color, Array(3).fill(0))
			var k = Scratch.Cast.toString(args.rgb).toLowerCase()
			var v = Scratch.Cast.toNumber(args.v)
			c[k] = v
		}
		bool(args) {
			return JSON.parse(args.v)
		}
	}
	Scratch.extensions.register(new RixEx())
})()