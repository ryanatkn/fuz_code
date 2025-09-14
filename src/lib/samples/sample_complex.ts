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

	instance_method = (): void => {
		/* ... */
		this.#private_method();
		// foo
	};

	#private_method() {
		throw new Error(`${this.d1} 
			multiline
			etc
		`);
	}

	protected protected_method(): void {
		console.log(new Date()); // eslint-disable-line no-console
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

// boundary test cases
export const str_with_keywords = 'const class function string';
export const str_with_comment = '// this is not a comment';
export const template_with_expr = `Value: ${1 + 2} and ${true}`;

// regex that looks like comment
export const regex = /\/\/.*/g;
export const complex_regex = /^(?:\/\*.*?\*\/|\/\/.*|[^\/])+$/;

// string in comment should not be highlighted as string
// const commented = "this string is in a comment";
