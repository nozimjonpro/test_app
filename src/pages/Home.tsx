import { useEffect, useState, useCallback } from "react";
import { useToken } from "../hooks/useToken";
import { getMonthBoundaryDate } from "../utils/date";
import type { Material } from "../types/material.type";
import MaterialsTable from "../components/MaterialsTable";

export const Home: React.FC = () => {
  const { token } = useToken();
  const [materials, setMaterials] = useState<Material[]>([]);

  const getMaterials = useCallback(async () => {
    try {
      if (token) {
        const res = await fetch(
          `/api/reports/reports/materials?start=${getMonthBoundaryDate(
            "start"
          )}&end=${getMonthBoundaryDate("end")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data: Material[] = await res.json();
        if (res.ok) {
          setMaterials(data);
        } else {
          setMaterials([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getMaterials();
    }
  }, [token]);

  return <MaterialsTable materials={materials} />;
};
