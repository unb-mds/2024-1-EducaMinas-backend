import { EnrollmentInput } from '../../application/services/enrollmentServices';

export type EnrollmentRepositoryOutput = {
  ano: number;
  raca: string;
  rede: string;
  etapa: string;
  matricula: number;
  municipio: string;
};

export abstract class EnrollmentRepository {
  abstract fetch(input: EnrollmentInput): Promise<EnrollmentRepositoryOutput[]>;
}
