import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, data: { name: string; number: number }) {
    return this.prisma.asset.create({ data: { ...data, userId } });
  }

  findAll(userId: string) {
    return this.prisma.asset.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  async findOne(userId: string, id: string) {
    const asset = await this.prisma.asset.findUnique({ where: { id } });
    if (!asset || asset.userId !== userId) throw new NotFoundException('Asset not found');
    return asset;
  }

  async update(userId: string, id: string, data: { name?: string; number?: number }) {
    const existing = await this.prisma.asset.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Asset not found');
    if (existing.userId !== userId) throw new ForbiddenException('Forbidden');
    return this.prisma.asset.update({ where: { id }, data });
  }

  async remove(userId: string, id: string) {
    const existing = await this.prisma.asset.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Asset not found');
    if (existing.userId !== userId) throw new ForbiddenException('Forbidden');
    await this.prisma.asset.delete({ where: { id } });
    return { success: true };
  }
}


