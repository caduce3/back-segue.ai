export class ErroDeRegraNaMontagem extends Error {
  constructor(ruleMessage: string) {
    super(ruleMessage);
  }
}
