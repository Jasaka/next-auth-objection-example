import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("sessions", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("gen_random_uuid()"))
      .notNullable();
    table.dateTime("expires", { useTz: false }).notNullable();
    table.string("session_token").notNullable();
    table.uuid("user_id").references("id").inTable("users").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("sessions");
}
