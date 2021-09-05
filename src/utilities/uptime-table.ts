import table from 'text-table';
import { Uptime } from 'server-usage';
import { getServiceHourlyCost } from './server-cost';

export function generateUptimeTable(uptime: Uptime, instanceType?: string): string {
  const header = ['Day(s)', 'Hour(s)', 'Minute(s)', 'Estimated Session Cost'];

  const serviceHourlyCost = getServiceHourlyCost(instanceType);
  const { days = 0, hours = 0, minutes = 0 } = uptime;

  const uptimeHours = days * 24 + hours + minutes / 60;
  const estimatedSessionCost = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(serviceHourlyCost * uptimeHours);

  const columns = [
    [
      days || '0',
      hours || '0',
      minutes || '0',
      serviceHourlyCost < 0 ? 'N/A' : estimatedSessionCost
    ]
  ];

  return table([header, ...columns]);
}
