import type {Boundary_Type_Def} from './boundary_scanner_types.js';

/**
 * Registry for boundary type definitions.
 * Stores and manages all boundary types across languages.
 */
export class Boundary_Registry {
	/** Map of boundary type name to definition */
	private types = new Map<string, Boundary_Type_Def>();

	/** Map of language to its boundary types */
	private types_by_language = new Map<string, Set<string>>();

	/**
	 * Register a boundary type definition
	 */
	register(def: Boundary_Type_Def): void {
		// Store the definition
		this.types.set(def.name, def);

		// Track by language
		if (!this.types_by_language.has(def.language)) {
			this.types_by_language.set(def.language, new Set());
		}
		this.types_by_language.get(def.language)!.add(def.name);
	}

	/**
	 * Get a boundary type definition by name
	 */
	get(name: string): Boundary_Type_Def | undefined {
		return this.types.get(name);
	}

	/**
	 * Get all boundary types for a language
	 */
	get_all_for_language(language: string): Array<Boundary_Type_Def> {
		const type_names = this.types_by_language.get(language);
		if (!type_names) {
			return [];
		}

		const result: Array<Boundary_Type_Def> = [];
		for (const name of type_names) {
			const def = this.types.get(name);
			if (def) {
				result.push(def);
			}
		}
		return result;
	}

	/**
	 * Check if a boundary type exists
	 */
	has(name: string): boolean {
		return this.types.has(name);
	}

	/**
	 * Clear all registered types
	 */
	clear(): void {
		this.types.clear();
		this.types_by_language.clear();
	}

	/**
	 * Get the count of registered types
	 */
	get size(): number {
		return this.types.size;
	}

	/**
	 * Get all registered languages
	 */
	get_languages(): Array<string> {
		return Array.from(this.types_by_language.keys());
	}
}
