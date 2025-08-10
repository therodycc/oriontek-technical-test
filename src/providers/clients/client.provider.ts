import { Client } from "@/types";
import config from "../../config";
import Provider from "../provider";

class ClientProvider extends Provider {
  constructor() {
    super({ baseURL: `${config.app.url}/clients` });
  }

  async getAll() {
    return await this.get("/");
  }

  async updateData(id: string, data: Partial<Client>) {
    return await this.update(`/${id}`, data);
  }

  async create(data: Partial<Client>) {
    return await this.post("/", data);
  }

  async remove(id: string) {
    return await this.delete(`/${id}`);
  }
}
export default new ClientProvider();
