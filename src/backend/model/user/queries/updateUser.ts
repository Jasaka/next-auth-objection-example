import User from "../../../../../knex/models/User";
import { AdapterUser } from "next-auth/adapters";

export default async function updateUser(
  user: Partial<AdapterUser>
): Promise<User> {
  if (!user.id) throw new Error("User ID is required to update a user");

  return User.query()
    .patchAndFetchById(user.id, {
      email: user.email,
      name: user.name,
      image: user.image,
    })
    .returning("*")
    .first();
}
