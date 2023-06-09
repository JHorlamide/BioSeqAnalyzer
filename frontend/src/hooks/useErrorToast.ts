import { useState } from 'react';
import toast from 'react-hot-toast';

const useErrorToast = () => {
  const [shownErrors, setShownErrors] = useState<string[]>([]);

  const handleOnError = (error: Error | string) => {
    let errorMessage;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = error;
    }

    if (!shownErrors.includes(errorMessage)) {
      const tostId = toast.loading(errorMessage);
      toast.error(errorMessage);
      toast.dismiss(tostId);
      setShownErrors([...shownErrors, errorMessage]);
    }
  };

  return { handleOnError };
};

export default useErrorToast;