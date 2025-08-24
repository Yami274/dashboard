// import type { FormSchema } from '@/components/FormView';

// export const deviceModelSchema: FormSchema = {
//   submitText: '保存',
//   resetText: '重置',
//   fields: [
//     {
//       name: 'name',
//       label: '模型名称',
//       type: 'text',
//       rules: [{ type: 'required', message: '请输入模型名称' }],
//       grid: { md: 6 },
//     },
//     {
//       name: 'namespace',
//       label: '命名空间',
//       type: 'text',
//       rules: [{ type: 'required', message: '请输入命名空间' }],
//       grid: { md: 6 },
//     },
//     {
//       name: 'description',
//       label: '描述',
//       type: 'textarea',
//       grid: { md: 12 },
//     },
//     // 后续需要 properties/commands 时再加字段或 ArrayField
//   ],
// };

import type { FormSchema } from '@/components/FormView';

export const deviceModelSchema: FormSchema = {
  submitText: 'save',
  resetText: 'reset',
  fields: [
    { name: 'name', label: 'Name', type: 'text', rules: [{ type: 'required' }], grid: { md: 6 } },
    { name: 'namespace', label: 'Namespace', type: 'text', rules: [{ type: 'required' }], grid: { md: 6 } },

    { name: 'protocol', label: 'Protocol', type: 'text', grid: { md: 6 } }, 

    { name: 'description', label: 'Description', type: 'textarea', grid: { md: 12 } },

    {
      name: 'attributes',
      label: 'Attribute list',
      type: 'array',
      itemSchema: [
        {
          name: 'name',
          label: 'Attribute Name',
          type: 'text',
          rules: [{ type: 'required', message: '请输入属性名' }],
          grid: { md: 6 },
        },
        {
          name: 'type',
          label: 'Attribute Type',
          type: 'select',
         
          options: [
            { label: 'string', value: 'string' },
            { label: 'int', value: 'int' },
            { label: 'float', value: 'float' },
            { label: 'boolean', value: 'boolean' },
          ],
          rules: [{ type: 'required', message: '请选择类型' }],
          grid: { md: 6 },
        },
      ],
      grid: { md: 12 },
    },
  ],
};
