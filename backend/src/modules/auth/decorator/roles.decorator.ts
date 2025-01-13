import { SetMetadata } from '@nestjs/common'
import { Role } from '../enum/role.enum'

// Admin: Pode criar, editar e deletar tarefas.
// User: Pode criar e visualizar tarefas, mas não pode deletar.

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
