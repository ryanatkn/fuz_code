import {detect_boundaries, find_matches_with_boundaries} from '$lib/rangestyler_builder.js';
import {rangestyler_global} from '$lib/rangestyler_global.js';
import {samples} from '$lib/samples/all.js';

export interface Boundary_Info {
	type: string;
	start: number;
	end: number;
	language?: string;
	text_snippet: string;
	length: number;
}

export interface Match_Info {
	pattern_name: string;
	text: string;
	start: number;
	end: number;
	priority: number;
}

export interface Match_Statistics {
	total: number;
	by_type: Record<string, number>;
	samples: Array<Match_Info>;
}

export interface Language_Diagnostics {
	boundaries: Array<Boundary_Info>;
	matches: Match_Statistics;
}

// Process a language sample and return diagnostics
export const process_language_sample = async (lang: string): Promise<Language_Diagnostics> => {
	const content = samples[lang as keyof typeof samples];
	if (!content) {
		throw new Error(`No sample found for language: ${lang}`);
	}

	// Detect boundaries
	const boundaries = detect_boundaries(content);
	const boundary_infos: Array<Boundary_Info> = boundaries.map((b) => ({
		type: b.type,
		start: b.start,
		end: b.end,
		language: b.language,
		length: b.end - b.start,
		text_snippet: format_snippet(
			content.slice(b.start, Math.min(b.end, b.start + 50)),
			b.end - b.start > 50,
		),
	}));

	// Get patterns and find matches
	const patterns = rangestyler_global.get_language(lang)?.patterns || [];
	const matches = find_matches_with_boundaries(
		content,
		patterns,
		lang,
		(id) => rangestyler_global.get_language(id)?.patterns,
	);

	// Process match statistics
	const matches_by_type: Record<string, number> = {};
	const match_samples: Array<Match_Info> = [];
	const samples_per_type = 3;
	const max_total_samples = 20;

	for (const match of matches) {
		const pattern_name = match.pattern.name;
		matches_by_type[pattern_name] = (matches_by_type[pattern_name] || 0) + 1;

		// Collect samples of each type
		if (
			match_samples.filter((m) => m.pattern_name === pattern_name).length < samples_per_type &&
			match_samples.length < max_total_samples
		) {
			match_samples.push({
				pattern_name,
				text: content.slice(match.start, Math.min(match.end, match.start + 30)),
				start: match.start,
				end: match.end,
				priority: match.pattern.priority || 0,
			});
		}
	}

	return {
		boundaries: boundary_infos,
		matches: {
			total: matches.length,
			by_type: matches_by_type,
			samples: match_samples,
		},
	};
};

// Format a text snippet for display
export const format_snippet = (text: string, truncated: boolean): string => {
	const formatted = text.replace(/\n/g, '\\n').replace(/\t/g, '\\t');
	return truncated ? formatted + '...' : formatted;
};

// Generate markdown report for a language
export const generate_language_report = (
	lang: string,
	diagnostics: Language_Diagnostics,
): string => {
	let md = `# ${lang.toUpperCase()} Diagnostics\n\n`;

	// Boundaries section
	md += '## Boundaries Detected\n\n';
	if (diagnostics.boundaries.length > 0) {
		md += '| Type | Start | End | Length | Language | Snippet |\n';
		md += '|------|-------|-----|--------|----------|----------|\n';
		for (const b of diagnostics.boundaries) {
			const snippet = b.text_snippet.substring(0, 40);
			const lang_col = b.language || '-';
			md += `| ${b.type} | ${b.start} | ${b.end} | ${b.length} | ${lang_col} | \`${snippet}\` |\n`;
		}
	} else {
		md += 'No boundaries detected (entire file is content).\n';
	}
	md += '\n';

	// Match statistics
	md += '## Match Statistics\n\n';
	md += `**Total matches:** ${diagnostics.matches.total}\n\n`;

	if (Object.keys(diagnostics.matches.by_type).length > 0) {
		md += '### Distribution by Pattern Type\n\n';
		md += '| Pattern Type | Count | Percentage |\n';
		md += '|--------------|-------|------------|\n';
		const sorted_types = Object.entries(diagnostics.matches.by_type).sort(([, a], [, b]) => b - a);
		for (const [type, count] of sorted_types) {
			const percentage = ((count / diagnostics.matches.total) * 100).toFixed(1);
			md += `| ${type} | ${count} | ${percentage}% |\n`;
		}
	}
	md += '\n';

	// Sample matches
	md += '## Sample Matches\n\n';
	if (diagnostics.matches.samples.length > 0) {
		md += '| Pattern | Text | Position | Priority |\n';
		md += '|---------|------|----------|----------|\n';
		for (const sample of diagnostics.matches.samples) {
			const text = sample.text.replace(/\n/g, '\\n').replace(/\t/g, '\\t');
			md += `| ${sample.pattern_name} | \`${text}\` | ${sample.start}-${sample.end} | ${sample.priority} |\n`;
		}
	} else {
		md += 'No matches found.\n';
	}
	md += '\n';

	// Summary
	md += '## Summary\n\n';
	if (diagnostics.boundaries.filter((b) => b.type === 'script').length > 0) {
		md += '- ✅ Script boundaries detected\n';
	}
	if (diagnostics.boundaries.filter((b) => b.type === 'style').length > 0) {
		md += '- ✅ Style boundaries detected\n';
	}
	const embedded_langs = new Set(diagnostics.boundaries.map((b) => b.language).filter(Boolean));
	if (embedded_langs.size > 0) {
		md += `- 🔧 Embedded languages: ${Array.from(embedded_langs).join(', ')}\n`;
	}
	md += `- 📊 Pattern types: ${Object.keys(diagnostics.matches.by_type).length}\n`;
	md += `- 🎯 Total matches: ${diagnostics.matches.total}\n`;

	return md;
};

// Generate a comparison report between multiple languages
export const generate_comparison_report = (
	all_diagnostics: Record<string, Language_Diagnostics>,
): string => {
	let md = '# Rangestyler Diagnostics Comparison\n\n';

	md += '## Overview\n\n';
	md += '| Language | Boundaries | Total Matches | Pattern Types | Has Script | Has Style |\n';
	md += '|----------|------------|---------------|---------------|------------|------------|\n';

	for (const [lang, diag] of Object.entries(all_diagnostics)) {
		const has_script = diag.boundaries.some((b) => b.type === 'script') ? '✅' : '❌';
		const has_style = diag.boundaries.some((b) => b.type === 'style') ? '✅' : '❌';
		const pattern_types = Object.keys(diag.matches.by_type).length;
		md += `| ${lang.toUpperCase()} | ${diag.boundaries.length} | ${diag.matches.total} | ${pattern_types} | ${has_script} | ${has_style} |\n`;
	}

	md += '\n## Key Findings\n\n';

	// Languages with embedded content
	const embedded_langs = Object.entries(all_diagnostics)
		.filter(([, diag]) => diag.boundaries.some((b) => b.type === 'script' || b.type === 'style'))
		.map(([lang]) => lang.toUpperCase());

	if (embedded_langs.length > 0) {
		md += `- **Languages with embedded content:** ${embedded_langs.join(', ')}\n`;
	}

	// Most complex language
	const by_matches = Object.entries(all_diagnostics).sort(
		([, a], [, b]) => b.matches.total - a.matches.total,
	);
	if (by_matches.length > 0) {
		md += `- **Most complex (by match count):** ${by_matches[0][0].toUpperCase()} with ${by_matches[0][1].matches.total} matches\n`;
	}

	return md;
};
