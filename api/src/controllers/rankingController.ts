import { Request, Response } from 'express';

export const RankingController = async (req: Request, res: Response) => {
  const { ano, etapa, ordem } = req.query;
  console.log(`Ano: ${ano} - Etapa: ${etapa} - Ordem: ${ordem}`);

  const response = [
    { name: 'Belo Horizonte', value: 10 },
    { name: 'Patos de Minas', value: 9 },
    { name: 'Uberlândia', value: 8 },
    { name: 'Santana de Cataguases', value: 7 },
    { name: 'Tiros', value: 6.4 },
    { name: 'Uberaba', value: 6 },
    { name: 'Vargem Bonita', value: 5 },
    { name: 'Governador Valadares', value: 4.2 },
  ];

  res.json(response);
};
