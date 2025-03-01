export class ErroPalestraNaoExiste extends Error {
  constructor() {
    super("A palestra não existe.");
  }
}
