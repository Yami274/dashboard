'use client';
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useFieldArray, Controller } from 'react-hook-form';
import InputField from './InputField';
import SelectField from './SelectField';





export default function ArrayField({ field, control }: any) {
  // field.itemSchema: 子字段数组，如 [{ name:'key', type:'text', label:'Key' }, ...]
  const name = field.name;
  const { fields, append, remove } = useFieldArray({ control, name });
  
  const subFields: any[] = field.itemsSchema ?? field.itemSchema ?? [];

  // return (
  //   <Stack spacing={1}>
  //     <Typography variant="subtitle2">{field.label}</Typography>
  //     {fields.map((row, idx) => (
  //       <Stack key={row.id} direction="row" spacing={1} alignItems="center">
  //         {field.itemSchema.map((sub: any) => (
  //           <Controller
  //             key={sub.name}
  //             name={`${name}.${idx}.${sub.name}`}
  //             control={control}
  //             render={({ field: rhf }) => (
  //               <InputField field={{ ...sub, name: `${name}.${idx}.${sub.name}`, fullWidth: true }} control={control} />
  //             )}
  //           />
  //         ))}
  //         <IconButton onClick={() => remove(idx)} aria-label="remove"><DeleteOutlineIcon /></IconButton>
  //       </Stack>
  //     ))}
  //     <Button size="small" onClick={() => append({})}>Add one line</Button>
  //   </Stack>
  // );
return (
  <Stack spacing={1}>
    {!!field.label && (
      <Typography variant="subtitle2">{field.label}</Typography>
    )}

    {fields.map((row, idx) => {
      const subFields = field.itemSchema ?? field.itemsSchema ?? [];
      const inlineRemove = !!field.inlineRemove; // 新增：是否同一行显示删除

      return (
        <Grid
          key={row.id}
          container
          spacing={2}
          alignItems="center"
          wrap={inlineRemove ? 'nowrap' : 'wrap'}  // 同一行或可换行
        >
          {subFields.map((sub: any) => {
            const xs = sub.grid?.xs ?? 12;
            const sm = sub.grid?.sm ?? xs;
            const md = sub.grid?.md ?? xs;
            const lg = sub.grid?.lg ?? md;

            return (
              <Grid item xs={xs} sm={sm} md={md} lg={lg} key={`${idx}-${sub.name}`}>
                <Controller
                  name={`${name}.${idx}.${sub.name}`}
                  control={control}
                  render={({ field: rhf }) => (
                    <InputField
                      field={{
                        ...sub,
                        name: `${name}.${idx}.${sub.name}`,
                        fullWidth: true,
                      }}
                      control={control}
                    />
                  )}
                />
              </Grid>
            );
          })}

          {/* 删除按钮：同一行放在尾部；否则占整行 */}
          <Grid item xs={inlineRemove ? 'auto' : 12}>
            <IconButton
              onClick={() => remove(idx)}
              aria-label="remove"
              size="small"
              sx={inlineRemove ? { ml: 1 } : undefined}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      );
    })}

    <Button size="small" onClick={() => append({})}>
      {field.addText ?? 'Add one line'}
    </Button>
  </Stack>
);


}
