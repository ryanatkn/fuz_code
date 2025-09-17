import Code from '$lib/Code.svelte';
import type {Benchmarked_Implementation} from './benchmark_types.js';

// Implementation configurations
export const implementations: Benchmarked_Implementation[] = [
	{name: 'syntax_html', component: Code, mode: 'html'},
	{name: 'syntax_ranges', component: Code, mode: 'ranges'},
];

import type {Code_Sample} from '$lib/code_sample.js';

// Languages to test (excluding Svelte for now)
export const languages = ['ts', 'css', 'html', 'json'] as const;
export type Language = (typeof languages)[number];

// Find appropriate sample for a language
export const find_sample = (samples: Record<string, Code_Sample>, lang: string) => {
	return Object.values(samples).find((s) => s.lang === lang && s.name.includes('complex'));
};

// Generate large content by repeating and varying the base content
export const generate_large_content = (
	base_content: string,
	lang: string,
	multiplier: number,
): string => {
	const sections: string[] = [];

	for (let i = 0; i < multiplier; i++) {
		let section = base_content;

		// Add unique variations to prevent any caching
		if (lang === 'ts' || lang === 'js') {
			// Vary variable names and function names
			section = section
				.replace(/const a = /g, `const a${i} = `)
				.replace(/const b = /g, `const b${i} = `)
				.replace(/const c = /g, `const c${i} = `)
				.replace(/class D /g, `class D${i} `)
				.replace(/Some_Type/g, `Some_Type${i}`)
				.replace(/class_method/g, `class_method${i}`)
				.replace(/instance_method/g, `instance_method${i}`);

			// Add section separator comment
			sections.push(`// ============ Section ${i} ============\n${section}`);
		} else if (lang === 'css') {
			// Vary class names and IDs
			section = section
				.replace(/\.class/g, `.class${i}`)
				.replace(/#id/g, `#id${i}`)
				.replace(/--var/g, `--var${i}`)
				.replace(/color_/g, `color${i}_`);

			// Add section separator comment
			sections.push(`/* ============ Section ${i} ============ */\n${section}`);
		} else if (lang === 'html') {
			// Vary IDs, classes, and data attributes
			section = section
				.replace(/id="/g, `id="id${i}_`)
				.replace(/class="/g, `class="class${i}_`)
				.replace(/data-/g, `data-${i}-`);

			// Add section separator comment
			sections.push(`<!-- ============ Section ${i} ============ -->\n${section}`);
		} else if (lang === 'json') {
			// For JSON, we need to be more careful to maintain valid syntax
			// Just add whitespace variations
			section = section.replace(/\n/g, '\n' + ' '.repeat(i % 3));
			sections.push(section);
			// For JSON, we'll wrap multiple copies in an array
			if (i === 0) {
				sections[0] = '[\n' + section;
			} else if (i === multiplier - 1) {
				sections.push('\n]');
			} else {
				sections[i] = ',\n' + section;
			}
		}
	}

	return sections.join('\n\n');
};

// Pre-generate all large content for a benchmark run
export const pre_generate_large_contents = (
	samples: Record<string, Code_Sample>,
	langs: readonly string[],
	multiplier: number,
): Map<string, string> => {
	const large_contents = new Map<string, string>();

	for (const lang of langs) {
		const sample = find_sample(samples, lang);
		if (!sample) continue;

		const large_content = generate_large_content(sample.content, lang, multiplier);
		large_contents.set(lang, large_content);

		// Log the size for debugging
		const size_kb = (new TextEncoder().encode(large_content).length / 1024).toFixed(1);
		console.log(`[Fixtures] Pre-generated ${lang}: ${size_kb}KB (${multiplier}x)`);
	}

	return large_contents;
};
