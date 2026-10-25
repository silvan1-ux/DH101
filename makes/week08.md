---
title: "Week 8: Networks of Knowledge & Power"
week: 8
make_number: 7
tags: ["network analysis", "AI supply chain", "power", "labor", "extraction", "Kumu"]
summary: "A 29-node network traces materials, manufacturers, infrastructure, and AI companies to show supply-chain chokepoints and hidden dependencies."
---

# Week 8: Networks of Knowledge & Power

<details>
<summary>Interactive artifact: AI supply-chain network</summary>

<p>Open the public Kumu project to pan and zoom through the network, select nodes and connections, and inspect its interactive view.</p>

<p><a class="cyber-btn primary" href="https://kumu.io/natan07costa/ai-supply-chain-network-final#untitled-map" target="_blank" rel="noopener noreferrer">OPEN INTERACTIVE KUMU NETWORK</a></p>

<aside class="kumu-embed-note" role="note">
	<h3>About the map view</h3>
	<p>Kumu blocks its regular project page from being framed on other sites, so the interactive map opens in Kumu in a new tab. The network summary and text alternative below remain available here. A Kumu-generated embed link can be added later if you want the interactive view inside this page.</p>
</aside>

<div class="map-text-alternative" role="note" aria-labelledby="network-map-alternative-title">
	<h3 id="network-map-alternative-title">Text alternative: network structure</h3>
	<p>The network contains 29 nodes and 42 edges. Node types are materials, countries, extraction companies, manufacturers, AI/cloud companies, and infrastructure. Node size represents the number of connections. Six relationship types connect them: extracts from, sourced from, supplies to, manufactures for, buys/uses, and located in. The PDF says edge types are distinguished by color and line style.</p>
	<ul>
		<li><strong>Mineral cluster:</strong> cobalt, lithium, Glencore, CMOC, SQM, the Democratic Republic of the Congo, and Chile.</li>
		<li><strong>Chip-manufacturing cluster:</strong> ASML, TSMC, Shin-Etsu, SK Hynix, and quartz.</li>
		<li><strong>Big Tech and cloud cluster:</strong> Microsoft, Google, Amazon, Meta, and OpenAI, with the United States acting as a hub.</li>
	</ul>
	<p>Peripheral nodes include the Democratic Republic of the Congo, Taiwan, the Netherlands, South Korea, Japan, and mining companies. They have only one or two connections in the map despite their importance to the supply chain.</p>
</div>
</details>

<details>
<summary>Network analysis</summary>

<p>The map has 29 nodes and 42 edges. Nodes are colored and shaped by type (material, country, extraction company, manufacturer, AI/cloud company, and infrastructure). Edges use six relationship types, distinguished by color and line style: extracts from, sourced from, supplies to, manufactures for, buys/uses, and located in. Node size shows the number of connections.</p>

<p>The most central node is Data centers. It ties for the highest degree centrality (7 connections, along with Nvidia and the United States) and has the highest betweenness (0.51) and closeness (0.38) in the network. Minerals, batteries, chips, and cloud companies all lead to it. Nvidia comes next in importance: it also has 7 connections and a betweenness of 0.35, and it links the chip makers (TSMC, SK Hynix) to every major cloud company. TSMC has the highest betweenness among chip makers (0.20).</p>

<p>Three clusters emerged: a mineral cluster (cobalt, lithium, Glencore, CMOC, SQM, DRC, Chile), a chip-manufacturing cluster (ASML, TSMC, Shin-Etsu, SK Hynix, quartz), and a Big Tech and cloud cluster (Microsoft, Google, Amazon, Meta, OpenAI). The United States acts as a hub for the third cluster.</p>
</details>

<details>
<summary>Process and reflection</summary>

<p>What surprised me is how thin the periphery is. The Democratic Republic of the Congo, Taiwan, the Netherlands, South Korea, Japan, and the mining companies have only one or two connections, so they look small on the map, yet the real chain depends on them: without cobalt from the DRC or chips made in Taiwan, nothing above them works.</p>

<p>I was also surprised that CATL, a battery company, has the second-highest betweenness (0.43), because it is the main bridge between the mineral cluster and the data centers. That result partly reflects my own choices about what to include, which shows that a network is shaped by whoever builds it.</p>

<p>What is missing: the workers who mine cobalt, including child-labor concerns in the DRC; local communities; governments and export controls; the electricity and water that data centers consume; and companies such as Samsung, Intel, Apple, AMD, and Anthropic. The network also treats every line as equal, even though a small supplier and a giant customer are not equal partners.</p>
</details>

<details>
<summary>Artist statement</summary>

<p>My network shows that power in AI is concentrated in a few chokepoints. ASML is the only company that makes the EUV machines needed for the most advanced chips, TSMC fabricates the most advanced AI chips, and Nvidia designs the GPUs that nearly every cloud company buys. A few companies sit in the middle of the picture while many others hang from the edges. I chose this structure because supply chains are usually told from the top, starting with the brands people recognize.</p>

<p>Who is visible? Nvidia, Microsoft, Google, and OpenAI: names in the news and on stock tickers. Who is invisible? The miners in the DRC and Chile, the countries that appear only as small dots, and the workers, land, water, and electricity behind every line. In my visualization, the DRC looks as small as Japan, even though cobalt mining carries enormous human and environmental costs. A visualization can hide power by making all nodes and lines look equal.</p>

<p>A different structure would tell a different story. If I mapped labor instead of companies, mine workers and data-center workers would be at the center and Nvidia would be at the edge. If I mapped environmental impact, data centers and mining regions would become the hubs. If I sized nodes by profit, the mining nodes would shrink even more. Every network is a choice about who gets to be a node, and what I leave out is also a statement about power.</p>
</details>

<details>
<summary>Attribution</summary>

<p><strong>Mapping platform:</strong> Kumu.</p>
<p><strong>Source completeness:</strong> The supplied PDF does not include an AI-use attribution or source list for the map. I have not added tools, prompts, or citations that are not in the document.</p>
</details>
