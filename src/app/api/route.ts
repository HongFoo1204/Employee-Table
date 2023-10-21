import { Employee } from "@/interfaces/employee";
import employeesData from "../../../data/employees.json";
import fs from "fs";
import { NextRequest } from "next/server";
import path from "path";

export async function GET() {
  return Response.json(employeesData);
}

export async function PUT(req: NextRequest) {
  const employeesFilePath = path.join(process.cwd(), "/data/employees.json");
  const employeesData = await JSON.parse(
    fs.readFileSync(employeesFilePath, "utf8")
  );

  const data: Employee = await req.json();
  const { id, name, email, isActive } = data;

  const updatedEmployeesData = employeesData.map((employee: Employee) => {
    if (employee.id === id) {
      return {
        ...employee,
        name,
        email,
        isActive,
      };
    }
    return employee;
  });

  fs.writeFileSync(
    employeesFilePath,
    JSON.stringify(updatedEmployeesData, null, 2),
    "utf8"
  );

  return Response.json({ message: "Employee updated successfully" });
}
