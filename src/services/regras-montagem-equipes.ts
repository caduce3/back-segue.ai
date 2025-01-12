import { ErroDeRegraNaMontagem } from "@/use-cases/@errors/ficha/erro-montagem-ficha";
import { Equipes, FuncaoEquipe } from "@prisma/client";

type EquipesPermitidas = keyof typeof regrasEquipe;

const regrasEquipe: Record<
  string,
  {
    limiteTotal: number;
    mensagemTotal: string;
    funcoes?: Record<FuncaoEquipe, { limite: number; mensagem: string }>;
  }
> = {
  CG: {
    limiteTotal: 3,
    mensagemTotal:
      "Não é possível adicionar mais de 3 fichas nessa equipe. O comando geral é composto por 3 fichas, 2 de jovens e 1 de casal.",
  },
  ESPIRITUALIZADORA: {
    limiteTotal: 3,
    mensagemTotal:
      "Não é possível adicionar mais de 3 fichas nessa equipe. A equipe espiritualizadora é composta por 3 fichas, 2 de jovens e 1 de casal.",
  },
  ANIMACAO: {
    limiteTotal: 15,
    mensagemTotal:
      "Não é possível adicionar mais de 15 fichas nessa equipe. A equipe da animação é composta por 15 fichas, 14 de jovens e 1 de casal.",
    funcoes: {
      COORDENADOR: {
        limite: 2,
        mensagem:
          "Não é possível adicionar mais de 2 coordenadores na equipe da animação.",
      },
      EQUIPISTA: {
        limite: 12,
        mensagem:
          "Não é possível adicionar mais de 12 equipistas na equipe da animação.",
      },
      APOIO: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 casal apoio na equipe da animação.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe da animação.",
      },
    },
  },
  CANTO: {
    limiteTotal: 11,
    mensagemTotal:
      "Não é possível adicionar mais de 11 fichas nessa equipe. A equipe do canto é composta por 11 fichas, 10 de jovens e 1 de casal.",
    funcoes: {
      COORDENADOR: {
        limite: 2,
        mensagem:
          "Não é possível adicionar mais de 2 coordenadores na equipe do canto.",
      },
      EQUIPISTA: {
        limite: 8,
        mensagem:
          "Não é possível adicionar mais de 8 equipistas na equipe do canto.",
      },
      APOIO: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 casal apoio na equipe do canto.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe do canto.",
      },
    },
  },
  CIRCULOS: {
    limiteTotal: 19,
    mensagemTotal:
      "Não é possível adicionar mais de 19 fichas nessa equipe. A equipe do círculos é composta por 1 coordenador e 18 equipistas.",
    funcoes: {
      COORDENADOR: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 coordenador na equipe do círculos.",
      },
      EQUIPISTA: {
        limite: 18,
        mensagem:
          "Não é possível adicionar mais de 18 equipistas na equipe do círculos.",
      },
      APOIO: {
        limite: 0,
        mensagem: "Não é possível adicionar apoio na equipe do círculos.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe do círculos.",
      },
    },
  },
  COZINHA: {
    limiteTotal: 12,
    mensagemTotal:
      "Não é possível adicionar mais de 12 fichas nessa equipe. A equipe da cozinha é composta por 1 coordenador, 2 apoios e 9 equipistas.",
    funcoes: {
      COORDENADOR: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 coordenador na equipe da cozinha.",
      },
      APOIO: {
        limite: 2,
        mensagem:
          "Não é possível adicionar mais de 2 apoios na equipe da cozinha.",
      },
      EQUIPISTA: {
        limite: 9,
        mensagem:
          "Não é possível adicionar mais de 9 equipistas na equipe da cozinha.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe da cozinha.",
      },
    },
  },
  ESTACIONAMENTO: {
    limiteTotal: 10,
    mensagemTotal:
      "Não é possível adicionar mais de 10 fichas nessa equipe. A equipe do estacionamento é composta por 2 coordenadores, 1 apoio e 7 equipistas.",
    funcoes: {
      COORDENADOR: {
        limite: 2,
        mensagem:
          "Não é possível adicionar mais de 2 coordenadores na equipe do estacionamento.",
      },
      APOIO: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 apoio na equipe do estacionamento.",
      },
      EQUIPISTA: {
        limite: 7,
        mensagem:
          "Não é possível adicionar mais de 7 equipistas na equipe do estacionamento.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe do estacionamento.",
      },
    },
  },
  FAXINA: {
    limiteTotal: 12,
    mensagemTotal:
      "Não é possível adicionar mais de 12 fichas nessa equipe. A equipe da faxina é composta por 2 coordenadores, 1 apoio e 9 equipistas.",
    funcoes: {
      COORDENADOR: {
        limite: 2,
        mensagem:
          "Não é possível adicionar mais de 2 coordenadores na equipe da faxina.",
      },
      APOIO: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 apoio na equipe da faxina.",
      },
      EQUIPISTA: {
        limite: 9,
        mensagem:
          "Não é possível adicionar mais de 9 equipistas na equipe da faxina.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe da faxina.",
      },
    },
  },
  GRAFICA: {
    limiteTotal: 10,
    mensagemTotal:
      "Não é possível adicionar mais de 10 fichas nessa equipe. A equipe gráfica é composta por 2 coordenadores, 1 apoio e 7 equipistas.",
    funcoes: {
      COORDENADOR: {
        limite: 2,
        mensagem:
          "Não é possível adicionar mais de 2 coordenadores na equipe da gráfica.",
      },
      APOIO: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 apoio na equipe da gráfica.",
      },
      EQUIPISTA: {
        limite: 7,
        mensagem:
          "Não é possível adicionar mais de 7 equipistas na equipe da gráfica.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe da gráfica.",
      },
    },
  },
  LANCHE: {
    limiteTotal: 10,
    mensagemTotal:
      "Não é possível adicionar mais de 10 fichas nessa equipe. A equipe do lanche é composta por 2 coordenadores, 1 apoio e 7 equipistas.",
    funcoes: {
      COORDENADOR: {
        limite: 2,
        mensagem:
          "Não é possível adicionar mais de 2 coordenadores na equipe do lanche.",
      },
      APOIO: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 apoio na equipe do lanche.",
      },
      EQUIPISTA: {
        limite: 7,
        mensagem:
          "Não é possível adicionar mais de 7 equipistas na equipe do lanche.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe do lanche.",
      },
    },
  },
  LITURGIA: {
    limiteTotal: 16,
    mensagemTotal:
      "Não é possível adicionar mais de 16 fichas nessa equipe. A equipe de liturgia é composta por 2 coordenadores, 1 apoio e 13 equipistas.",
    funcoes: {
      COORDENADOR: {
        limite: 2,
        mensagem:
          "Não é possível adicionar mais de 2 coordenadores na equipe de liturgia.",
      },
      APOIO: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 apoio na equipe de liturgia.",
      },
      EQUIPISTA: {
        limite: 13,
        mensagem:
          "Não é possível adicionar mais de 13 equipistas na equipe de liturgia.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe da liturgia.",
      },
    },
  },
  MINI_MERCADO: {
    limiteTotal: 7,
    mensagemTotal:
      "Não é possível adicionar mais de 7 fichas nessa equipe. A equipe do mini mercado é composta por 2 coordenadores, 1 apoio e 4 equipistas.",
    funcoes: {
      COORDENADOR: {
        limite: 2,
        mensagem:
          "Não é possível adicionar mais de 2 coordenadores no mini mercado.",
      },
      APOIO: {
        limite: 1,
        mensagem: "Não é possível adicionar mais de 1 apoio no mini mercado.",
      },
      EQUIPISTA: {
        limite: 4,
        mensagem:
          "Não é possível adicionar mais de 4 equipistas no mini mercado.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe do mini mercado.",
      },
    },
  },
  PROVER: {
    limiteTotal: 3,
    mensagemTotal:
      "Não é possível adicionar mais de 3 fichas nessa equipe. A equipe de prover é composta por 1 coordenador e 2 apoios.",
    funcoes: {
      COORDENADOR: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 coordenador na equipe de prover.",
      },
      APOIO: {
        limite: 2,
        mensagem:
          "Não é possível adicionar mais de 2 apoios na equipe de prover.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe do prover.",
      },
      EQUIPISTA: {
        limite: 0,
        mensagem: "Não é possível adicionar equipistas na equipe de prover.",
      },
    },
  },
  SALA: {
    limiteTotal: 14,
    mensagemTotal:
      "Não é possível adicionar mais de 14 fichas nessa equipe. A equipe de sala é composta por 1 coordenador, 1 apoio e 12 equipistas.",
    funcoes: {
      COORDENADOR: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 coordenador na equipe de sala.",
      },
      APOIO: {
        limite: 1,
        mensagem: "Não é possível adicionar mais de 1 apoio na equipe de sala.",
      },
      EQUIPISTA: {
        limite: 12,
        mensagem:
          "Não é possível adicionar mais de 12 equipistas na equipe de sala.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe da equipe de sala.",
      },
    },
  },
  VIGILIA_PAROQUIAL: {
    limiteTotal: 15,
    mensagemTotal:
      "Não é possível adicionar mais de 15 fichas nessa equipe. A equipe de vigília paroquial é composta por 2 coordenadores, 1 apoio e 12 equipistas.",
    funcoes: {
      COORDENADOR: {
        limite: 2,
        mensagem:
          "Não é possível adicionar mais de 2 coordenadores na vigília paroquial.",
      },
      APOIO: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 apoio na vigília paroquial.",
      },
      EQUIPISTA: {
        limite: 12,
        mensagem:
          "Não é possível adicionar mais de 12 equipistas na vigília paroquial.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe da vigília paroquial.",
      },
    },
  },
  VISITACAO: {
    limiteTotal: 21,
    mensagemTotal:
      "Não é possível adicionar mais de 21 fichas nessa equipe. A equipe de visitação é composta 22 casais",
    funcoes: {
      COORDENADOR: {
        limite: 1,
        mensagem:
          "Não é possível adicionar mais de 1 coordenador na equipe de visitação.",
      },
      EQUIPISTA: {
        limite: 20,
        mensagem:
          "Não é possível adicionar mais de 20 equipistas na equipe de visitação.",
      },
      APOIO: {
        limite: 0,
        mensagem: "Não é possível adicionar apoio na equipe de visitação.",
      },
      ED: {
        limite: 0,
        mensagem: "Não é possível adicionar ED na equipe de visitação.",
      },
    },
  },
};

// Função para validar as regras da equipe
export function validarRegraEquipe(
  equipeAtual: EquipesPermitidas,
  qtdEquipeAtual: number,
  funcaoEquipeAtual: FuncaoEquipe,
  qtdFuncaoEquipeAtual: number
) {
  const regras = regrasEquipe[equipeAtual];

  if (!regras) return;

  if (qtdEquipeAtual >= regras.limiteTotal) {
    throw new ErroDeRegraNaMontagem(regras.mensagemTotal);
  }

  if (
    "funcoes" in regras &&
    funcaoEquipeAtual &&
    qtdFuncaoEquipeAtual !== undefined
  ) {
    const regraFuncao = regras.funcoes
      ? regras.funcoes[funcaoEquipeAtual]
      : undefined;
    if (regraFuncao && qtdFuncaoEquipeAtual >= regraFuncao.limite) {
      throw new ErroDeRegraNaMontagem(regraFuncao.mensagem);
    }
  }
}
