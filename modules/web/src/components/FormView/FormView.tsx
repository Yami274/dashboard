'use client';  
import { Grid, Box, Stack, Button } from '@mui/material';
import { useFormState } from './adapters/useFormState';
import type { FormSchema, FieldSchema } from './schema/types';
import InputField from './fields/InputField';   
import SelectField from './fields/SelectField'; 
import SwitchField from './fields/SwitchField'; 
import ArrayField from './fields/ArrayField';
import RadioField from './fields/RadioField';

// 注册表：字符串 → 组件函数
const registry: Record<string, (p: any) => JSX.Element> = {
  text: (p) => <InputField {...p} />,
  password: (p) => <InputField {...p} />,
  textarea: (p) => <InputField {...p} />,
  number: (p) => <InputField {...p} />,
  select: (p) => <SelectField {...p} />,
  'multi-select': (p) => <SelectField {...p} />,
  switch: (p) => <SwitchField {...p} />,
  array: (p) => <ArrayField {...p} />,
  radio: (p) => <RadioField {...p} />, 
};

// 通过注册表取组件再渲染（⚠️ 不要用 <{field.type} />）
function renderField(field: FieldSchema, control: any, values: any) {
  if (field.visibleWhen && !field.visibleWhen(values)) return null;
  const Comp = registry[field.type];

  // 临时保护+定位
  if (typeof Comp !== 'function') {
    console.error('Bad field component:', field.type, Comp);
    return null;
  }

  const grid = field.grid || { xs: 12, md: 6 };
  return (
    <Grid item key={field.name} xs={grid.xs ?? 12} sm={grid.sm ?? grid.xs ?? 12} md={grid.md ?? 6} lg={grid.lg ?? grid.md ?? 6}>
      <Box sx={{ opacity: field.disabledWhen?.(values) ? 0.6 : 1, pointerEvents: field.disabledWhen?.(values) ? 'none' : 'auto' }}>
        <Comp field={field} control={control} />
      </Box>
    </Grid>
  );
}

export default function FormView({
  schema,
  onSubmit,
  initialValues,
  submitting,
  formId,          // 新增
  hideActions,     // 新增
}: {
  schema: FormSchema;
  onSubmit: (values: any) => Promise<void> | void;
  initialValues?: Record<string, any>;
  submitting?: boolean;
  formId?: string;       // 新增
  hideActions?: boolean; // 新增

  
}) {
  const form = useFormState(schema, initialValues);
  const { handleSubmit, control, watch, reset } = form;
  const values = watch();
  // const showActions = !!(schema.submitText || schema.resetText);

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}> {/* 这里加 id */}
      <Grid container spacing={2}>
        {schema.fields.map(f => renderField(f, control, values))}
      </Grid>


      {/* 只有不隐藏时，才渲染内部按钮 */}
      {!hideActions && (
        <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
          {schema.resetText && (
            <Button type="reset" onClick={() => reset(initialValues || {})}>
              {schema.resetText}
            </Button>
          )}
          {schema.submitText && (
            <Button type="submit" disabled={submitting}>
              {schema.submitText}
            </Button>
          )}
        </Stack>
      )}

      {/* {showActions && (
        <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
          {schema.resetText && (
            <Button
              type="button"                              // ✅ 用 button，避免原生 reset
              onClick={() => reset(initialValues ?? {})} // ✅ 重置到初始值
            >
              {schema.resetText}
            </Button>
          )}
          {schema.submitText && (
            <Button type="submit" disabled={submitting}>
              {schema.submitText}
            </Button>
          )}
        </Stack>
      )} */}


    </form>
  );
}
