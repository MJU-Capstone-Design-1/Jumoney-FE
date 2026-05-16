import { cn } from '@/lib/utils';
import { CustomSpinnerIcon } from '@/components/icons/customSpinnerIcon';

export function CustomSpinner({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      role='status'
      aria-label='Loading'
      className={cn('relative flex items-center justify-center', className)}
      {...props}
    >
      <CustomSpinnerIcon />
    </div>
  );
}
