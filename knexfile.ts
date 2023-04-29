import { loadEnvConfig } from "@next/env";
import knex, { Knex } from "knex";
import { knexSnakeCaseMappers, Model } from "objection";

const dev = process.env.NODE_ENV !== "production";
const { DB_URL } = loadEnvConfig("./", dev).combinedEnv;

const config: Knex.Config = {
  client: "pg",
  connection:
    (DB_URL as string) ||
    "postgres://workflows:workflows@localhost:5432/workflows_mc_test",
  migrations: {
    directory: "./knex/migrations",
  },
  seeds: {
    directory: "./knex/seeds",
  },
  ...knexSnakeCaseMappers(),
};
export const db = knex(config);

const globalForKnex = global as unknown as {
  isModelConnected: boolean | undefined;
};

export function connectModelIfNotConnected() {
  if (!globalForKnex.isModelConnected) {
    Model.knex(db);
    globalForKnex.isModelConnected = true;
  }
}

export default config;
