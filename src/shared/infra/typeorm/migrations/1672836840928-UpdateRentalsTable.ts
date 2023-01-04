import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class UpdateRentalsTable1672836840928 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("rentals", "update_at");
        await queryRunner.addColumn("rentals", new TableColumn({
            name: "updated_at",
            type: "timestamp",
            default: "now()",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("rentals", "updated_at");
        await queryRunner.addColumn("rentals", new TableColumn({
            name: "update_at",
            type: "timestamp",
            default: "now()",
        }));
    }

}
