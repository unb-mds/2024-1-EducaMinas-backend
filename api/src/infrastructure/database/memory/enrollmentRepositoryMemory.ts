import {
  EnrollmentRepository,
  EnrollmentRepositoryOutput,
} from '../../../adapters/repositories/enrollmentRepository';
import { EnrollmentInput } from '../../../application/services/enrollmentServices';

export class EnrollmentRepositoryMemory extends EnrollmentRepository {
  public DATA_IN_MEMORY: EnrollmentRepositoryOutput[] = [];

  async fetch(input: EnrollmentInput): Promise<EnrollmentRepositoryOutput[]> {
    const { municipio, etapa } = input;
    const response = this.DATA_IN_MEMORY.filter(
      (item) => item.etapa === etapa && item.municipio === municipio,
    );
    return response;
  }
}
