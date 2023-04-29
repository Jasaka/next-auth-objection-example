import { loadEnvConfig } from "@next/env";
import knex from "knex";
import { db } from "../../knexfile";
import { knexSnakeCaseMappers } from "objection";

const dev = process.env.NODE_ENV !== "production";
const { DB_PW, DB_USER, DB_HOST, DB_PORT, DB_NAME } = loadEnvConfig(
  "./",
  dev
).combinedEnv;

async function createTestDatabase() {
  const knexConnection = knex({
    client: "pg",
    connection: {
      host: (DB_HOST as string) || "localhost",
      port: (DB_PORT as unknown as number) || 5432,
      user: (DB_USER as string) || "postgres",
      password: (DB_PW as string) || "postgres",
      database: "postgres",
    },
    ...knexSnakeCaseMappers(),
  });

  try {
    await knexConnection.raw(
      `DROP DATABASE IF EXISTS ${DB_NAME || "postgres_test"} WITH (force);`
    );
    await knexConnection.raw(`CREATE DATABASE ${DB_NAME || "postgres_test"}`);
  } catch (error) {
    console.error(error);
  } finally {
    await knexConnection.destroy();
  }
}

async function migrateDatabase() {
  try {
    await db.migrate.latest();
  } catch (error) {
    console.error(error);
  }
}

async function seedDatabase() {
  try {
    await db.seed.run();
  } catch (error) {
    console.error(error);
  }
}

export default async function globalSetup() {
  try {
    await createTestDatabase();
    await migrateDatabase();
    await seedDatabase();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
