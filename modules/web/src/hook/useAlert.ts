// import { useContext } from 'react';
// import { AppContext } from '@/component/AppContext'

// export const useAlert = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useAlert must be used within a AppProvider');
//   }
//   return { setErrorMessage: context.setErrorMessage };
// }
import { useContext } from 'react';
import { AppContext } from '@/components/Common/AppContext';

export const useAlert = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAlert must be used within a AppProvider');
  }

  return {
    success: context.setSuccessMessage, // 新增
    error: context.setErrorMessage,     // 命名为 error
  };
};
