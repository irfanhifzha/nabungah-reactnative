import { db } from "./db";
import { schema } from "./schema";

export async function initDatabase() {
    await db.execAsync(schema);
}