import { loadEnvConfig } from "@next/env";
import knex from "knex";

export default async function globalTeardown() {
  try {
    const dev = process.env.NODE_ENV !== "production";
    const { DB_PW, DB_USER, DB_HOST, DB_PORT, DB_NAME, DB_NAME_REAL } =
      loadEnvConfig("./", dev).combinedEnv;

    const db = knex({
      client: "pg",
      connection: {
        host: DB_HOST || "localhost",
        port: (DB_PORT as unknown as number) || 5432,
        user: DB_USER || "workflows",
        password: DB_PW || "workflows",
        database: "postgres",
      },
      migrations: {
        directory: "./knex/migrations",
      },
    });
    await db.raw(
      `DROP DATABASE IF EXISTS ${DB_NAME || "workflows_mc_test"} WITH (force);`
    );
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
