const hof = {};

hof.identity = function (value) {
	return value;
};

hof.identityf = function (value) {
	return function () {
		return value;
	};
};

hof.add = function (num1, num2) {
	return num1 + num2;
};

hof.sub = function (num1, num2) {
	return num1 - num2;
};

hof.mul = function (num1, num2) {
	return num1 * num2;
};

hof.inc = function (value) {
	return value + 1;
};

hof.addf = function (num1) {
	function addNumber(num2) {
		return num1 + num2;
	}
	return addNumber;
};

hof.curry = function (biFunc, value) {
	function functionDoesSomething(valueTwo) {
		return biFunc(value, valueTwo);
	}
	return functionDoesSomething;
};

hof.liftf = function (func) {
	function doesSomething(value) {
		function doesSomethingElse(valueTwo) {
			return func(value, valueTwo);
		}
		return doesSomethingElse;
	}
	return doesSomething;
};

hof.twice = function (func) {
	function doesSomething(value) {
		return func(value, value);
	}
	return doesSomething;
};

hof.composeu = function (func1, func2) {
	function doesSomething(value) {
		const funcOneOutput = func1(value);
		const funcTwoOutput = func2(funcOneOutput);
		return funcTwoOutput;
	}
	return doesSomething;
};

hof.composeb = function (func1, func2) {
	function doesSomething(val1, val2, val3) {
		return func2(func1(val1, val2), val3);
	}
	return doesSomething;
};

hof.limit = function (func, limit) {
	let counter = 0;
	function doesSomething(val1, val2) {
		counter++;
		if (counter > limit) {
			return undefined;
		}
		return func(val1, val2);
	}
	return doesSomething;
};

hof.from = function (startVal) {
	let counter = startVal;
	function generator() {
		counter++;
		return counter - 1;
	}
	return generator;
};

hof.to = function (generator, endValue) {
	let count = 0;
	function generatorPart2() {
		count = generator();
		if (count > endValue) {
			return;
		}
		return (count -= 1);
	}
	return generatorPart2;
};

hof.fromTo = function (base, limit) {
	let count = base;
	function generator() {
		count++;
		if (count > limit) return;
		else return count - 1;
	}
	return generator;
};

hof.element = function (array, generator) {
	let count = 0;
	return () => {
		return generator ? array[generator()] : array[count++];
	};
};

hof.collect = function (generator, array) {
	return () => {
		const elementToCollect = generator();
		if (elementToCollect !== undefined) array.push(elementToCollect);
		return elementToCollect;
	};
};

hof.filter = function (generator, predicate) {
	return () => {
		const value = generator();
		if (predicate(value)) return value;
	};
};

hof.concat = function (generator1, generator2) {
	return () => {
		let value = generator1();
		if (value === undefined && generator2) value = generator2();
		return value;
	};
};

hof.fibonaccif = function (firstNum, secondNum) {
	let nextNums = [0, firstNum, secondNum];
	return () => {
		nextNums.shift();
		nextNums.push(nextNums[0] + nextNums[1]);
		return nextNums[0];
	};
};

hof.gensymf = function (symbol) {
	let count = 0;
	return () => {
		return `${symbol}${count++}`;
	};
};

hof.gensymff = function (unaryFunc, seed) {
	return (symbol) => {
		let count = seed;
		return () => {
			const result = unaryFunc(count);
			count++;
			return `${symbol}${result}`;
		};
	};
};

hof.counter = function () {};

hof.revokable = function () {};

module.exports = hof;
