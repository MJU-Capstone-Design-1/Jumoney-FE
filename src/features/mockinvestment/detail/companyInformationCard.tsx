import { ReactNode } from 'react';

interface CompanyInformationCardProps {
  icon: ReactNode;
  text: ReactNode;
}

export const CompanyInformationCard = ({
  icon,
  text,
}: CompanyInformationCardProps) => {
  return (
    <div className='shadow-card-shadow bg-secondary1 flex min-h-[5.5rem] w-full items-center justify-center gap-x-4 rounded-[1.5rem] px-[1.25rem]'>
      <div className='flex-none'>{icon}</div>
      <div className='text-secondary2 text-body-md flex-1 text-left leading-[120%] font-semibold tracking-tight'>
        {text}
      </div>
    </div>
  );
};
