import { MatriculasRepository, MatriculasRepositoryOutput } from "../../repositories/matriculasRepository"; 
import { MatriculasInput } from "../../services/matriculasServices";

export class MatriculasRepositoryMemory extends MatriculasRepository {
    private DATA_IN_MEMORY: MatriculasRepositoryOutput[] = [
        { ano: 2020, etapa: 'Ensino Médio', matricula: 12, municipio: 'Patos de Minas', raca: 'Brancos', rede: 'Pública' },
        { ano: 2020, etapa: 'Ensino Médio', matricula: 15, municipio: 'Patos de Minas', raca: 'Brancos', rede: 'Privada' },
        { ano: 2020, etapa: 'Ensino Médio', matricula: 30, municipio: 'Patos de Minas', raca: 'Pretos', rede: 'Pública' },
        { ano: 2020, etapa: 'Ensino Médio', matricula: 3, municipio: 'Patos de Minas', raca: 'Pretos', rede: 'Privada' },
    ];

    async fetch(input: MatriculasInput): Promise<MatriculasRepositoryOutput[]> {
        const { municipio, etapa } = input;
        const response = this.DATA_IN_MEMORY.filter((item) => item.etapa === etapa && item.municipio === municipio);
        return response;
    }
}
