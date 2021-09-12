const STATE_AWAITING_OPERATOR = "AWAITING_OPERATOR"
const STATE_AWAITING_OPERAND = "AWAITING_OPERAND"
const STATE_AWAITING_EQUAL = "AWAITING_EQUAL"
const STATE_OPERATION_OUTPUT = "OPERATION_OUTPUT"
const STATE_EQUAL = "EQUAL"

const EMPTY_STR = ""
const ZERO = "0"
const DECIMAL_SEPARATOR = "."

const DEFAULT_RESULT = "0"

UserInterface.bind("calculator", async function(element) {

	const _calculator = new calculator.Calculator()

	const _operationNode = element.querySelector(".operation")
	const _resultNode  = element.querySelector(".resultText")
	const _stateNode  = element.querySelector(".state")
	const _buttonsNode  = element.querySelector(".buttons")

	UserInterface.listen(_calculator, "addPiece", async function(piece) {
		if (_calculator.state === STATE_AWAITING_OPERAND) {
			_resultNode.textContent = piece
			UserInterface.announce(_calculator, "setState", STATE_AWAITING_EQUAL)
		} else if (_calculator.state === STATE_AWAITING_OPERATOR || _calculator.state === STATE_AWAITING_EQUAL) {
			if ((_resultNode.textContent === ZERO)) {
				_resultNode.textContent = piece
			} else {
				_resultNode.textContent += piece
			}
		} else if (_calculator.state === STATE_OPERATION_OUTPUT) {
			_resultNode.textContent = piece
			UserInterface.announce(_calculator, "setState", STATE_AWAITING_EQUAL)
		} else if (_calculator.state === STATE_EQUAL) {
			_calculator.clear(false)
			_resultNode.textContent = piece
			UserInterface.announce(_calculator, "setState", STATE_AWAITING_OPERATOR)
		}
	})

	UserInterface.listen(_calculator, "saveOperand", function(compute) {
		const operand = parseFloat(_resultNode.textContent)
		_calculator.addOperand(operand)
		if (compute === true) {
			_resultNode.textContent = _calculator.equal()
			_operationNode.textContent = EMPTY_STR
		}
	})

	UserInterface.listen(_calculator, "setState", function(state) {
		_calculator.state = state
		_stateNode.textContent = state
	})

	UserInterface.listen(_calculator, "clear", function() {
		_calculator.clear(false)
		_operationNode.textContent = EMPTY_STR
		_resultNode.textContent = ZERO
		UserInterface.announce(_calculator, "setState", STATE_AWAITING_OPERATOR)
	})


	UserInterface.listen(_calculator, "setOperator", function(operator) {
		if (_resultNode.textContent.endsWith(DECIMAL_SEPARATOR) === true) {
			_resultNode.textContent = _resultNode.textContent.substring(0, _resultNode.textContent.length - 1)
		}
		if (_calculator.state === STATE_AWAITING_OPERAND) {
			_calculator.setOperator(operator)
		} else if (_calculator.state === STATE_AWAITING_OPERATOR) {
			_calculator.setOperator(operator)
			if (_calculator.operands.length === 0) {
				UserInterface.announce(_calculator, "saveOperand" , false)
			}
			UserInterface.announce(_calculator, "setState", STATE_AWAITING_OPERAND)
		} else if (_calculator.state === STATE_AWAITING_EQUAL) {
			UserInterface.announce(_calculator, "saveOperand" , true)
			_calculator.setOperator(operator)
			UserInterface.announce(_calculator, "setState", STATE_OPERATION_OUTPUT)
		} else if (_calculator.state === STATE_EQUAL) {
			_calculator.setOperator(operator)
			UserInterface.announce(_calculator, "setState", STATE_AWAITING_OPERAND)
		} else if (_calculator.state === STATE_OPERATION_OUTPUT) {
			_calculator.setOperator(operator)
		}
		_operationNode.textContent = _calculator.str()
	})

	UserInterface.listen(_calculator, "deletePiece", function() {
		if(_resultNode.textContent === "NaN" || _resultNode.textContent === "Infinity") {
			return
		}
		if (_resultNode.textContent.length === 1) {
			_resultNode.textContent = ZERO
		} else {
			_resultNode.textContent = _resultNode.textContent.slice(0, _resultNode.textContent.length - 1)
		} if (_calculator.state === STATE_EQUAL) {
			_calculator.clear(false)
			UserInterface.announce(_calculator, "setState", STATE_AWAITING_OPERATOR)
		} else if (_calculator.state === STATE_OPERATION_OUTPUT) {
			UserInterface.announce(_calculator, "setState", STATE_AWAITING_EQUAL)
		}
	})

	UserInterface.listen(_calculator, "equal", async function() {
		if (_calculator.state === STATE_AWAITING_EQUAL || _calculator.state === STATE_AWAITING_OPERAND || _calculator.state === STATE_OPERATION_OUTPUT) {
			await UserInterface.announce(_calculator, "saveOperand" , true)
			_calculator.clear(true)
			await UserInterface.announce(_calculator, "setState", STATE_EQUAL)
		} else {
			_resultNode.textContent = _resultNode.textContent
		}
	})

	UserInterface.listen(_calculator, "addDigit", function(digit) {
		if (digit !== ZERO || _resultNode.textContent !== ZERO) {
			UserInterface.announce(_calculator, "addPiece", digit)
		}
	})

	UserInterface.listen(_calculator, "addDecimalSeparator", function() {
		if (_calculator.state === STATE_AWAITING_OPERAND || _calculator.state === STATE_EQUAL || _calculator.state === STATE_OPERATION_OUTPUT || _resultNode.textContent === ZERO) {
			UserInterface.announce(_calculator, "addPiece", ZERO + DECIMAL_SEPARATOR)
		} else if (_resultNode.textContent.includes(DECIMAL_SEPARATOR) === false) {
			UserInterface.announce(_calculator, "addPiece", DECIMAL_SEPARATOR)
		}
	})

	await UserInterface.announce(_calculator, "setState", STATE_AWAITING_OPERATOR)
	_resultNode.textContent = DEFAULT_RESULT

	for(const button of calculator.LAYOUT) {
		await UserInterface.runModel("collection.button", { parentNode: _buttonsNode, bindingArgs: [_calculator, { action: button.action, value: button.value }], data: { text: button.text } })
	}

})
