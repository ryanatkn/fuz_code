import type {Rangestyler_Language} from './rangestyler_types.js';

/**
 * TypeScript language definition
 */
export const ts_language: Rangestyler_Language = {
	id: 'ts',
	patterns: [
		// Comments (highest priority to override everything)
		{
			name: 'comment',
			match: /\/\*[\s\S]*?\*\/|\/\/.*/g,
			priority: 100,
			greedy: true,
		},

		// Strings (high priority to prevent keyword matching inside)
		{
			name: 'string',
			match: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/g,
			priority: 90,
			greedy: true,
		},

		// Template literal expressions
		{
			name: 'template_expression',
			match: /\$\{[^}]+\}/g,
			priority: 85,
			greedy: true,
		},

		// Regular expressions
		{
			name: 'regex',
			match: /\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\[\r\n])+\/[dgimyus]{0,7}/g,
			priority: 80,
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
