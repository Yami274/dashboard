import { useQuery } from '@/hook/useQuery';
import { Status } from '@/types/common';
import { RuleEndpoint, RuleEndpointList } from '@/types/ruleEndpoint';
import { request } from '@/helper/request';

export function useListRuleEndpoints(namespace?: string) {
  const url = namespace ? `/ruleendpoint/${namespace}` : '/ruleendpoint';
  return useQuery<RuleEndpointList>('listRuleEndpoints', url, {
    method: 'GET',
  });
}

export function getRuleEndpoint(namespace: string, name: string) {
  return request<RuleEndpoint>(`/ruleendpoint/${namespace}/${name}`, {
    method: 'GET',
  });
}

export function createRuleEndpoint(namespace: string, data: RuleEndpoint) {
  return request<RuleEndpoint>(`/ruleendpoint/${namespace}`, {
    method: 'POST',
    data,
  });
}

export function updateRuleEndpoint(namespace: string, name: string, data: RuleEndpoint) {
  return request<RuleEndpoint>(`/ruleendpoint/${namespace}`, {
    method: 'PUT',
    data,
  });
}

export function deleteRuleEndpoint(namespace: string, name: string) {
  return request<Status>(`/ruleendpoint/${namespace}/${name}`, {
    method: 'DELETE',
  });
}

// 新增：给 schema/其它非组件场景用的“非 Hook”函数
export async function listRuleEndpoints(namespace?: string) {
  // 按后端路由调整路径；没有命名空间就用 '/ruleEndpoint'
  const url = namespace ? `/ruleEndpoint/${namespace}` : '/ruleEndpoint';
  return request<RuleEndpointList>(url, { method: 'GET' });
}