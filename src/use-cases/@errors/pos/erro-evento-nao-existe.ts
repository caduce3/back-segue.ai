export class ErroEventoNaoExiste extends Error {
  constructor() {
    super("O evento não existe.");
  }
}
