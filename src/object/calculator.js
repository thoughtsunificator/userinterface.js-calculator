(function() {

	const OPERATOR_MODULO = "%"
	const OPERATOR_DIVIDE = "/"
	const OPERATOR_SUBSTRACT = "-"
	const OPERATOR_MULTIPLY = "*"
	const OPERATOR_PLUS = "+"

	calculator.Calculator = function() {
		this.operations = []
		this.operands = []
		this.operator = null
		this.output = null
	}

	/**
	 * Change the operator of the calculator
	 * @param {string} operator
	 */
	calculator.Calculator.prototype.setOperator = function(operator) {
		this.operator = operator
	}

	/**
	 * Add an operand to the calculator
	 * @param {string} operand
	 */
	calculator.Calculator.prototype.addOperand = function(operand) {
		this.operands.push(operand)
	}

	/**
	 * Remove all operands, operations, set the output and operator to null
	 * @param {boolean} soft
	 */
	calculator.Calculator.prototype.clear = function(soft) {
		this.operands = []
		if (soft === true)
			this.operands.push(this.output)
		this.operator = null
		this.operations = []
		this.output = null
	}

	/**
	 * Make an operation out of the operands and operator it has and return the output of it
	 */
	calculator.Calculator.prototype.equal = function() {
		if (this.output === null)
			this.output = this.operands[0]
		let operand = this.operands[this.operands.length - 1]
		if (this.operator === OPERATOR_MODULO)
			this.output %= operand
		else if (this.operator === OPERATOR_DIVIDE)
			this.output /= operand
		else if (this.operator === OPERATOR_SUBSTRACT)
			this.output -= operand
		else if (this.operator === OPERATOR_MULTIPLY)
			this.output *= operand
		else if (this.operator === OPERATOR_PLUS)
			this.output += operand
		this.operations.push({operands: this.operands, operator: this.operator, output: this.output })
		this.operands = []
		return this.output
	}

	calculator.Calculator.prototype.str = function() {
		if (this.operations.length === 0) {
			if (this.operands.length === 0)
				return this.output + " " + this.operator
			else
				return this.operands[0] + " " + this.operator
		} else {
			let output = ""
			this.operations.forEach(operation => {
				if (operation.operands.length === 1)
					output += " " +operation.operator + " " + operation.operands[0]
				else
					output += operation.operands.join(" "+operation.operator+" ")
			})
			return output + " " + this.operator
		}
	}

})()
