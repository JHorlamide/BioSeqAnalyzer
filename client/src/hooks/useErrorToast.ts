import { useState } from 'react';
import toast from 'react-hot-toast';
import Utils from '../utils';

const useErrorToast = () => {
  const [shownErrors, setShownErrors] = useState<string[]>([]);

  const handleError = (error: Error | string) => {
    const errorMessage = Utils.getErrorMessage(error);
    toast.error(errorMessage);

    // if (!shownErrors.includes(errorMessage)) {
    //   const tostId = toast.loading(errorMessage);
    //   toast.error(errorMessage);
    //   toast.dismiss(tostId);
    //   setShownErrors([...shownErrors, errorMessage]);
    // }
  };

  return { handleError };
};

export default useErrorToast;