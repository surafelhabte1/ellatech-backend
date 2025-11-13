import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Init1763057100442 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'varchar', length: '100' },
          { name: 'email', type: 'varchar', length: '150', isUnique: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'title', type: 'varchar', length: '150' },
          { name: 'price', type: 'numeric' },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
            default: "'available'",
          },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'user_id', type: 'int' },
          { name: 'product_id', type: 'int' },
          { name: 'quantity', type: 'int' },
          { name: 'total_amount', type: 'numeric' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('transactions');
    const foreignKeys = table!.foreignKeys;
    await queryRunner.dropForeignKeys('transactions', foreignKeys);

    await queryRunner.dropTable('transactions');
    await queryRunner.dropTable('products');
    await queryRunner.dropTable('users');
  }
}
