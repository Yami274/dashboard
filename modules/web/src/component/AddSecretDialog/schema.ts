// import type { FormSchema } from '@/components/FormView';
// export const secretSchema: FormSchema = {
//   submitText: '保存',
//   fields: [
//     { name: 'name', label: '名称', type: 'text', rules: [{ type: 'required' }], grid: { md: 6 } },
//     { name: 'namespace', label: '命名空间', type: 'text', rules: [{ type: 'required' }], grid: { md: 6 } },
//     { name: 'type', label: '类型', type: 'text', defaultValue: 'Opaque', grid: { md: 6 } },
//     {
//       name: 'data',
//       label: '数据项（Base64）',
//       type: 'array',
//       itemSchema: [
//         { name: 'key', label: 'Key', type: 'text', rules: [{ type: 'required' }] },
//         { name: 'value', label: 'Base64 Value', type: 'text', rules: [{ type: 'required' }] },
//       ],
//       grid: { md: 12 },
//     },
//   ],
// };



import type { FormSchema } from '@/components/FormView';
import { listNamespaces } from '@/api/namespace';

export const secretSchema: FormSchema = {
  submitText: 'Save',
  resetText: 'Reset',
  fields: [
    // Namespace 下拉
    {
      name: 'namespace',
      label: 'Namespace *',
      type: 'select',
      rules: [{ type: 'required', message: 'Miss namespace' }],
      grid: { md: 6 },
      options: async () => {
        const res = await listNamespaces();
        const items = (res as any)?.data?.items ?? (res as any)?.items ?? [];
        return items.map((n: any) => ({
          label: n?.metadata?.name,
          value: n?.metadata?.name,
        }));
      },

      // options: async () => {
      //   try {
      //     const res = await listNamespaces();
      //     const items = (res?.data?.items ?? []) as any[];
      //     return items.map(n => ({ label: n?.metadata?.name, value: n?.metadata?.name }));
      //   } catch (e) {
      //     console.error('load namespaces failed', e);
      //     return []; // 兜底为空数组，弹窗继续渲染
      //   }
      // },
    },

    // Name
    {
      name: 'name',
      label: 'Name *',
      type: 'text',
      rules: [{ type: 'required', message: 'Miss name' }],
      grid: { md: 6 },
    },

    // Secret 类型（单选）
    {
      name: 'type',
      label: '',
      type: 'radio',
      defaultValue: 'docker',                
      options: [
        { label: 'Docker', value: 'docker' },
        { label: 'Opaque', value: 'opaque' },
      ],
      grid: { md: 12 },
    },

    // Docker 专属字段
    {
      name: 'dockerServer',
      label: 'Docker server *',
      type: 'text',
      rules: [{ type: 'required', message: 'Miss docker server' }],
      grid: { md: 12 },
      visibleWhen: (v) => v.type === 'docker',
    },
    {
      name: 'dockerUsername',
      label: 'Docker username *',
      type: 'text',
      rules: [{ type: 'required', message: 'Miss docker username' }],
      grid: { md: 12 },
      visibleWhen: (v) => v.type === 'docker',
    },
    {
      name: 'dockerPassword',
      label: 'Docker password *',
      type: 'password',
      rules: [{ type: 'required', message: 'Miss docker password' }],
      grid: { md: 12 },
      visibleWhen: (v) => v.type === 'docker',
    },

    // Opaque 专属字段
    {
      name: 'data',
      label: 'Data items（Base64）',
      type: 'array',
      addText: 'ADD ONE LINE',
      itemSchema: [
        { name: 'key',   label: 'Key *',   type: 'text', rules: [{ type: 'required' }], grid: { md: 6 } },
        { name: 'value', label: 'Value *', type: 'text', rules: [{ type: 'required' }], grid: { md: 6 } },
      ],
      grid: { md: 12 },
      visibleWhen: (v) => v.type === 'opaque',
    },
  ],
};
