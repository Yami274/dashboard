// // src/component/AddRuleDialog.js
// import React, { useEffect } from 'react';
// import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
// import { ServiceAccount } from '@/types/serviceAccount';
// import { useListNamespaces } from '@/api/namespace';
// import { useListSecrets } from '@/api/secret';
// import { useAlert } from '@/hook/useAlert';

// interface AddServiceAccountDialogProps {
//   open?: boolean;
//   onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
//   onSubmit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ServiceAccount) => void;
// }

// const AddServiceAccountDialog = ({ open, onClose, onSubmit }: AddServiceAccountDialogProps) => {
//   const [namespace, setNamespace] = React.useState('');
//   const [name, setName] = React.useState('');
//   const [secrets, setSecrets] = React.useState<string[]>([]);
//   const [formErrors, setFormErrors] = React.useState<any>({});
//   const namespaceData = useListNamespaces()?.data;
//   const { data, mutate } = useListSecrets(namespace);
//   const { setErrorMessage } = useAlert();

//   useEffect(() => {
//     mutate();
//   }, [namespace, mutate]);

//   const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     const newErrors: any = {};
//     if (!namespace) newErrors.namespace = 'Missing namespace';
//     if (!name) newErrors.name = 'Missing name';
//     if (!secrets) newErrors.source = 'Missing secrets';

//     if (Object.keys(newErrors).length > 0) {
//       setFormErrors(newErrors);
//     } else {
//       try {
//         await onSubmit?.(event, {
//           apiVersion: 'v1',
//           kind: 'ServiceAccount',
//           metadata: {
//             namespace,
//             name,
//           },
//           secrets: secrets.map((secret) => ({
//             name: secret,
//           })),
//         });
//         handleClose(event);
//       } catch (error: any) {
//         setErrorMessage(error?.response?.data?.message || error?.message || 'Failed to create ServiceAccount');
//       }
//     }
//   };

//   const handleClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     setNamespace('');
//     setName('');
//     setSecrets([]);
//     onClose?.(event);
//   }

//   return (
//     <Dialog open={!!open} onClose={handleClose} fullWidth maxWidth="sm">
//         <DialogTitle>Add ServiceAccounts</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth margin="normal" error={Boolean(formErrors.namespace)}>
//             <InputLabel required>Namespace</InputLabel>
//             <Select
//               label="Namespace"
//               value={namespace}
//               onChange={(event) => setNamespace(event.target.value)}
//               placeholder="Namespace"
//             >
//               {namespaceData?.items?.map((item) => (
//                 <MenuItem key={item?.metadata?.uid} value={item?.metadata?.name}>
//                   {item?.metadata?.name}
//                 </MenuItem>
//               ))}
//             </Select>
//             {formErrors.namespace && (
//               <FormHelperText>{formErrors.namespace}</FormHelperText>
//             )}
//           </FormControl>

//           <TextField
//             fullWidth
//             margin="normal"
//             label="Name"
//             placeholder="Name"
//             variant="outlined"
//             required
//             value={name}
//             onChange={(event) => setName(event.target.value)}
//             error={Boolean(formErrors.name)}
//             helperText={formErrors.name}
//           />

//           <FormControl fullWidth margin="normal" error={Boolean(formErrors.secrets)}>
//             <InputLabel required>Secrets</InputLabel>
//             <Select<string[]>
//               label="Secrets"
//               multiple
//               value={secrets}
//               onChange={(event) => setSecrets(typeof event.target.value === 'string' ? [event.target.value] : event.target.value)}
//               placeholder="Secrets"
//             >
//               {data?.items?.map((secret) => (
//                 <MenuItem key={secret?.metadata?.uid} value={secret?.metadata?.name}>
//                   {secret?.metadata?.name}
//                 </MenuItem>
//               ))}
//             </Select>
//             {formErrors.secrets && (
//               <FormHelperText>{formErrors.secrets}</FormHelperText>
//             )}
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//   );
// };

// export default AddServiceAccountDialog;


'use client';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import FormView from '@/components/FormView';
import { addSaSchema } from './schema';
import { toServiceAccount } from './mapper';
import { createServiceAccount } from '@/api/serviceAccount'; 

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void; 
};

export default function AddServiceAccountDialog({ open, onClose, onSuccess }: Props) {
  const formId = 'add-sa-form';

  const handleSubmit = async (values: any) => {
    const { ns, body } = toServiceAccount(values);
    await createServiceAccount(ns, body);
    onSuccess?.();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add ServiceAccounts</DialogTitle>
      <DialogContent dividers>
        <FormView
          formId={formId}
          schema={addSaSchema}
          initialValues={{}}
          onSubmit={handleSubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>CANCEL</Button>
        <Button type="submit" form={formId}>ADD</Button>
      </DialogActions>
    </Dialog>
  );
}
