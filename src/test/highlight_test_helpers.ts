/**
 * Test helpers for Highlight_Manager tests
 *
 * Provides utilities for mocking the CSS Custom Highlight API and creating
 * test DOM elements in a jsdom environment.
 */

// Mock implementation of CSS Custom Highlight API
export class Mock_Highlight extends Set<Range> {
	priority = 0;
}

// Mock Range class with bounds validation
export class Mock_Range {
	start_container: Node | null = null;
	start_offset = 0;
	end_container: Node | null = null;
	end_offset = 0;

	get startOffset(): number {
		return this.start_offset;
	}

	get endOffset(): number {
		return this.end_offset;
	}

	setStart(node: Node, offset: number): void {
		if (node.nodeType !== 3) {
			throw new Error('Range can only be set on text nodes');
		}
		const text_length = node.textContent?.length ?? 0;
		if (offset < 0 || offset > text_length) {
			throw new DOMException(`Index or size is negative or greater than the allowed amount`);
		}
		this.start_container = node;
		this.start_offset = offset;
	}

	setEnd(node: Node, offset: number): void {
		if (node.nodeType !== 3) {
			throw new Error('Range can only be set on text nodes');
		}
		const text_length = node.textContent?.length ?? 0;
		if (offset < 0 || offset > text_length) {
			throw new DOMException(`Index or size is negative or greater than the allowed amount`);
		}
		this.end_container = node;
		this.end_offset = offset;
	}
}

// Store for original globals
export interface Saved_Globals {
	css: any;
	highlight: any;
	range: any;
	node: any;
}

/**
 * Setup CSS Highlight API mocks in global scope
 */
export function setup_mock_highlight_api(): Saved_Globals {
	const saved: Saved_Globals = {
		css: (globalThis as any).CSS,
		highlight: (globalThis as any).Highlight,
		range: (globalThis as any).Range,
		node: (globalThis as any).Node,
	};

	// Mock CSS Highlight API
	(globalThis as any).CSS = {
		highlights: new Map<string, Mock_Highlight>(),
	};
	(globalThis as any).Highlight = Mock_Highlight;
	(globalThis as any).Range = Mock_Range;

	// Mock Node with TEXT_NODE constant
	(globalThis as any).Node = {
		TEXT_NODE: 3,
		ELEMENT_NODE: 1,
		COMMENT_NODE: 8,
	};

	return saved;
}

/**
 * Restore original globals
 */
export function restore_globals(saved: Saved_Globals): void {
	(globalThis as any).CSS = saved.css;
	(globalThis as any).Highlight = saved.highlight;
	(globalThis as any).Range = saved.range;
	(globalThis as any).Node = saved.node;
}

/**
 * Create a mock code element with text content
 */
export function create_code_element(text_content: string): Element {
	const text_node = {
		nodeType: 3, // TEXT_NODE
		textContent: text_content,
	} as unknown as Text;

	const element = {
		childNodes: [text_node],
	} as unknown as Element;

	return element;
}

/**
 * Create a mock code element with comment node before text (simulates Svelte)
 */
export function create_code_element_with_comment(
	text_content: string,
	_comment: string = 'svelte-check-ignore',
): Element {
	const comment_node = {
		nodeType: 8, // COMMENT_NODE
	} as unknown as Comment;

	const text_node = {
		nodeType: 3, // TEXT_NODE
		textContent: text_content,
	} as unknown as Text;

	const element = {
		childNodes: [comment_node, text_node],
	} as unknown as Element;

	return element;
}
