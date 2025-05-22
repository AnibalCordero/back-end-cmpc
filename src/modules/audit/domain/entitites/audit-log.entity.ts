import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'audit_logs', timestamps: false })
export class AuditLog extends Model {
  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.STRING)
  action: string;

  @Column(DataType.STRING)
  module: string;

  @Column(DataType.JSONB)
  data: any;

  @Column(DataType.DATE)
  createdAt: Date;
}
