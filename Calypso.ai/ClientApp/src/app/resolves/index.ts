import { StatisticsResolve } from './StatisticsResolve';
import { CSVFilesResolve } from './CSVFilesResolve';

export * from './CSVFilesResolve';
export * from './StatisticsResolve';

export const RESOLVES = [
  CSVFilesResolve,
  StatisticsResolve
];
