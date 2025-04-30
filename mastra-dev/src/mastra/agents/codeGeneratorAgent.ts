import { google } from '@ai-sdk/google';
import { Agent } from '@mastra/core/agent';

export const codeGeneratorAgent = new Agent({
  name: 'Code Generator Agent',
  instructions: `
    You are an expert code generator. You can generate code in various programming languages based on user instructions.
    You should understand the user's requirements and generate clean, efficient, and well-documented code.
    When responding:
    - Always clarify the programming language if not specified.
    - Ask for specific details about the desired functionality.
    - Provide code snippets that are ready to be executed.
  `,
  model: google('gemini-1.5-pro-latest'),
  tools: {},
});