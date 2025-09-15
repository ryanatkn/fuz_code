import type {
	Language_Scanner,
	Boundary,
	Boundary_Type_Def,
	Token,
	Code_Tokenizer,
} from './boundary_scanner_types.js';
import {Boundary_Registry} from './boundary_scanner_registry.js';

/**
 * Main scanner orchestrator that coordinates language scanners.
 * Handles embedded languages and parent exit conditions without recursion.
 *
 * This is a revised version with better embedded content handling.
 */
export class Scanner_Orchestrator {
	private registry: Boundary_Registry;
	private languages: Map<string, Language_Scanner>;
	private tokenizers: Map<string, Code_Tokenizer>;
	private boundary_tokenizers: Map<string, Code_Tokenizer>;

	constructor() {
		this.registry = new Boundary_Registry();
		this.languages = new Map();
		this.tokenizers = new Map();
		this.boundary_tokenizers = new Map();
	}

	/**
	 * Register a language scanner
	 */
	register_language(scanner: Language_Scanner): void {
		this.languages.set(scanner.id, scanner);
	}

	/**
	 * Register a boundary type definition
	 */
	register_boundary_type(def: Boundary_Type_Def): void {
		this.registry.register(def);
	}

	/**
	 * Register a code tokenizer
	 */
	register_tokenizer(tokenizer: Code_Tokenizer): void {
		this.tokenizers.set(tokenizer.language, tokenizer);
	}

	/**
	 * Register a tokenizer for a specific boundary type
	 */
	register_boundary_tokenizer(boundary_type: string, tokenizer: Code_Tokenizer): void {
		this.boundary_tokenizers.set(boundary_type, tokenizer);
	}

	/**
	 * Check if a language is registered
	 */
	has_language(id: string): boolean {
		return this.languages.has(id);
	}

	/**
	 * Get a language scanner
	 */
	get_language(id: string): Language_Scanner | undefined {
		return this.languages.get(id);
	}

	/**
	 * Main scanning entry point - returns flat token stream
	 * This is the public API
	 */
	scan(text: string, root_language: string): Array<Token> {
		const boundaries = this.scan_boundaries(text, root_language);
		return this.tokenize_boundaries(text, boundaries);
	}

	/**
	 * Get boundaries without tokenization (for backward compatibility)
	 * @deprecated Use scan() for the token stream instead
	 */
	get_boundaries(text: string, root_language: string): Array<Boundary> {
		return this.scan_boundaries(text, root_language);
	}

	/**
	 * Internal: scan and return boundaries
	 */
	private scan_boundaries(text: string, root_language: string): Array<Boundary> {
		const boundaries: Array<Boundary> = [];
		this.scan_language(text, 0, text.length, root_language, boundaries);
		return boundaries;
	}

	/**
	 * Scan a specific language region and add boundaries
	 */
	private scan_language(
		text: string,
		start: number,
		end: number,
		language: string,
		boundaries: Array<Boundary>,
		parent_language?: string,
		exit_pattern?: string,
	): number {
		const scanner = this.languages.get(language);
		if (!scanner) {
			console.error(`Language scanner not found: ${language}`);
			return end;
		}

		let pos = start;

		while (pos < end) {
			const found = scanner.find_next_boundary(text, pos, end);

			if (!found) {
				// No more boundaries, check for exit pattern in remaining content
				if (exit_pattern && parent_language) {
					const exit_pos = this.find_pattern(text, pos, end, exit_pattern);
					if (exit_pos !== -1) {
						// Add content before exit
						if (pos < exit_pos) {
							boundaries.push({
								language: language,
								type: null,
								start: pos,
								end: exit_pos,
							});
						}
						// Add the closing tag
						boundaries.push({
							language: parent_language,
							type: 'html_tag',
							start: exit_pos,
							end: exit_pos + exit_pattern.length,
						});
						return exit_pos + exit_pattern.length;
					}
				}

				// No exit found, add remaining as top-level content
				if (pos < end) {
					boundaries.push({
						language: language,
						type: null,
						start: pos,
						end: end,
					});
				}
				break;
			}

			// Add top-level content before this boundary
			if (found.start > pos) {
				// But first check for exit pattern in this region
				if (exit_pattern && parent_language) {
					const exit_pos = this.find_pattern(text, pos, found.start, exit_pattern);
					if (exit_pos !== -1) {
						// Add content before exit
						if (pos < exit_pos) {
							boundaries.push({
								language: language,
								type: null,
								start: pos,
								end: exit_pos,
							});
						}
						// Add the closing tag
						boundaries.push({
							language: parent_language,
							type: 'html_tag',
							start: exit_pos,
							end: exit_pos + exit_pattern.length,
						});
						return exit_pos + exit_pattern.length;
					}
				}

				boundaries.push({
					language: language,
					type: null,
					start: pos,
					end: found.start,
				});
			}

			// Add the boundary
			boundaries.push({
				language: language,
				type: found.boundary_type,
				start: found.start,
				end: found.end || end,
			});

			// Handle language switching (for script/style tags)
			if (found.switch_to_language && found.end) {
				const exit_pattern = found.switch_to_language === 'ts' ? '</script>' : '</style>';
				const next_pos = this.scan_language(
					text,
					found.end,
					end,
					found.switch_to_language,
					boundaries,
					language,
					exit_pattern,
				);
				pos = next_pos;
			} else if (found.inner_start !== undefined && found.inner_end !== undefined) {
				// Boundary with known inner content - skip to its end
				// This is critical for strings/comments that might contain exit patterns
				pos = found.end || end;
			} else {
				pos = found.end || end;
			}
		}

		return end;
	}

