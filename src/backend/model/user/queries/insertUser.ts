import User from "../../../../../knex/models/User";
import { AdapterUser } from "next-auth/adapters";

export default async function insertUser(
  data: Partial<AdapterUser>
): Promise<User | undefined> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const user = await User.query()
    .insertAndFetch({
      email: data.email,
      name: data.name || undefined,
      image: data.image || undefined,
    })
    .returning("*")
    .first();

  if (!user) {
    return undefined;
  }

  return user;
}
