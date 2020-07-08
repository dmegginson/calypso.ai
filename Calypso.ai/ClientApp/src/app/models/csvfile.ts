import { Entry } from './entry';
import { Statistic } from './statistic';
import { Header } from './header';

export class CSVFile {
  id: string = null;
  fileName: string = null;
  path: string = null;
  hasHeaders: boolean = null;
  lastDownloaded: Date = null;
  lastContentViewed: Date = null;

  entries: Entry[];
  statistics: Statistic[];
  headers: Header[];

  constructor(init?: Partial<CSVFile>) {
    Object.assign(this, init);
  }
}
