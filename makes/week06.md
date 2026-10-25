---
title: "Week 6: How Machines Read"
week: 6
make_number: 5
tags: ["distant reading", "Voyant Tools", "text analysis", "Martin Luther King Jr.", "ChatGPT"]
summary: "I compare Voyant's word-frequency and trend visualizations with GPT's rhetorical reading of Martin Luther King Jr.'s 'I Have a Dream' speech."
---

# Week 6: How Machines Read

<details>
<summary>Interactive artifact: Voyant Tools corpus</summary>

<p>The embedded Voyant workspace uses the shared corpus from my project. Its panels include Cirrus, Terms, Links, Reader, Trends, document terms, summary, and contexts. Visitors can use the controls inside the embed to explore the corpus.</p>

<p><a class="card-btn" href="https://voyant-tools.org/?corpus=efb16bd8d4d3f71b58715518e2159746" target="_blank" rel="noopener noreferrer">Open interactive Voyant corpus in a new tab</a></p>

<div class="voyant-embed" role="group" aria-label="Interactive Voyant Tools analysis of the I Have a Dream speech">
	<iframe src="https://voyant-tools.org/?corpus=efb16bd8d4d3f71b58715518e2159746" title="Interactive Voyant Tools workspace for the I Have a Dream speech, including word cloud, reader, trends, summary, and contexts" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

<p class="voyant-fallback"><strong>If the interactive workspace does not load:</strong> open the Voyant corpus using the link above. The image below is a static record of the analysis and does not replace the interactive tools.</p>

<figure class="activity-figure">
	<button class="lightbox-trigger" type="button" data-lightbox-src="{{ site.baseurl }}/assets/img/how-machines-read-voyant-dashboard.png" data-lightbox-alt="Screenshot of the Voyant workspace showing a Cirrus word cloud, the speech in the Reader, a Trends graph for ring, negro, let, freedom, and dream, and summary and contexts panels.">
		<img src="{{ site.baseurl }}/assets/img/how-machines-read-voyant-dashboard.png" alt="Screenshot of the Voyant workspace showing a Cirrus word cloud, the speech in the Reader, a Trends graph for ring, negro, let, freedom, and dream, and summary and contexts panels." loading="lazy">
	</button>
	<figcaption>Voyant workspace captured for the assignment. The live embed above provides the interactive panels when Voyant is available.</figcaption>
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
