import { useQuery } from '@/hook/useQuery';
import { NamespaceList } from '@/types/namespace';
import { request } from '@/helper/request';  

export function useListNamespaces() {
  return useQuery<NamespaceList>('listNamespaces', '/namespace', {
    method: 'GET',
  });
}

// 新增：给 schema 的 options() 用的“非 Hook”方法
export async function listNamespaces() {
  const res = await request<NamespaceList>('/namespace', { method: 'GET' });
  return res;
}

