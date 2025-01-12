import {
  Prisma,
  Ficha,
  CoresCirculos,
  Equipes,
  FuncaoEquipe,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FichaRepository } from "../ficha-repository";
import { ErroDeRegraNaMontagem } from "@/use-cases/@errors/ficha/erro-montagem-ficha";

export class PrismaFichaRepository implements FichaRepository {
  async cadastrarFicha(data: Prisma.FichaCreateInput): Promise<Ficha> {
    const ficha = await prisma.ficha.create({
      data,
    });

    return ficha;
  }

  async findFichaByEmail(email: string): Promise<Ficha | null> {
    const ficha = await prisma.ficha.findUnique({
      where: {
        email,
      },
    });

    return ficha;
  }

  async findFichaById(id: string): Promise<Ficha | null> {
    const ficha = await prisma.ficha.findUnique({
      where: {
        id,
      },
      include: {
        FichaEquipe: true,
      },
    });

    return ficha;
  }

  async deletarFicha(id: string): Promise<Ficha | null> {
    const ficha = await prisma.ficha.delete({
      where: {
        id,
      },
    });

    return ficha;
  }

  async atualizarFicha(
    id: string,
    data: Prisma.FichaUncheckedUpdateInput
  ): Promise<Ficha> {
    const ficha = await prisma.ficha.update({
      where: {
        id,
      },
      data,
    });

    return ficha;
  }

  async pegarFichas(
    take: number,
    page: number,
    igrejaId: string,
    nomePastaFichas?: string,
    nomeJovem?: string,
    anoEncontro?: string,
    corCirculoOrigem?: string
  ): Promise<{
    fichas: Prisma.FichaGetPayload<{
      include: {
        FichaEquipe: true;
      };
    }>[];
    totalCount: number;
  }> {
    const skip = (page - 1) * take;

    // Construindo as condições dinamicamente
    const conditions: Prisma.FichaWhereInput[] = [];

    if (nomePastaFichas)
      conditions.push({
        nomePastaFichas: { contains: nomePastaFichas, mode: "insensitive" },
      });
    if (nomeJovem)
      conditions.push({
        nomeJovem: { contains: nomeJovem, mode: "insensitive" },
      });
    if (anoEncontro)
      conditions.push({
        anoEncontro: { contains: anoEncontro, mode: "insensitive" },
      });
    if (corCirculoOrigem)
      conditions.push({
        corCirculoOrigem: { equals: corCirculoOrigem as CoresCirculos },
      });

    //adicionar a condição do igrejaId
    conditions.push({ igrejaId: igrejaId });

    // Garantindo que só passemos o AND se tivermos condições
    const whereClause: Prisma.FichaWhereInput =
      conditions.length > 0 ? { AND: conditions } : {};

    const totalCount = await prisma.ficha.count({
      where: whereClause,
    });

    const fichas = await prisma.ficha.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        FichaEquipe: true,
      },
      take,
      skip,
    });

    return {
      fichas,
      totalCount,
    };
  }

  async pegarFichasMontagem(
    take: number,
    page: number,
    igrejaId: string,
    equipeAtual: Equipes,
    nomePastaFichas?: string,
    nomeJovem?: string,
    anoEncontro?: string,
    corCirculoOrigem?: string
  ): Promise<{
    fichas: Prisma.FichaGetPayload<{
      include: {
        FichaEquipe: true;
      };
    }>[];
    totalCount: number;
  }> {
    const skip = (page - 1) * take;

    // Construindo as condições dinamicamente
    const conditions: Prisma.FichaWhereInput[] = [];

    if (nomePastaFichas)
      conditions.push({
        nomePastaFichas: { contains: nomePastaFichas, mode: "insensitive" },
      });
    if (nomeJovem)
      conditions.push({
        nomeJovem: { contains: nomeJovem, mode: "insensitive" },
      });
    if (anoEncontro)
      conditions.push({
        anoEncontro: { contains: anoEncontro, mode: "insensitive" },
      });
    if (corCirculoOrigem)
      conditions.push({
        corCirculoOrigem: { equals: corCirculoOrigem as CoresCirculos },
      });

    //adicionar a condição do igrejaId
    conditions.push({
      igrejaId: igrejaId,
      status: "ATIVO",
      equipeAtual: equipeAtual,
    });

    // Garantindo que só passemos o AND se tivermos condições
    const whereClause: Prisma.FichaWhereInput =
      conditions.length > 0 ? { AND: conditions } : {};

    const totalCount = await prisma.ficha.count({
      where: whereClause,
    });

    const fichas = await prisma.ficha.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        FichaEquipe: true,
      },
      take,
      skip,
    });

    return {
      fichas,
      totalCount,
    };
  }

  async verifyRulesEquipeAtual(
    igrejaId: string,
    equipeAtual: Equipes,
    funcaoEquipeAtual: FuncaoEquipe
  ): Promise<{
    qtdEquipeAtual: number;
    qtdFuncaoEquipeAtual: number;
  }> {
    const qtdEquipeAtual = await prisma.ficha.count({
      where: {
        igrejaId,
        equipeAtual,
      },
    });
    const qtdFuncaoEquipeAtual = await prisma.ficha.count({
      where: {
        igrejaId,
        equipeAtual,
        funcaoEquipeAtual,
      },
    });
    console.log("####################");
    console.log({
      igrejaId,
      equipeAtual,
      funcaoEquipeAtual,
      qtdEquipeAtual,
      qtdFuncaoEquipeAtual,
    });
    console.log("####################");

    return {
      qtdEquipeAtual,
      qtdFuncaoEquipeAtual,
    };
  }
}
