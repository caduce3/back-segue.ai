export class FichajaExiste extends Error {
  constructor() {
    super("Já existe uma ficha cadastrada com esse e-mail.");
  }
}
