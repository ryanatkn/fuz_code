const a = 1;

const b = 'b';

const c = true;

export type Some_Type = 1 | 'b' | true;

class D {
	d1: string = 'd';
	d2: number;
	d3 = $state(null);

	constructor(d2: number) {
		this.d2 = d2;
	}

	class_method(): string {
		return `Hello, ${this.d1}`;
	}

	instance_method = (): void => {
		/* ... */
		let i = 0;
		while (i < 3) i++;
		for (const c2 of this.d1) {
			if (c2 === 'd') continue;
			if (!c2) break;
			this.#private_method(a, c2);
		}
		// foo
	};

	#private_method(a2: number, c2: any) {
		throw new Error(`${this.d1} 
			multiline
			etc ${a2 + c2}
		`);
	}

	protected async protected_method(): Promise<void> {
		try {
			await new Promise((resolve) => setTimeout(resolve, 100));
			if (Math.random() > 0.5) {
				console.log(new Date()); // eslint-disable-line no-console
			} else if (Math.random() > 0.2) {
				console.log('else if branch');
			} else {
				console.log('else branch');
			}
		} catch (error) {
			console.error(error);
		} finally {
			console.log('finally block');
		}
	}
}

// comment

/*
other comment

const comment = false;
*/

/**
 * JSDoc comment
 */

import {sample_langs, type Code_Sample, type Sample_Lang} from '../code_sample.js';
import * as A from '../code_sample.js';

sample_langs as unknown as Code_Sample as any as Sample_Lang;

export {a, A, b, c, D};

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
export const template_with_expr = `Value: ${1 + 2}`;

// regex that looks like comment
export const regex = /\/\/.*/g;
export const complex_regex = /^(?:\/\*.*?\*\/|\/\/.*|[^/])+$/;

// string in comment should not be highlighted as string
// const commented = "this string is in a comment";
