// import type { FormSchema } from '@/components/FormView';


// export const addNodeGroupSchema: FormSchema = {
//   // submitText: 'SUBMIT',
//   resetText: 'CANCEL',
//   fields: [
//     {
//       name: 'name',
//       label: 'Name *',
//       type: 'text',
//       rules: [{ type: 'required', message: 'Miss name' }],
//       grid: { md: 12 },
//     },


//     {
//       name: 'nodes',
//       label: 'Nodes',
//       type: 'select', 
//       grid: { md: 12 },


//       options: [
//         { label: 'node-1', value: 'node-1' },
//         { label: 'node-2', value: 'node-2' },
//       ],
//     },


//     {
//       name: 'matchLabels',
//       label: 'MatchLabels',
//       type: 'array',
//       addText: '+ ADD MATCHLABELS',
//       itemSchema: [
//         { name: 'key',   label: 'Key *',   type: 'text', rules: [{ type: 'required' }], grid: { md: 6 } },
//         { name: 'value', label: 'Value *', type: 'text', rules: [{ type: 'required' }], grid: { md: 6 } },
//       ],
//       grid: { md: 12 },
//     },
//   ],
// };


// modules/web/src/component/AddNodeGroupDialog/schema.ts
import type { FormSchema } from '@/components/FormView';

export const addNodeGroupSchema: FormSchema = {
  // 不要写 submitText / resetText，避免 FormView 自带按钮
  fields: [
    {
      name: 'name',
      label: 'Name *',
      type: 'text',
      rules: [{ type: 'required', message: 'Miss name' }],
      grid: { md: 12 },
    },
    {
      name: 'nodes',
      label: 'Nodes',
      type: 'select',
      grid: { md: 12 },
      options: [
        { label: 'node-1', value: 'node-1' },
        { label: 'node-2', value: 'node-2' },
      ],
    },
    {
      name: 'matchLabels',
      label: 'MatchLabels',
      type: 'array',
      addText: '+ ADD MATCHLABELS',
      itemSchema: [
        { name: 'key', label: 'Key *', type: 'text', rules: [{ type: 'required' }], grid: { md: 6 } },
        { name: 'value', label: 'Value *', type: 'text', rules: [{ type: 'required' }], grid: { md: 6 } },
      ],
      grid: { md: 12 },
    },
  ],
};
