import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLCategory1702535369808 implements MigrationInterface {
    name = 'AddTBLCategory1702535369808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cateogries" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addedById" integer, CONSTRAINT "PK_8cd73f25b0e103d129ba630d7ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cateogries" ADD CONSTRAINT "FK_3114fa7a023364d0b6a578c129a" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cateogries" DROP CONSTRAINT "FK_3114fa7a023364d0b6a578c129a"`);
        await queryRunner.query(`DROP TABLE "cateogries"`);
    }

}
