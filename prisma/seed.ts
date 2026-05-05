import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@startproservice.ro";
  const password = process.env.ADMIN_PASSWORD ?? "StartPro2026!";
  const passwordHash = hashPassword(password);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: "START PRO SERVICE Admin",
      passwordHash,
      active: true
    },
    create: {
      email,
      name: "START PRO SERVICE Admin",
      passwordHash,
      role: "ADMIN",
      active: true
    }
  });

  console.log(`Seeded admin user: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
