
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { weatherWorkflow } from './workflows';
import { weatherAgent, codeDevAgent } from './agents';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
// Function to trigger the temperature alert workflow
async function triggerTemperatureAlert(mastraInstance: Mastra) {
  try {
    await mastraInstance.trigger('temperature-alert-workflow', {
      city: 'London',
      temperatureThreshold: 25,
    });
  } catch (error) {
    console.error('Error triggering temperature alert workflow:', error);
  }
}

// Trigger the temperature alert workflow every 60 seconds
setInterval(() => triggerTemperatureAlert(mastra), 60000);

// Function to trigger the temperature alert workflow
async function triggerTemperatureAlert() {
  try {
    await mastra.trigger('temperature-alert-workflow', {
      city: 'London',
      temperatureThreshold: 25,
    });
  } catch (error) {
    console.error('Error triggering temperature alert workflow:', error);
  }
}

// Trigger the temperature alert workflow every 60 seconds
setInterval(triggerTemperatureAlert, 60000);
