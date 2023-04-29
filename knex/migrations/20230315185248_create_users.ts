import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("gen_random_uuid()"))
      .notNullable();
    table.string("name");
    table.string("email").notNullable();
    table.dateTime("email_verified", { useTz: false });
    table.string("image");
    table
      .dateTime("inserted_at", { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.dateTime("deleted_at", { useTz: false });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
