import { Request, Response } from 'express';

export const RankingController = async (req: Request, res: Response) => {
  const { ano, etapa } = req.query;
  console.log(`Ranking Ano: ${ano} - Etapa: ${etapa}`);

  const response = [
    { name: 'Belo Horizonte', value: Math.floor(Math.random() * 101) },
    { name: 'Patos de Minas', value: Math.floor(Math.random() * 101) },
    { name: 'Uberlândia', value: Math.floor(Math.random() * 101) },
    { name: 'Santana de Cataguases', value: Math.floor(Math.random() * 101) },
    { name: 'Tiros', value: Math.floor(Math.random() * 101) },
    { name: 'Uberaba', value: Math.floor(Math.random() * 101) },
    { name: 'Vargem Bonita', value: Math.floor(Math.random() * 101) },
    { name: 'Governador Valadares', value: Math.floor(Math.random() * 101) },
    { name: 'São João del Rei', value: Math.floor(Math.random() * 101) },
    { name: 'Borda da Mata', value: Math.floor(Math.random() * 101) },
    { name: 'Brumadinho', value: Math.floor(Math.random() * 101) },
    { name: 'Extrema', value: Math.floor(Math.random() * 101) },
    { name: 'Barra Longa', value: Math.floor(Math.random() * 101) },
    { name: 'Barroso', value: Math.floor(Math.random() * 101) },
    { name: 'Cambuí', value: Math.floor(Math.random() * 101) },
    { name: 'Cambuquira', value: Math.floor(Math.random() * 101) },
    { name: 'Campanha', value: Math.floor(Math.random() * 101) },
    { name: 'Caraí', value: Math.floor(Math.random() * 101) },
    { name: 'Engenheiro Caldas', value: Math.floor(Math.random() * 101) },
    { name: 'Entre Folhas', value: Math.floor(Math.random() * 101) },
    { name: 'Felixlândia', value: Math.floor(Math.random() * 101) },
    { name: 'Fernandes Tourinho', value: Math.floor(Math.random() * 101) },
    { name: 'Guarani', value: Math.floor(Math.random() * 101) },
    { name: 'Igarapé', value: Math.floor(Math.random() * 101) },
    { name: 'Ipiaçu', value: Math.floor(Math.random() * 101) },
    { name: 'Jacutinga', value: Math.floor(Math.random() * 101) },
    { name: 'Luisburgo', value: Math.floor(Math.random() * 101) },
    { name: 'Medina', value: Math.floor(Math.random() * 101) },
    { name: 'Lassance', value: Math.floor(Math.random() * 101) },
    { name: 'Passabém', value: Math.floor(Math.random() * 101) },
  ];

  res.json(response);
};
