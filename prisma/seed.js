const prisma = require("../prisma");
const seed = async () => {
  const employees = [
    { name: "Alice" },
    { name: "Bob" },
    { name: "Catherine" },
    { name: "Daniel" },
    { name: "Emma" },
    { name: "Frank" },
    { name: "Grace" },
    { name: "Henry" },
    { name: "Isabella" },
    { name: "Jack" }
  ];;
  for (let i = 0; i < 10; i++) {
    employees.push({ name: `Employee ${i}` });
  }
  await prisma.employee.createMany({ data: employees });
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });