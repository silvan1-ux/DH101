# Week 1: Reverse Engineering

## Reverse-engineering a DH/AI project: DALL-E 3

### 1. What Is Being Made?

This project generates original digital images from textual descriptions. The output is a high-quality visual illustration, photo, or graphic tailored to user prompts. It creates an experience of instant, collaborative creation where the user feels like they are conversing with an artist who instantly paints their thoughts.

### 2. What Is the Project Made From? (Data)

The project is made from massive datasets containing millions of pairs of images and text descriptions scraped from the internet. In this case, "data" also includes the conversational logs of ChatGPT. Explicitly excluded or restricted data includes images of public figures or harmful content, and the styles of living artists who requested to opt out.

### 3. Tools, Algorithms, or Systems

The system integrates ChatGPT with a diffusion model (DALL-E 3). AI is used at two main stages: first, ChatGPT automatically refines and expands the user's simple prompt; second, the diffusion model translates that text into pixels. The prompt expansion feels automated, while the final aesthetic choice remains guided by the user's iterative feedback.

### 4. Human Labor & Decisions

Human labor is present in the engineers who trained the models and the "red teamers" (safety testers) who defined boundaries for harmful content. Human judgment heavily shapes the outcome through safety classifiers, determining what is ethically "acceptable" to generate and deciding how the system should respect or reject requests involving artistic copyright.

### 5. Design as Argument

By embedding DALL-E 3 directly into a chat interface, the design argues that image generation should be as simple as having a conversation. This interface makes the complex pipeline of text-to-image translation look effortless and immediate, hiding the massive server infrastructure, safety filters, and provenance tracking working behind the scenes.

## Reflection

Looking at this project, it becomes clear that "making" art with DALL-E 3 isn't really about physical craftsmanship anymore. Instead, it's about learning how to guide and negotiate with a system. You aren't actually drawing or manipulating pixels yourself; you're acting more like an art director, using plain language to translate an idea into a visual outcome.

This completely changes how we think about authorship. When a tool like DALL-E 3 generates an image, the line between who made what gets pretty blurry. The final result belongs to a shared space made up of three things: your initial idea, ChatGPT's interpretation of your words, and the massive history of millions of artists whose work trained the model in the first place. You don't need technical drawing skills anymore, but you do need to know how to communicate, evaluate, and tweak what the machine gives back to you.

What's most interesting is that your creative freedom isn't totally yours either. Every time you ask DALL-E 3 to make something, you are working within invisible boundaries, like safety filters, ethical rules, and restricted datasets set up behind the scenes. In the end, creating art with AI isn't just about using a smart tool. It's about having a back-and-forth conversation with a system that gives you incredible creative power, but also decides exactly what you are and aren't allowed to see.

— Natan Silva
