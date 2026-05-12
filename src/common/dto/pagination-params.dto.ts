import { IsNumberString, IsOptional, Max } from 'class-validator';
import { LIMIT_DEFAULT, LIMIT_MAX, OFF_SET_DEFAULT } from '../constants/pagination.constants';

export class PaginationParams {
  @IsOptional()
  @IsNumberString()
  offset: number = OFF_SET_DEFAULT;

  @IsOptional()
  @IsNumberString()
  @Max(LIMIT_MAX)
  limit: number = LIMIT_DEFAULT;
}
