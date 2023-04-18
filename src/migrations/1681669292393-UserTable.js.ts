import { MigrationInterface, Table } from 'typeorm';

module.exports = class UserTable1681669292393 implements MigrationInterface {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
      false,
    );
  }

  async down(queryRunner) {
    queryRunner.query(`DROP TABLE users`);
  }
};
