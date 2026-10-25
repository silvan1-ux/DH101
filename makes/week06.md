---
title: "Week 6: How Machines Read"
week: 6
make_number: 5
tags: ["distant reading", "Voyant Tools", "text analysis", "Martin Luther King Jr.", "ChatGPT"]
summary: "I compare Voyant's word-frequency and trend visualizations with GPT's rhetorical reading of Martin Luther King Jr.'s 'I Have a Dream' speech."
---

# Week 6: How Machines Read

<details>
<summary>Interactive text explorer</summary>

<p>This on-page text explorer runs in your browser. Paste text or load a plain-text file, then explore frequent words, their distribution across the text, and the passages around each occurrence. Your text is not uploaded to this website.</p>

<div class="text-explorer" data-text-explorer>
	<div class="text-explorer-inputs">
		<label for="explorer-file">Choose a document to analyze</label>
		<div class="text-explorer-file-picker">
			<input id="explorer-file" type="file" accept=".txt,.md,.markdown,.csv,.tsv,.html,.htm,.xml,.json,.yaml,.yml,.rtf,.pdf,.docx,text/plain,text/csv,text/html,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" data-explorer-file aria-describedby="explorer-file-help">
		</div>
		<p id="explorer-file-help" class="text-explorer-help">Supported: TXT, Markdown, CSV, HTML, XML, JSON, RTF, PDF, and DOCX. Files are read locally in your browser.</p>
		<label for="explorer-text">Or paste text to analyze</label>
		<textarea id="explorer-text" rows="8" data-explorer-text placeholder="Paste text here. For copyright reasons, only use text you have permission to analyze."></textarea>
		<div class="text-explorer-actions">
			<button type="button" class="card-btn" data-explorer-analyze>Analyze text</button>
			<label class="text-explorer-option"><input type="checkbox" data-explorer-stopwords checked> Exclude common English words</label>
		</div>
		<p class="text-explorer-status" data-explorer-status aria-live="polite">Add text to begin. Text is analyzed locally in this browser.</p>
	</div>

	<div class="text-explorer-results" data-explorer-results hidden>
		<div class="text-explorer-summary" data-explorer-summary aria-live="polite"></div>
		<div class="text-explorer-tabs" role="tablist" aria-label="Text analysis views">
			<button type="button" role="tab" id="explorer-tab-cloud" aria-controls="explorer-panel-cloud" aria-selected="true" data-explorer-tab="cloud">Cirrus</button>
			<button type="button" role="tab" id="explorer-tab-terms" aria-controls="explorer-panel-terms" aria-selected="false" tabindex="-1" data-explorer-tab="terms">Terms</button>
			<button type="button" role="tab" id="explorer-tab-trends" aria-controls="explorer-panel-trends" aria-selected="false" tabindex="-1" data-explorer-tab="trends">Trends</button>
			<button type="button" role="tab" id="explorer-tab-contexts" aria-controls="explorer-panel-contexts" aria-selected="false" tabindex="-1" data-explorer-tab="contexts">Contexts</button>
			<button type="button" role="tab" id="explorer-tab-reader" aria-controls="explorer-panel-reader" aria-selected="false" tabindex="-1" data-explorer-tab="reader">Reader</button>
		</div>
		<section id="explorer-panel-cloud" class="text-explorer-panel" role="tabpanel" aria-labelledby="explorer-tab-cloud" data-explorer-panel="cloud">
			<h3>Cirrus // frequent terms</h3>
			<p>Select a term to inspect its trend and contexts.</p>
			<div class="text-explorer-cloud" data-explorer-cloud></div>
		</section>
		<section id="explorer-panel-terms" class="text-explorer-panel" role="tabpanel" aria-labelledby="explorer-tab-terms" data-explorer-panel="terms" hidden>
			<h3>Terms // frequency</h3>
			<ol class="text-explorer-term-list" data-explorer-terms></ol>
		</section>
		<section id="explorer-panel-trends" class="text-explorer-panel" role="tabpanel" aria-labelledby="explorer-tab-trends" data-explorer-panel="trends" hidden>
			<h3>Trends // distribution by text segment</h3>
			<p data-explorer-selected-term>Select a term in Cirrus or Terms.</p>
			<ol class="text-explorer-trends" data-explorer-trends></ol>
		</section>
		<section id="explorer-panel-contexts" class="text-explorer-panel" role="tabpanel" aria-labelledby="explorer-tab-contexts" data-explorer-panel="contexts" hidden>
			<h3>Contexts // surrounding passages</h3>
			<p data-explorer-context-term>Select a term in Cirrus or Terms.</p>
			<ol class="text-explorer-contexts" data-explorer-contexts></ol>
		</section>
		<section id="explorer-panel-reader" class="text-explorer-panel" role="tabpanel" aria-labelledby="explorer-tab-reader" data-explorer-panel="reader" hidden>
			<h3>Reader // analyzed text</h3>
			<pre class="text-explorer-reader" data-explorer-reader></pre>
		</section>
	</div>
</div>

<p class="voyant-fallback"><strong>Voyant Tools corpus:</strong> The external Voyant service is currently unavailable, so its saved corpus cannot load right now. You can still use the local text explorer above. The original shared-corpus link remains available if Voyant comes back online.</p>
<p><a class="card-btn" href="https://voyant-tools.org/?corpus=efb16bd8d4d3f71b58715518e2159746" target="_blank" rel="noopener noreferrer">Open original Voyant corpus</a></p>

