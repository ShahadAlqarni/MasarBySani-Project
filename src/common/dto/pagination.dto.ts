// src/common/dto/pagination.dto.ts
import { IsOptional, IsInt, Min, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize: number = 10;

  @IsOptional()
  @IsString()
  searchTerm: string = '';
  
}
