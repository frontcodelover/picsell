import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const useCustomToast = () => {
  const { toast } = useToast();

  const showSuccessToast = (message: string, title: string) => {
    toast({
      variant: 'success',
      title : title,
      description: message,
      className: 'bg-green-500 text-white !important',
    });
  };

  const showErrorToast = (message: string, title: string) => {
    toast({
      variant: 'destructive',
      title : title,	
      description: message,
      action: <ToastAction altText='Réessayer'>Réessayer</ToastAction>,
    });
  };

  return { showSuccessToast, showErrorToast };
};

export default useCustomToast;
