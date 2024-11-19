export class ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja extends Error {
  constructor() {
    super("Você só pode realizar uma ação para sua igreja.");
  }
}
