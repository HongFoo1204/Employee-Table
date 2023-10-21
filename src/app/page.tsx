"use client";

import Table from "@/components/Table";
import type { Employee } from "@/interfaces/employee";
import { useEffect, useState } from "react";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //Get data from NextJS API to simulate backend API
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='w-full'>
        {!isLoading && employees.length && <Table employees={employees} />}
      </div>
    </main>
  );
}
