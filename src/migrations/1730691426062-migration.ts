import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730691426062 implements MigrationInterface {
    name = 'Migration1730691426062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`profileImg\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`role_id\` int NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`leave_policy\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`days\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`einformation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`degreeOrCertificate\` varchar(255) NOT NULL, \`experience\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` varchar(36) NOT NULL, \`phNo\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`profileImg\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`CurrentAddress\` varchar(255) NOT NULL, \`PermanentAddress\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`e_background_id\` int NULL, \`department_id\` int NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_817d1d427138772d47eca04885\` (\`email\`), UNIQUE INDEX \`REL_cc6d669c5b370f398ee4c583e0\` (\`e_background_id\`), UNIQUE INDEX \`REL_f4b0d329c4a3cf79ffe9d56504\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payroll\` (\`id\` int NOT NULL AUTO_INCREMENT, \`basicSalary\` decimal NOT NULL, \`bonus\` decimal NULL, \`deduction\` decimal NULL, \`payDate\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`employeeId\` varchar(36) NULL, \`createdById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`leave_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`employeeId\` varchar(36) NULL, \`policyId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`leave\` (\`id\` int NOT NULL AUTO_INCREMENT, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`approvedAt\` datetime NULL, \`employeeId\` varchar(36) NULL, \`policyId\` int NULL, \`approvedById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attendance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`attendanceDate\` datetime NOT NULL, \`checkIn\` varchar(255) NULL, \`checkOut\` varchar(255) NULL, \`status\` varchar(255) NOT NULL, \`employeeId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_fb2e442d14add3cefbdf33c4561\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_cc6d669c5b370f398ee4c583e0a\` FOREIGN KEY (\`e_background_id\`) REFERENCES \`einformation\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_d62835db8c0aec1d18a5a927549\` FOREIGN KEY (\`department_id\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_f4b0d329c4a3cf79ffe9d565047\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payroll\` ADD CONSTRAINT \`FK_53c4df41fa696a3b48d5c35db38\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payroll\` ADD CONSTRAINT \`FK_c3c91f9fe3fb407692c69c926bc\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leave_log\` ADD CONSTRAINT \`FK_d724fab9c0473dba5ec3649ddee\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leave_log\` ADD CONSTRAINT \`FK_20ae9e8efc5a2fc46c018a260a5\` FOREIGN KEY (\`policyId\`) REFERENCES \`leave_policy\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD CONSTRAINT \`FK_b8ff759530cff3e5f39f7dd0102\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD CONSTRAINT \`FK_1f893f32b017dd7e79d85cc09d1\` FOREIGN KEY (\`policyId\`) REFERENCES \`leave_policy\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leave\` ADD CONSTRAINT \`FK_fb9407a17d10a081caef3d826ca\` FOREIGN KEY (\`approvedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attendance\` ADD CONSTRAINT \`FK_07731c02b0333dc9b2678f98213\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attendance\` DROP FOREIGN KEY \`FK_07731c02b0333dc9b2678f98213\``);
        await queryRunner.query(`ALTER TABLE \`leave\` DROP FOREIGN KEY \`FK_fb9407a17d10a081caef3d826ca\``);
        await queryRunner.query(`ALTER TABLE \`leave\` DROP FOREIGN KEY \`FK_1f893f32b017dd7e79d85cc09d1\``);
        await queryRunner.query(`ALTER TABLE \`leave\` DROP FOREIGN KEY \`FK_b8ff759530cff3e5f39f7dd0102\``);
        await queryRunner.query(`ALTER TABLE \`leave_log\` DROP FOREIGN KEY \`FK_20ae9e8efc5a2fc46c018a260a5\``);
        await queryRunner.query(`ALTER TABLE \`leave_log\` DROP FOREIGN KEY \`FK_d724fab9c0473dba5ec3649ddee\``);
        await queryRunner.query(`ALTER TABLE \`payroll\` DROP FOREIGN KEY \`FK_c3c91f9fe3fb407692c69c926bc\``);
        await queryRunner.query(`ALTER TABLE \`payroll\` DROP FOREIGN KEY \`FK_53c4df41fa696a3b48d5c35db38\``);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_f4b0d329c4a3cf79ffe9d565047\``);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_d62835db8c0aec1d18a5a927549\``);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_cc6d669c5b370f398ee4c583e0a\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_fb2e442d14add3cefbdf33c4561\``);
        await queryRunner.query(`DROP TABLE \`attendance\``);
        await queryRunner.query(`DROP TABLE \`leave\``);
        await queryRunner.query(`DROP TABLE \`leave_log\``);
        await queryRunner.query(`DROP TABLE \`payroll\``);
        await queryRunner.query(`DROP INDEX \`REL_f4b0d329c4a3cf79ffe9d56504\` ON \`employee\``);
        await queryRunner.query(`DROP INDEX \`REL_cc6d669c5b370f398ee4c583e0\` ON \`employee\``);
        await queryRunner.query(`DROP INDEX \`IDX_817d1d427138772d47eca04885\` ON \`employee\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
        await queryRunner.query(`DROP TABLE \`einformation\``);
        await queryRunner.query(`DROP TABLE \`department\``);
        await queryRunner.query(`DROP TABLE \`leave_policy\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
