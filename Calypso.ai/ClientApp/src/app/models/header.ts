export class Header {
  id: string = null;

  constructor(init?: Partial<Header>) {
    Object.assign(this, init);
  }
}
