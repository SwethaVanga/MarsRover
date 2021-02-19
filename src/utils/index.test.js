import {parseInstructions, validatePosition, validateCommands} from "./index"

const EXAMPLE_INSTRCUTION = "1 2 N|LMLMLMLMM"
const WRONG_MOVEMENT_INSTRUCTION = "1 2 N|GXYBNHIJJ"
const WRONG_POSITION_INSTRCUTION = "100 200 A|LMLMLMLMM"

describe("Parse instructions", () => {
	test("Parse instruction generate and object with movements and position", () =>{
		expect(parseInstructions(EXAMPLE_INSTRCUTION)).toMatchObject({
			position: ["1", "2", "N"], 
			commands: [
				'L', 'M', 'L',
				'M', 'L', 'M',
				'L', 'M', 'M'
			]
		})
	
	})
	test("Fail the movement is wrong", () =>{
		expect(() => parseInstructions(WRONG_MOVEMENT_INSTRUCTION)).toThrow()
	
	})
	test("Fail the position is wrong", () =>{
		expect(() => parseInstructions(WRONG_POSITION_INSTRCUTION)).toThrow()
	
	})
}) 