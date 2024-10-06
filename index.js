// Rix-Ex. A revamp of RixxyX.
// Available under GNU AGPLv3.

(function(Scratch) { // will this fix sandboxing issues? idk.
	var cols = []
	class color {
		constructor(r, g, b) {
			this.r = Number(r)
			this.g = Number(g)
			this.b = Number(b)
			this.rgb = [...arguments]
			this.id = cols.length
			cols.push(this)
		}
		toString() {
			return `rgb(${this.rgb.join(", ")})`
		}
	}
	class RixEx {
		constructor() {
			setInterval(function() {
				
			})
			this.name = "Rix-Ex"
			this.id = "RixEx"
			this.cols = ["#00ff33", undefined, "#00801a"]
			this.menus = {
				rgb: {
					acceptReporters: true,
					items: "RGB".split("")
				},
				tf: {
					acceptReporters: false,
					items: ["true", "false"]
				},
				"const": {
					acceptReporters: false,
					items: ["null", "undefined"]
				}
			}
		}
		getInfo() {
			return {
				...this, // you can define anything on `this` to be returned by `getInfo`
				cols: undefined, // no witnesses, chaps
				...Object.fromEntries(this.cols.map(function(a,b){return[`color${b+1}`,a]})),
				// tbShow: true, // lmfao
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
						opcode: "resetCols",
						text: "reset color IDs",
						blockType: Scratch.BlockType.COMMAND
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
								defaultValue: parseInt(this.cols[0].slice(1, 3), 16)
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
								defaultValue: "true"
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
								defaultValue: "false"
							}
						}
					},
					{
						opcode: "num",
						text: "[v] to number",
						blockType: Scratch.BlockType.REPORTER,
						arguments: {
							v: {
								type: Scratch.ArgumentType.empty
							}
						}
					},
					{
						opcode: "str",
						text: "\"[v]\"",
						blockType: Scratch.BlockType.REPORTER,
						arguments: {
							v: {
								type: Scratch.ArgumentType.empty,
								defaultValue: ""
							}
						}
					},
					{
						opcode: "null",
						text: "[v]",
						blockType: Scratch.BlockType.REPORTER,
						arguments: {
							v: {
								type: Scratch.ArgumentType.STRING,
								menu: "const",
								defaultValue: "undefined"
							}
						}
					},
					{
						opcode: "null",
						text: "[v]",
						blockType: Scratch.BlockType.REPORTER,
						arguments: {
							v: {
								type: Scratch.ArgumentType.STRING,
								menu: "const",
								defaultValue: "null"
							}
						}
					},
					"---",
					{
						opcode: "fetchOut",
						text: "[img1][img2]URL[url]",
						blockType: Scratch.BlockType.REPORTER,
						arguments: {
							img1: {
								type: Scratch.ArgumentType.IMAGE,
								dataURI: "https://raw.githubusercontent.com/RixInGithub/Rix-Ex/main/fetchCode1.png"
							},
							img2: {
								type: Scratch.ArgumentType.IMAGE,
								dataURI: "https://raw.githubusercontent.com/RixInGithub/Rix-Ex/main/fetchCode2.png"
							},
							url: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "https://scratch.mit.edu"
							}
						}
					},
					
				]
			}
		}
		newColor(args, util) {
			console.log(args, util)
			var col = Scratch.Cast.toRgbColorList(args.col)
			col = Reflect.construct(color, col)
			return col.id
		}
		colorEx(args, util) {
			return Object.prototype.toString.call(cols[Scratch.Cast.toNumber(args.col)] ?? false) != Object.prototype.toString.call(false)
		}
		resetCols() {
			cols = []
		}
		rgbOfCol(args, util) {
			return (cols[Scratch.Cast.toNumber(args.col)] ?? Reflect.construct(color, Array(3).fill(0)))[Scratch.Cast.toString(args.rgb).toLowerCase()]
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
		num(args) {
			return Scratch.Cast.toNumber(args.v)
		}
		str(args) {
			return Scratch.Cast.toString(args.v)
		}
		null(args) {
			return {"null": null}[args.v] // "undefined" will return undefined
		}
		async fetchOut(args) {
			var u = Scratch.Cast.toString(args.url)
			// u = `https://rix-ex-proxy.vercel.app/api/proxy/?url=${encodeURIComponent(u)}`
			return await (await fetch(u)).text()
		}
	}
	Scratch.extensions.register(new RixEx())
})(Scratch)