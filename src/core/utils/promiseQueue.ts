export class SingleFlight<T> {
  private p: Promise<T> | null = null;
  do(fn: () => Promise<T>): Promise<T> {
    if (!this.p) {
      this.p = fn().finally(() => (this.p = null));
    }
    return this.p;
  }
}
