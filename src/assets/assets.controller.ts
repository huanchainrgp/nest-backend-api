import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssetsService } from './assets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetEntity } from './entities/asset.entity';

@ApiTags('Assets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create asset' })
  @ApiResponse({ status: 201, description: 'Asset created', type: AssetEntity })
  create(@CurrentUser() user: any, @Body() dto: CreateAssetDto) {
    return this.assetsService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List current user assets' })
  @ApiResponse({ status: 200, type: AssetEntity, isArray: true })
  findAll(@CurrentUser() user: any) {
    return this.assetsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get asset by id' })
  @ApiResponse({ status: 200, type: AssetEntity })
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.assetsService.findOne(user.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update asset by id' })
  @ApiResponse({ status: 200, type: AssetEntity })
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateAssetDto) {
    return this.assetsService.update(user.id, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete asset by id' })
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.assetsService.remove(user.id, id);
  }
}


