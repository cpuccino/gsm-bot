import serverPricing from '../data/ec2-pricing.json';

export function getServiceHourlyCost(instanceType?: string): number {
  const instanceInformation = serverPricing.find(s => s['API Name'] === instanceType);
  if (!instanceInformation) return -1;

  const hourlyCost = instanceInformation['Linux On Demand cost'];
  if (hourlyCost === 'unavailable') return -1;

  const parsedHourlyCost = hourlyCost.match(/(\d+(\.\d+)?)|(\.\d+)/);

  try {
    return Array.isArray(parsedHourlyCost) ? parseFloat(parsedHourlyCost[0]) : -1;
  } catch (error) {
    return -1;
  }
}
