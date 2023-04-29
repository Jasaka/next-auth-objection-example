import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("accounts", (table) => {
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("gen_random_uuid()"))
      .notNullable();
    table.uuid("user_id").references("id").inTable("users").notNullable();
    table.string("type");
    table.string("provider");
    table.string("provider_account_id").notNullable();
    table.string("refresh_token");
    table.string("access_token");
    table.integer("expires_at");
    table.string("token_type");
    table.string("scope");
    table.string("id_token");
    table.string("session_state");
    table.string("oauth_token_secret");
    table.string("oauth_token");
    table
      .dateTime("inserted_at", { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("accounts");
}
