import { Injectable } from '@nestjs/common';
import { PrismaPostgresAdapter } from '@prisma/adapter-ppg';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPostgresAdapter({
      connectionString: process.env.PRISMA_DIRECT_TCP_URL!,
    });
    super({ adapter });
  }
}