<figure class="activity-figure">
	<button class="lightbox-trigger" type="button" data-lightbox-src="{{ site.baseurl }}/assets/img/how-machines-read-voyant-dashboard.png" data-lightbox-alt="Screenshot of the Voyant workspace showing a Cirrus word cloud, the speech in the Reader, a Trends graph for ring, negro, let, freedom, and dream, and summary and contexts panels.">
		<img src="{{ site.baseurl }}/assets/img/how-machines-read-voyant-dashboard.png" alt="Screenshot of the Voyant workspace showing a Cirrus word cloud, the speech in the Reader, a Trends graph for ring, negro, let, freedom, and dream, and summary and contexts panels." loading="lazy">
	</button>
	<figcaption>Screenshot of the Voyant workspace included with the assignment PDF. The local explorer above provides interactive text analysis without the external Voyant server.</figcaption>
</figure>
</details>

<details>
<summary>Voyant analysis</summary>

<p>When analyzing the text with Voyant, I found that the most frequent content words were freedom (19), ring (12), let (11), dream (11), and negro (10). Through the Trends view, I mapped clear spatial patterns across the speech: the term freedom remains consistently present throughout, whereas dream forms a major peak in the second half, and ring spikes dramatically near the end. The Cirrus (Word Cloud) helped me visually emphasize these high-frequency terms, though it provided no explanation of how they relate conceptually or emotionally.</p>

<p>Voyant helped me visualize structural repetition and cadence, specifically how King builds rhetorical momentum by shifting focus from initial themes of freedom to the repeated refrains of dream and “let freedom ring.” However, because it treated the text strictly as word counts, the tool failed to convey the historical weight, moral urgency, or emotional depth of King's message.</p>

<p><strong>Source check:</strong> The written summary in my PDF reports “freedom” 19 times, but the Voyant summary visible in the PDF screenshot reports 13. The other listed counts agree. The corpus itself is linked above so this count can be checked directly.</p>
<!-- TODO: Verify whether the correct Voyant frequency for "freedom" is 19 or 13; the PDF text and its screenshot disagree. -->
</details>

<details>
<summary>GPT analysis and comparison</summary>

<p><strong>Prompt used:</strong> “Provide a rhetorical and literary analysis of Martin Luther King Jr.'s ‘I Have a Dream’ speech, focusing on themes, repetition, and tone.”</p>

<p>To complement my quantitative findings, I prompted GPT to provide a structured literary and rhetorical critique. It identified core themes (racial justice, unfulfilled constitutional promises, and nonviolent resistance), detailed King's use of anaphora (repeating “One hundred years later,” “We cannot be satisfied,” “I have a dream,” and “Let freedom ring”), and explained vivid metaphors such as the financial “promissory note” and nature-based contrasts between “sweltering heat” and “oases of freedom.” It described the tone as shifting from urgent and indicative to prophetic and triumphant.</p>

<p>I observed that GPT's analysis sounded authoritative, fluent, and well-organized, closely mirroring human literary analysis. However, it presented high-level thematic synthesis without displaying exact word distributions or line citations unless I explicitly prompted it to do so.</p>

<p>Through my analysis, I realized that Voyant and GPT represent two fundamentally different approaches to machine reading. Voyant treats the text as a dataset of word frequencies, trends, and spatial counts. It made structural patterns transparent and verifiable for me, such as the distribution of “freedom” versus “ring,” but lacked semantic interpretation, tone, or context. GPT treats the text as a cohesive linguistic whole. It synthesized themes and rhetorical structures fluently, offering interpretations that resembled human critical reading.</p>

<p>In short, I found Voyant to be transparent but limited: it showed its raw evidence clearly but could not explain why words matter. Conversely, GPT felt persuasive but opaque: it delivered compelling analysis based on learned statistical patterns without making its analytical process visible.</p>
</details>

<details>
<summary>Reflection</summary>

<p>This assignment revealed to me that machines do not “read” texts in the way human beings do; instead, they process statistical distributions and linguistic patterns. Voyant reads by counting and mapping tokens across a document, operating on the assumption that word frequency directly correlates with importance. While I found this approach useful for uncovering macro-level structure and repetition, I also noticed it can be misleading. A rare, single metaphor spoken once in a speech may carry more emotional resonance than a high-frequency common noun, yet Voyant cannot distinguish between them.</p>

<p>GPT, on the other hand, generated interpretations that sounded humanly empathetic and academically rigorous, explaining themes, metaphors, and tone with remarkable fluency. However, I recognized that this fluency can be deceiving. GPT does not actually “experience” or engage with the text as evidence; it predicts coherent narrative responses based on patterns learned from vast training datasets. It delivers authoritative conclusions without naturally proving how it arrived at them.</p>

<p>Ultimately, I concluded that what we gain from machine reading is speed, scale, and pattern recognition, allowing us to observe structural shifts that human readers might overlook. What we lose is critical accountability and contextual depth. Neither Voyant nor GPT possesses historical awareness, lived experience, or moral judgment. Consequently, I believe machine reading should not replace human reading, but rather serve as a tool to provoke better, more precise questions. The primary danger is not that machines misinterpret texts, but that human readers stop reflecting on how interpretations are constructed.</p>

<p>— Natan Silva</p>
</details>

<details>
<summary>Process and AI attribution</summary>

<p><strong>Text analyzed:</strong> “I Have a Dream” by Martin Luther King Jr. (excerpts, public-domain educational resource, as identified in my PDF).</p>
<p><strong>Tools:</strong> Voyant Tools and ChatGPT / AI model.</p>
<p><strong>GPT prompt:</strong> “Provide a rhetorical and literary analysis of Martin Luther King Jr.'s ‘I Have a Dream’ speech, focusing on themes, repetition, and tone.”</p>
<p><strong>Limitations noted:</strong> Voyant provides visualizations without semantic interpretation or context; GPT provides persuasive interpretation without transparent evidence tracing or explicit data counts.</p>
</details>
