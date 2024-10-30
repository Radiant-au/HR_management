import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730270312757 implements MigrationInterface {
    name = 'Migration1730270312757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`profileImg\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`einformation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`degreeOrCertificate\` varchar(255) NOT NULL, \`experience\` varchar(255) NOT NULL, \`employee_id\` int NULL, UNIQUE INDEX \`REL_20e9bbebba5c36ad89eddef60d\` (\`employee_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phNo\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`CurrentAddress\` varchar(255) NOT NULL, \`PermanentAddress\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`e_background_id\` int NULL, \`department_id\` int NULL, \`created_by\` int NULL, UNIQUE INDEX \`REL_cc6d669c5b370f398ee4c583e0\` (\`e_background_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payroll\` (\`id\` int NOT NULL AUTO_INCREMENT, \`basicSalary\` decimal NOT NULL, \`bonus\` decimal NULL, \`deduction\` decimal NULL, \`payDate\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`employeeId\` int NULL, \`createdById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`leave_policy\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`days\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`leave_used_info\` (\`id\` int NOT NULL AUTO_INCREMENT, \`usedDays\` int NOT NULL, \`employeeId\` int NULL, \`policyId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`leave\` (\`id\` int NOT NULL AUTO_INCREMENT, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`approvedAt\` datetime NULL, \`employeeId\` int NULL, \`policyId\` int NULL, \`approvedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attendance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`attendanceDate\` datetime NOT NULL, \`checkIn\` varchar(255) NULL, \`checkOut\` varchar(255) NULL, \`status\` varchar(255) NOT NULL, \`employeeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`einformation\` ADD CONSTRAINT \`FK_20e9bbebba5c36ad89eddef60db\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_cc6d669c5b370f398ee4c583e0a\` FOREIGN KEY (\`e_background_id\`) REFERENCES \`einformation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_d62835db8c0aec1d18a5a927549\` FOREIGN KEY (\`department_id\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_97598f21f325b237c1d18b82ec1\` FOREIGN KEY (\`created_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payroll\` ADD CONSTRAINT \`FK_53c4df41fa696a3b48d5c35db38\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payroll\` ADD CONSTRAINT \`FK_c3c91f9fe3fb407692c69c926bc\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leave_used_info\` ADD CONSTRAINT \`FK_b262360d2fede38f261c9be10fd\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leave_used_info\` ADD CONSTRAINT \`FK_0e0c086878eb29235a753676b48\` FOREIGN KEY (\`policyId\`) REFERENCES \`leave_policy\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE \`leave_used_info\` DROP FOREIGN KEY \`FK_0e0c086878eb29235a753676b48\``);
        await queryRunner.query(`ALTER TABLE \`leave_used_info\` DROP FOREIGN KEY \`FK_b262360d2fede38f261c9be10fd\``);
        await queryRunner.query(`ALTER TABLE \`payroll\` DROP FOREIGN KEY \`FK_c3c91f9fe3fb407692c69c926bc\``);
        await queryRunner.query(`ALTER TABLE \`payroll\` DROP FOREIGN KEY \`FK_53c4df41fa696a3b48d5c35db38\``);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_97598f21f325b237c1d18b82ec1\``);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_d62835db8c0aec1d18a5a927549\``);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_cc6d669c5b370f398ee4c583e0a\``);
        await queryRunner.query(`ALTER TABLE \`einformation\` DROP FOREIGN KEY \`FK_20e9bbebba5c36ad89eddef60db\``);
        await queryRunner.query(`DROP TABLE \`attendance\``);
        await queryRunner.query(`DROP TABLE \`leave\``);
        await queryRunner.query(`DROP TABLE \`leave_used_info\``);
        await queryRunner.query(`DROP TABLE \`leave_policy\``);
        await queryRunner.query(`DROP TABLE \`payroll\``);
        await queryRunner.query(`DROP INDEX \`REL_cc6d669c5b370f398ee4c583e0\` ON \`employee\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
        await queryRunner.query(`DROP INDEX \`REL_20e9bbebba5c36ad89eddef60d\` ON \`einformation\``);
        await queryRunner.query(`DROP TABLE \`einformation\``);
        await queryRunner.query(`DROP TABLE \`department\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
