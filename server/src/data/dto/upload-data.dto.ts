import { ApiProperty } from '@nestjs/swagger';

export class MrgDataResponseDto {
  @ApiProperty({ example: 'Газовск' })
  mrg: string;

  @ApiProperty({ example: 'МГ Трубовск' })
  mg: string;

  @ApiProperty({ example: 0 })
  km: number;

  @ApiProperty({ example: 'январь 2022' })
  date: string;

  @ApiProperty({ example: 46.34 })
  loadLevel: number;

  @ApiProperty({ example: 6.63 })
  fact: number;

  @ApiProperty({ example: 14.31 })
  tvps: number;
}
