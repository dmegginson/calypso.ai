export class Statistic {
  id: string = null;
  csvFileId: string = null;
  year: number = null;
  count: number = null;

  constructor(init?: Partial<Statistic>) {
    Object.assign(this, init);
  }
}
