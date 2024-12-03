export class FichaNaoExiste extends Error {
  constructor() {
    super("Esta ficha não existe.");
  }
}
