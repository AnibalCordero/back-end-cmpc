import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuditService } from './infrastructure/services/audit-log.service';
import { AuditLog } from './domain/entitites/audit-log.entity';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([AuditLog])],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule { }