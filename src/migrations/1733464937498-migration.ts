import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733464937498 implements MigrationInterface {
    name = 'Migration1733464937498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave_policy\` CHANGE \`days\` \`defaultCredit\` int NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`leave_balance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`credit\` int NOT NULL DEFAULT '0', \`used\` int NOT NULL DEFAULT '0', \`unpaid\` int NOT NULL DEFAULT '0', \`carryForwarded\` int NOT NULL DEFAULT '0', \`employeeId\` varchar(36) NULL, \`policyId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE \`leave_policy\` CHANGE \`defaultCredit\` \`defaultCredit\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`leave_balance\` ADD CONSTRAINT \`FK_00328eee2460d74eec58f61bc55\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leave_balance\` ADD CONSTRAINT \`FK_84c61a6439946beefd12557c2e8\` FOREIGN KEY (\`policyId\`) REFERENCES \`leave_policy\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leave_balance\` DROP FOREIGN KEY \`FK_84c61a6439946beefd12557c2e8\``);
        await queryRunner.query(`ALTER TABLE \`leave_balance\` DROP FOREIGN KEY \`FK_00328eee2460d74eec58f61bc55\``);
        await queryRunner.query(`ALTER TABLE \`leave_policy\` CHANGE \`defaultCredit\` \`defaultCredit\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`leave\` DROP COLUMN \`status\``);
        await queryRunner.query(`DROP TABLE \`leave_balance\``);
        await queryRunner.query(`ALTER TABLE \`leave_policy\` CHANGE \`defaultCredit\` \`days\` int NOT NULL`);
    }

}
