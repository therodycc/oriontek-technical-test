import { Address } from "@/types";
import config from "../../config";
import Provider from "../provider";

class AddressProvider extends Provider {
  constructor() {
    super({ baseURL: `${config.app.url}/address` });
  }

  async getAllByClient(uuid: string) {
    return await this.get(`/client/${uuid}`);
  }

  async updateData(id: string, data: Partial<Address>) {
    return await this.update(`/${id}`, data);
  }

  async create(uuid: string, data: Partial<Address>) {
    return await this.post(`/client/${uuid}`, data);
  }

  async remove(id: string) {
    return await this.delete(`/${id}`);
  }
}
export default new AddressProvider();