	/**
	 * Find a pattern in text (case-insensitive)
	 */
	private find_pattern(text: string, start: number, end: number, pattern: string): number {
		const pattern_lower = pattern.toLowerCase();
		for (let pos = start; pos <= end - pattern.length; pos++) {
			let matches = true;
			for (let i = 0; i < pattern.length; i++) {
				const text_char = text.charCodeAt(pos + i);
				const text_char_lower = text_char >= 65 && text_char <= 90 ? text_char + 32 : text_char;
				if (text_char_lower !== pattern_lower.charCodeAt(i)) {
					matches = false;
					break;
				}
			}
			if (matches) {
				return pos;
			}
		}
		return -1;
	}

	/**
	 * Get the boundary registry
	 */
	get_registry(): Boundary_Registry {
		return this.registry;
	}

	/**
	 * Clear all registered languages and boundary types
	 */
	clear(): void {
		this.languages.clear();
		this.tokenizers.clear();
		this.registry.clear();
	}

	/**
	 * Convert boundaries to tokens by tokenizing code regions
	 * This is the second phase of the two-phase scanning approach
	 */
	private tokenize_boundaries(text: string, boundaries: Array<Boundary>): Array<Token> {
		const tokens: Array<Token> = [];

		for (const boundary of boundaries) {
			// Check if this is top-level content (type === null) that needs tokenization
			if (boundary.type === null) {
				// Check if we have a general tokenizer for this language
				const tokenizer = this.tokenizers.get(boundary.language);
				if (tokenizer) {
					// Tokenize the top-level content
					const code_tokens = tokenizer.tokenize(text, boundary.start, boundary.end);
					tokens.push(...code_tokens);
				} else {
					// No tokenizer, treat as plain content
					tokens.push({
						language: boundary.language,
						type: `${boundary.language}_content`,
						start: boundary.start,
						end: boundary.end,
					});
				}
			} else {
				// Check if we have a specific tokenizer for this boundary type
				const boundary_tokenizer = boundary.type
					? this.boundary_tokenizers.get(boundary.type)
					: null;
				if (boundary_tokenizer) {
					// Use the boundary-specific tokenizer
					const boundary_tokens = boundary_tokenizer.tokenize(text, boundary.start, boundary.end);
					tokens.push(...boundary_tokens);
				} else {
					// Non-tokenized boundary, convert directly to token with language prefix
					tokens.push({
						language: boundary.language,
						type:
							boundary.type && boundary.type.startsWith(boundary.language + '_')
								? boundary.type
								: `${boundary.language}_${boundary.type}`,
						start: boundary.start,
						end: boundary.end,
					});
				}
			}
		}

		// Sort tokens by position to ensure proper order
		tokens.sort((a, b) => a.start - b.start);

		return tokens;
	}
}
