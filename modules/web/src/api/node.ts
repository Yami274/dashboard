import { useQuery } from '@/hook/useQuery';
import { Status } from '@/types/common';
import type { Node, NodeList } from '@/types/node';
import { request } from '@/helper/request';

export function useListNodes() {
  return useQuery<NodeList>('listNodes', '/node', {
    method: 'GET',
  });
}

export function getNode(name: string) {
  return request<Node>(`/node/${name}`, {
    method: 'GET',
  });
}

export function updateNode(name: string, data: Node) {
  return request<Node>(`/node`, {
    method: 'PUT',
    data,
  });
}

export function deleteNode(name: string) {
  return request<Status>(`/node/${name}`, {
    method: 'DELETE',
  });
}

// export async function listNodes() {
//   const res = await request<NodeList>('/namespace', { method: 'GET' });
//   return res;
// }

export async function listNodes(namespace?: string): Promise<NodeList> {
  const url = namespace ? `/node/${namespace}` : '/node'; // 建议统一带斜杠
  const res = await request<NodeList>(url, { method: 'GET' });
  return res.data; // 关键：返回 data，不返回 AxiosResponse
}

