import { BaseCrudService } from '@/base/base-crud-service';

class RoleService extends BaseCrudService {
  constructor() {
    super('/api/services/app/role');
  }
}

const roleService = new RoleService();

export default roleService;
