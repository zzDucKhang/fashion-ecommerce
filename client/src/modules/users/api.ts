import { api } from '@/lib/api/client';
import type { User } from './types';

export function getUser(id: string) {
  return api.get<User>(`/users/${id}`);
}
