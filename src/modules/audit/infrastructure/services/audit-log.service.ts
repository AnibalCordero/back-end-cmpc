import { Injectable } from '@nestjs/common';
import { AuditLog } from '../../domain/entitites/audit-log.entity';

@Injectable()
export class AuditService {
  async log(userId: number, action: string, module: string, data: any) {
    await AuditLog.create({ userId, action, module, data, createdAt: new Date() });
  }
}