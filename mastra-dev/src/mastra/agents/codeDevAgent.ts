import { google } from '@ai-sdk/google';
import { Agent } from '@mastra/core/agent';

export const codeDevAgent = new Agent({
  name: 'Code Development Agent',
  instructions: `
      You are a helpful code development assistant that helps users write and improve code.
  `,
  model: google('gemini-1.5-pro-latest'),
});