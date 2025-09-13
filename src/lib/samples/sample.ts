const a = 1;

const b = 'b';

const c = true;

export type Some_Type = 1 | 'b' | true;

class D {
	d1: string = 'd';
	d2: number;
	d3 = $state(false);

	constructor(d2: number) {
		this.d2 = d2;
	}

	class_method(): string {
		return `Hello, ${this.d1}`;
	}

	instance_method = () => {
		/* ... */
		this.#private_method();
		// foo
	};

	#private_method() {
		throw new Error(`${this.d1} etc`);
	}

	protected protected_method() {
		console.log(new RegExp('protected'));
	}
}

export {a, b, c, D};

// comment

/*
other comment

const comment = false;
*/

/**
 * JSDoc comment
 */

export interface Some_E {
	name: string;
	age: number;
}

export const some_e: Some_E = {name: 'A. H.', age: 100};

export function add(x: number, y: number): number {
	return x + y;
}

export const plus = (a: any, b: any): any => a + b;
