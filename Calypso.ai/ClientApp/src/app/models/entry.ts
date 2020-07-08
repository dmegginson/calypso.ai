export class Entry {
  id: string = null;
  csvFileId: string = null;
  guid: string = null;
  name: string = null;
  first: string = null;
  last: string = null;
  email: string = null;
  value: string = null;
  date: Date = null;
  phone: string = null;
  age: number = null;
  state: string = null;
  street01: string = null;
  street02: string = null;

  constructor(init?: Partial<Entry>) {
    Object.assign(this, init);
  }
}
