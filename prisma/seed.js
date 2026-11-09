const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Snapsee Advertising Agency database...");

  // 1. Create or update Super Admin user
  const adminPasswordHash = await bcrypt.hash("Admin@Snapsee2026!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@snapsee.com" },
    update: { passwordHash: adminPasswordHash },
    create: {
      name: "Agency Director",
      email: "admin@snapsee.com",
      passwordHash: adminPasswordHash,
      role: "SUPERADMIN",
    },
  });
  console.log("Created admin user:", admin.email);

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

