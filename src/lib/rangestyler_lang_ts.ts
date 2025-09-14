import type {Rangestyler_Language, Rangestyler_Language_Boundary} from '$lib/rangestyler_types.js';

/**
 * Detect boundaries in TypeScript/JavaScript
 */
const detect_ts_boundaries = (text: string): Array<Rangestyler_Language_Boundary> => {
	const boundaries: Array<Rangestyler_Language_Boundary> = [];

	// Combined regex to find comments, strings, template literals, and regex literals
	// Order matters: multi-line comments, single-line comments, template literals, strings, regex
	const boundary_regex = /(\/\*[\s\S]*?\*\/)|(\/\/.*)|(`(?:\\[\s\S]|(?!`)[^\\])*`)|("(?:\\[\s\S]|(?!")[^\\])*"|'(?:\\[\s\S]|(?!')[^\\])*')|(\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^\/\\[\r\n])+\/[dgimyus]{0,7})/g;

	let last_end = 0;
	let match;

	while ((match = boundary_regex.exec(text)) !== null) {
		// Add code boundary before this match (only if non-empty)
		if (match.index > last_end) {
			boundaries.push({
				language: 'ts',
				type: 'code',
				start: last_end,
				end: match.index,
			});
		}

		// Determine boundary type based on which group matched
		let boundary_type: string;
		let pattern_name: string;

		if (match[1]) {
			// Multi-line comment /* */
			boundary_type = 'comment';
			pattern_name = 'comment';
		} else if (match[2]) {
			// Single-line comment //
			boundary_type = 'comment';
			pattern_name = 'comment';
		} else if (match[3]) {
			// Template literal `...`
			// For now, treat the whole template as a string boundary
			// TODO: Handle ${...} expressions as nested boundaries
			boundary_type = 'string';
			pattern_name = 'string';
		} else if (match[4]) {
			// Regular string "..." or '...'
			boundary_type = 'string';
			pattern_name = 'string';
		} else if (match[5]) {
			// Regex literal /.../flags
			boundary_type = 'regex';
			pattern_name = 'regex';
		}

		boundaries.push({
			language: 'ts',
			type: boundary_type!,
			start: match.index,
			end: match.index + match[0].length,
			patterns: [
				{
					name: pattern_name!,
					match: /.+/s,
					priority: 100,
					greedy: true,
				},
			],
		});

		last_end = match.index + match[0].length;
	}

	// Add final code boundary if there's text after last boundary
	if (last_end < text.length) {
		boundaries.push({
			language: 'ts',
			type: 'code',
			start: last_end,
			end: text.length,
		});
	}

	// If no boundaries found, treat entire text as code
	if (boundaries.length === 0) {
		boundaries.push({
			language: 'ts',
			type: 'code',
			start: 0,
			end: text.length,
		});
	}

	return boundaries;
};

/**
 * TypeScript language definition
 */
export const ts_language: Rangestyler_Language = {
	id: 'ts',
	detect_boundaries: detect_ts_boundaries,
	patterns: [
		// Note: Comments, strings, and regex are handled via boundaries

		// Template literal expressions (only matches within template boundaries)
		// TODO: This needs special handling for nested boundaries
		{
			name: 'template_expression',
			match: /\$\{[^}]+\}/g,
			priority: 85,
			greedy: true,
		},

		// TypeScript type annotations and keywords
		{
			name: 'type',
			match: /\b(?:string|number|boolean|object|symbol|any|unknown|never|void|bigint)\b/g,
			priority: 55,
			greedy: true,
		},

		// Keywords (including TypeScript-specific)
		{
			name: 'keyword',
			match:
				/\b(?:abstract|as|async|await|break|case|catch|class|const|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|infer|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|satisfies|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/g,
			priority: 50,
			greedy: true,
		},

		// Boolean
		{
			name: 'boolean',
			match: /\b(?:true|false)\b/g,
			priority: 45,
			greedy: true,
		},

		// Numbers
		{
			name: 'number',
			match:
				/\b(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?|\d+(?:_\d+)*n?(?:\.\d+(?:_\d+)*)?(?:[Ee][+-]?\d+(?:_\d+)*)?)\b/g,
			priority: 40,
			greedy: true,
		},

		// Function names
		{
			name: 'function',
			match: /\b[a-zA-Z_$][\w$]*(?=\s*\()/g,
			priority: 35,
			greedy: true,
		},

		// Class names
		{
			name: 'class_name',
			match: /\b[A-Z][\w$]*\b/g,
			priority: 30,
			greedy: true,
		},

		// Operators
		{
			name: 'operator',
			match:
				/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/g,
			priority: 20,
			greedy: true,
		},

		// Punctuation
		{
			name: 'punctuation',
			match: /[{}[\];(),.<>]/g,
			priority: 10,
			greedy: true,
		},
	],
};
