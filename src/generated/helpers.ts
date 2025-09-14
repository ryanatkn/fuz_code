import {readFileSync} from 'node:fs';
import {search_fs} from '@ryanatkn/gro/search_fs.js';
import {basename, join, relative} from 'node:path';
import {domstyler_global} from '$lib/domstyler_global.js';
import {
	find_matches_with_boundaries,
	resolve_overlaps,
	generate_html_fallback,
} from '$lib/rangestyler_builder.js';
import {rangestyler_global} from '$lib/rangestyler_global.js';

export interface Sample_Spec {
	lang: string;
	variant: string;
	content: string;
	filepath: string;
}

export interface Match_Statistics {
	total: number;
	by_type: Record<string, number>;
	samples: Array<{
		pattern_name: string;
		text: string;
		start: number;
		end: number;
		priority: number;
	}>;
}

export interface Generated_Output {
	sample: Sample_Spec;
	boundaries: Array<any>;
	matches: Match_Statistics;
	domstyler_html: string;
	rangestyler_html: string;
}

/**
 * Discover all sample files in src/lib/samples
 */
export function discover_samples(): Array<Sample_Spec> {
	const sample_files = search_fs('src/lib/samples', {
		file_filter: (path) => /sample_[^/]+\.(ts|css|html|json|svelte)$/.test(path),
	});

	const samples: Array<Sample_Spec> = [];

	for (const file of sample_files) {
		const filename = basename(file.id);
		const match = filename.match(/sample_([^.]+)\.(.+)$/);
		if (!match) continue;

		const [, variant, lang] = match;
		const content = readFileSync(file.id, 'utf-8');

		samples.push({
			lang,
			variant,
			content,
			filepath: relative(process.cwd(), file.id),
		});
	}

	return samples;
}

/**
 * Get the fixture path for a given language and variant
 */
export function get_fixture_path(lang: string, variant: string, ext: 'json' | 'md'): string {
	return join('src/generated', lang, `${lang}_${variant}.${ext}`);
}

/**
 * Generate domstyler HTML output for a sample
 */
export function generate_domstyler_output(sample: Sample_Spec): string {
	return domstyler_global.stylize(sample.content, sample.lang);
}

/**
 * Generate rangestyler data for a sample
 */
export function generate_rangestyler_data(sample: Sample_Spec): {
	html: string;
	boundaries: Array<any>;
	matches: Match_Statistics;
} {
	const language = rangestyler_global.get_language(sample.lang);

	if (!language) {
		return {
			html: '',
			boundaries: [],
			matches: {total: 0, by_type: {}, samples: []},
		};
	}

	// Detect boundaries
	const boundaries = language.detect_boundaries?.(sample.content) || [{
		type: 'content',
		start: 0,
		end: sample.content.length,
	}];

	// Find matches
	const match_result = find_matches_with_boundaries(
		sample.content,
		language.patterns,
		sample.lang,
		(id) => rangestyler_global.get_language(id)?.patterns,
		language.detect_boundaries,
	);

	// Generate statistics
	const matches = generate_match_statistics(sample, match_result.matches);

	// Generate HTML
	const resolved = resolve_overlaps(match_result.matches);
	const html = generate_html_fallback(sample.content, resolved);

	return {html, boundaries, matches};
}

/**
 * Generate match statistics from rangestyler matches
 */
export function generate_match_statistics(
	sample: Sample_Spec,
	matches: Array<any>
): Match_Statistics {
	const match_stats: Record<string, number> = {};
	const match_samples: Array<any> = [];

	for (const match of matches) {
		const type = match.pattern.name;
		match_stats[type] = (match_stats[type] || 0) + 1;

		// Include first few examples of each type
		if (match_samples.filter(m => m.pattern_name === type).length < 3) {
			match_samples.push({
				pattern_name: type,
				text: sample.content.slice(match.start, match.end),
				start: match.start,
				end: match.end,
				priority: match.pattern.priority || 0,
			});
		}
	}

	return {
		total: matches.length,
		by_type: match_stats,
		samples: match_samples,
	};
}

/**
 * Process a sample and generate all outputs
 */
export function process_sample(sample: Sample_Spec): Generated_Output {
	const domstyler_html = generate_domstyler_output(sample);
	const rangestyler_data = generate_rangestyler_data(sample);

	return {
		sample: {
			lang: sample.lang,
			variant: sample.variant,
			content: sample.content,
			filepath: sample.filepath,
		},
		boundaries: rangestyler_data.boundaries,
		matches: rangestyler_data.matches,
		domstyler_html,
		rangestyler_html: rangestyler_data.html,
	};
}

/**
 * Generate markdown report for a sample
 */
export function generate_report(output: Generated_Output): string {
	const {sample, boundaries, matches, domstyler_html, rangestyler_html} = output;

	return `# ${sample.lang.toUpperCase()} ${sample.variant.charAt(0).toUpperCase() + sample.variant.slice(1)} Sample Report

## Sample Info
- **Language**: ${sample.lang}
- **Variant**: ${sample.variant}
- **Source**: ${sample.filepath}
- **Size**: ${sample.content.length} characters

## Statistics

### Boundaries
- **Total**: ${boundaries.length}
${boundaries.map(b => `- ${b.type}: [${b.start}:${b.end}]`).join('\n')}

### Matches
- **Total**: ${matches.total}
- **By Type**:
${Object.entries(matches.by_type).map(([type, count]) => `  - ${type}: ${count}`).join('\n')}

## Sample Matches
${matches.samples.slice(0, 10).map(m =>
	`- **${m.pattern_name}** [${m.start}:${m.end}]: \`${m.text.replace(/`/g, '\\`')}\``
).join('\n')}

## Domstyler Output
\`\`\`html
${domstyler_html}
\`\`\`

## Rangestyler Output
\`\`\`html
${rangestyler_html}
\`\`\`

## Comparison
- Domstyler size: ${domstyler_html.length} bytes
- Rangestyler size: ${rangestyler_html.length} bytes
- Size difference: ${domstyler_html.length - rangestyler_html.length} bytes

---
*Generated by src/generated/update.task.ts*
`;
}