import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("verification_tokens", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("gen_random_uuid()"))
      .notNullable();
    table.string("token").notNullable();
    table.string("identifier").notNullable();
    table.dateTime("expires", { useTz: false }).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("verification_tokens");
}
