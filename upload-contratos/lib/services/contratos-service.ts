import { api } from "@/lib/api/client";

export const contratosService = {
  async listar(params?: { status?: string; page?: number; limit?: number }) {
    const { data } = await api.get("/contratos", { params });
    return data;
  },

  async upload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("/contratos/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
};
