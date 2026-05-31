import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL environment variable.");
}

const useAccelerate = databaseUrl.startsWith("prisma+postgres://");
const prismaClient = useAccelerate
  ? new PrismaClient({ accelerateUrl: databaseUrl })
  : new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl }) });

const prisma =
  process.env.NODE_ENV === "production"
    ? prismaClient
    : global.prisma ?? (global.prisma = prismaClient);

export default prisma;
