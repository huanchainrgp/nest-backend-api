import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetDto {
  @ApiProperty({ example: 'My Asset' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  number: number;
}


