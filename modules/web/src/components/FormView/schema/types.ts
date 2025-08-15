export type FieldType =
  | 'text'
  | 'number'
  | 'select'
  | 'date'
  | 'switch'
  | 'textarea'
  | 'password'
  | 'radio'
  | 'checkbox'
  | 'multi-select'
  | 'array';     

export type Rule =
  | { type: 'required'; message?: string }
  | { type: 'min'; value: number; message?: string }
  | { type: 'max'; value: number; message?: string }
  | { type: 'regex'; value: RegExp; message?: string }
  | { type: 'custom'; fn: (val: any, form: any) => true | string };

export interface FieldOption { label: string; value: string | number; disabled?: boolean }

export interface FieldSchema {
  name: string;
  label: string;                 // i18n key 或直写
  type: FieldType;
  placeholder?: string;
  helperText?: string;
  defaultValue?: any;
  rules?: Rule[];
  options?:
    | { label: string; value: any }[]                                  // 1) 静态选项
    | (() => Promise<{ label: string; value: any }[]>)                // 2) 无参异步
    | ((form: any, values: Record<string, any>) =>                    // 3) 带 form/values 的异步
        Promise<{ label: string; value: any }[]>);
  fullWidth?: boolean;
  grid?: { xs?: number; sm?: number; md?: number; lg?: number };
  visibleWhen?: (form: any) => boolean;
  disabledWhen?: (form: any) => boolean;
  itemSchema?: ArrayItemField[];  

  addText?: string;  
  removeText?: string;

  rows?: number;

  /** 对于 type=array：删除按钮是否与子项同一行显示 */
  inlineRemove?: boolean;
  

  /** 可选：透传到组件的额外属性 */
  props?: Record<string, any>;

}

export interface FormSchema {
  fields: FieldSchema[];
  layout?: 'vertical' | 'horizontal';
  submitText?: string;
  resetText?: string;
}

export interface ArrayItemField
  extends Omit<FieldSchema, 'visibleWhen' | 'disabledWhen'> {
  visibleWhen?: FieldSchema['visibleWhen'];
  disabledWhen?: FieldSchema['disabledWhen'];
}
