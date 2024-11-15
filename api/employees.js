const express = require("express");
const router = express.Router();
module.exports = router;
const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  res.send("Welcome to the Prismatic Employees API")
});

router.get("/", async (req, res, next) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Name is required");
  }
  try {
    const newEmployee = await prisma.employee.create({
      data: { name },
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: +id },
    });
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Name is required");
  }
  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: +id },
      data: { name },
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
      return res.status(404).send("Employee not found");
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.employee.delete({
      where: { id: +id },
    });
    res.status(204).send();
  } catch (error) {
      return res.status(404).send("Employee not found");
  }
});