import axios from "axios";
import { getSession } from "next-auth/react";

export const apiClient = async () => {
  const session = await getSession();
  const token = session?.accessToken;

  if (!token) throw new Error("No hay accessToken disponible");

  const instance = axios.create({
    baseURL: "https://sae-backend-n9d3.onrender.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return instance;
};

export const getClasses = async () => {
  const client = await apiClient();
  try {
    const res = await client.get("/repo/classrooms");
    if (res.status === 200) {
      console.log(res.data);
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAssignments = async (id) => {
  const client = await apiClient();
  try {
    const res = await client.get(`/repo/classrooms/${id}/assignments`);
    if (res.status === 200) {
      console.log(res.data);
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getSubmissions = async (id) => {
  const client = await apiClient();
  try {
    const res = await client.get(
      `/repo/assignments/${id}/accepted_assignments`
    );

    if (res.status !== 200) {
      return [];
    }

    console.log(res.data.data);
    // Mapear cada submission para añadir el email
    const submissionsWithEmails = await Promise.all(
      res.data.data.map(async (submission) => {
        try {
          // Petición para obtener el email de cada usuario
          const emailRes = await client.get(
            `/feedback/students/${submission.students[0].login}/email`
          );

          // Petición para obtener el estado de feedback de cada usuario
          const statusRes = await client.get(
            `/feedback/status/${submission.repository.name}`
          );
          return {
            ...submission,
            email: emailRes.data.email || null, 
            feedback_status: statusRes.data.status || null
          };
        } catch (error) {
          console.error(
            `Error obteniendo email para usuario ${submission.students[0].login}:`,
            error
          );
          return {
            ...submission,
            email: null,
          };
        }
      })
    );

    return submissionsWithEmails;
  } catch (error) {
    console.log(error);
    return [];
  }
};
