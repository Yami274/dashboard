// import type { DeviceModel } from '@/types/deviceModel';

// export function toDeviceModel(values: any): { ns: string; body: DeviceModel } {
//   const ns = values.namespace;

//   const body: DeviceModel = {
//     apiVersion: 'devices.kubeedge.io/v1alpha2',
//     kind: 'DeviceModel',
//     metadata: {
//       name: values.name,
//       namespace: ns,
//       // 描述信息放在注解里（key 你也可以自定义）
//       annotations: values.description
//         ? { 'dashboard.kubeedge.io/description': values.description }
//         : undefined,
//     },
//     // spec 里不要放 description；按你的类型要求给最小结构
//     spec: {
//       // 如果 DeviceModelSpec 的这两个是必填，用空数组；如果是可选，可以把整个 spec 留空 {}
//       // properties: [],
//       // deviceCommands: [],
//     } as any, // 如果 TS 仍然卡类型，这里可以临时 as any，等后续补全再去掉
//   };

//   return { ns, body };
// }


import type { DeviceModel } from '@/types/deviceModel';


function toPropertyType(t: string) {
  switch ((t || '').toLowerCase()) {
    case 'string':
      return { string: {} };
    case 'int':
      return { int: {} };
    case 'float':
      return { float: {} };
    case 'boolean':
      return { boolean: {} };
    default:
  
      return { string: {} };
  }
}

export function toDeviceModel(values: any): { ns: string; body: DeviceModel } {
  const ns = values.namespace;

  //  把 attributes 从表单值映射到 spec.properties
  const attrList: Array<{ name: string; type: any }> = Array.isArray(values.attributes)
    ? values.attributes
    : [];

  const properties = attrList
    .filter((row) => row && row.name) 
    .map((row) => ({
      name: String(row.name),
      type: toPropertyType(row.type),
     
    }));

  //  组装 DeviceModel 对象
  const body: DeviceModel = {
    apiVersion: 'devices.kubeedge.io/v1alpha2',
    kind: 'DeviceModel',
    metadata: {
      name: values.name,
      namespace: ns,

      annotations: {
        ...(values.description ? { 'dashboard.kubeedge.io/description': String(values.description) } : {}),
        ...(values.protocol ? { 'dashboard.kubeedge.io/protocol': String(values.protocol) } : {}),
      },
    },

    spec: {
      ...(properties.length ? { properties } : {}),
  
    } as any, 
  };

  return { ns, body };
}
