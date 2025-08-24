// // src/component/AddRuleDialog.js
// import React, { useState } from 'react';
// import { Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

// interface AddNodeDialogProps {
//   open?: boolean;
//   onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
// }

// const AddNodeDialog = ({ open, onClose }: AddNodeDialogProps) => {
//   const [formValues, setFormValues] = useState({
//     cloudMasterIP: '',
//     kubeedgeVersion: '',
//     runtimeType: '',
//     token: '',
//     command: '',
//   });
//   const [formErrors, setFormErrors] = useState<any>({});

//   const validateForm = () => {
//     const errors: any = {};
//     if (!formValues.cloudMasterIP) errors.cloudMasterIP = 'Please enter Cloud master node ip:port';
//     if (!formValues.kubeedgeVersion) errors.kubeedgeVersion = 'Please enter KubeEdge version';
//     if (!formValues.runtimeType) errors.runtimeType = 'Please select a runtime type';
//     if (!formValues.token) errors.token = 'Please enter Token';
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleGenerateCommand = () => {
//     if (!validateForm()) {
//       return;
//     }

//     let command;
//     if (formValues.runtimeType === 'docker') {
//       command = `keadm join --token=${formValues.token} --cloudcore-ipport=${formValues.cloudMasterIP} --kubeedge-version=${formValues.kubeedgeVersion} --runtimetype=docker --remote-runtime-endpoint=unix:///var/run/dockershim.sock`;
//     } else {
//       command = `keadm join --token=${formValues.token} --cloudcore-ipport=${formValues.cloudMasterIP} --kubeedge-version=${formValues.kubeedgeVersion} --runtimetype=remote --remote-runtime-endpoint=unix:///run/containerd/containerd.sock`;
//     }
//     setFormValues({ ...formValues, command });
//   };

//   const handleInputChange = (event: any) => {
//     const { name, value } = event.target;
//     setFormValues({ ...formValues, [name]: value });
//   };
  
//   const handleClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     setFormValues({
//       cloudMasterIP: '',
//       kubeedgeVersion: '',
//       runtimeType: '',
//       token: '',
//       command: '',
//     });
//     setFormErrors({});
//     onClose?.(event);
//   }

//   return (
//     <Dialog open={!!open} onClose={handleClose} fullWidth maxWidth="md">
//       <DialogTitle>Add Node</DialogTitle>
//       <DialogContent>
//         <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//           <TextField
//             label="Cloud master node ip:port"
//             name="cloudMasterIP"
//             value={formValues.cloudMasterIP}
//             onChange={handleInputChange}
//             error={!!formErrors.cloudMasterIP}
//             helperText={formErrors.cloudMasterIP}
//             placeholder="192.168.30.300:3000"
//             margin="dense"
//             required
//             fullWidth
//           />
//           <TextField
//             label="KubeEdge version"
//             name="kubeedgeVersion"
//             value={formValues.kubeedgeVersion}
//             onChange={handleInputChange}
//             error={!!formErrors.kubeedgeVersion}
//             helperText={formErrors.kubeedgeVersion}
//             placeholder="1.12.1"
//             margin="dense"
//             required
//             fullWidth
//           />
//           <FormControl error={!!formErrors.runtimeType} fullWidth required>
//             <InputLabel id="runtime-type-select-label">Runtime type</InputLabel>
//             <Select
//               labelId="runtime-type-select-label"
//               name="runtimeType"
//               value={formValues.runtimeType}
//               onChange={handleInputChange}
//               label="Runtime type"
//               placeholder="Please select a runtime type"
//             >
//               <MenuItem value="docker">Docker</MenuItem>
//               <MenuItem value="containerd">Containerd</MenuItem>
//             </Select>
//             {formErrors.runtimeType && <FormHelperText>{formErrors.runtimeType}</FormHelperText>}
//           </FormControl>
//           <TextField
//             label="Token"
//             name="token"
//             value={formValues.token}
//             onChange={handleInputChange}
//             error={!!formErrors.token}
//             helperText={formErrors.token}
//             placeholder="Please enter Token"
//             margin="dense"
//             required
//             fullWidth
//           />
//           <TextField
//             label="Command"
//             value={formValues.command}
//             onChange={handleInputChange}
//             fullWidth
//             multiline
//             rows={4}
//             placeholder="Please enter command"
//             margin="dense"
//           />
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleGenerateCommand} variant="contained" color="primary">
//           Generate Command
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddNodeDialog;


// 'use client';

// import { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
// import FormView from '@/components/FormView';
// import { addNodeSchema } from './schema';   

// export default function AddNodeDialog({ open, onClose, initial }: any) {
// const [command, setCommand] = useState(initial?.command ?? '');

//   const handleGenerate = (values: any) => {
//     const cmd = [
//       'keadm join',
//       `--cloudcore-ipport=${values.cloudcore}`,
//       `--kubeedge-version=${values.version}`,
//       `--token=${values.token}`,
//       `--runtimetype=${values.runtime}`,
//     ].join(' ');
//     setCommand(cmd);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>Add Node</DialogTitle>
//       <DialogContent dividers>
      
//         <FormView
//           schema={addNodeSchema}
//           initialValues={{ ...(initial || {}) }}
//           onSubmit={handleGenerate}
//           hideActions
//           formId="addNodeForm"
//         />

//         <Stack spacing={1} mt={2}>
//           <TextField
//             label="Command"
//             placeholder="Please enter command"
//             value={command}
//             onChange={(e) => setCommand(e.target.value)}
//             fullWidth
//             multiline
//             minRows={6}
//           />
//         </Stack>

//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onClose}>CANCEL</Button>
        
//         <Button type="submit" form="addNodeForm" variant="contained">
//           GENERATE COMMAND
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }



'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
} from '@mui/material';
import FormView from '@/components/FormView';
import { addNodeSchema } from './schema';

type Props = {
  open: boolean;
  onClose: () => void;
  initial?: Record<string, any>;
};

export default function AddNodeDialog({ open, onClose, initial }: Props) {
  const [command, setCommand] = useState<string>(initial?.command ?? '');


  const handleSubmit = (values: any) => {
    const cmd = [
      'keadm join',
      `--cloudcore-ipport=${values.cloudcore}`,
      `--kubeedge-version=${values.version}`,
      `--token=${values.token}`,
      `--runtimetype=${values.runtime}`,
    ].join(' ');
    setCommand(cmd);
  };


  const formId = 'addNodeForm';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Node</DialogTitle>

      <DialogContent
        dividers
      
        sx={{ '& .fv-actions': { display: 'none !important' } }}
      >
        
        <Box>
          <FormView
            schema={addNodeSchema}
            initialValues={{ ...(initial || {}) }}
            onSubmit={handleSubmit}
            formId={formId}
            {...({ hideActions: true } as any)}
            {...({ showActions: false } as any)}
            {...({ actions: false } as any)}
          />
        </Box>

       
        <Stack spacing={1} mt={2}>
          <TextField
            label="Command"
            placeholder="Please enter command"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            fullWidth
            multiline
            minRows={6}
          />
        </Stack>
      </DialogContent>

  
      <DialogActions>
        <Button onClick={onClose}>CANCEL</Button>
        <Button type="submit" form={formId} variant="contained">
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  );
}
