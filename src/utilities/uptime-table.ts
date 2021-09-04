import table from 'text-table';
import { Uptime } from 'server-usage';

export function generateUptimeTable(uptime: Uptime): string {
  const header = ['Day(s)', 'Hour(s)', 'Minute(s)'];
  const columns = [[uptime.days || '0', uptime.hours || '0', uptime.minutes || '0']];

  return table([header, ...columns]);
}
