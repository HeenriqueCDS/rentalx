import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCarsFixAvaliableColumnName1662317988822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("cars", "avaliabe");
        await queryRunner.addColumn("cars", new TableColumn({
            name: "available",
            type: "boolean",
            default: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("cars", "available");
        await queryRunner.addColumn("cars", new TableColumn({
            name: "avaliabe",
            type: "boolean",
            default: true,

        }));
    }

}
