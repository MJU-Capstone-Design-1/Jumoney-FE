interface CompanyCardProps {
  showBadge?: boolean;
}

export const CompanyCard = ({ showBadge = true }: CompanyCardProps) => {
  return (
    <div
      role='button'
      className='bg-secondary1 text-secondary2 shadow-card-shadow flex w-full cursor-pointer flex-col gap-[1rem] rounded-[1.5rem] p-[1rem] text-left'
    >
      <div className='flex w-full items-center justify-start gap-[1rem]'>
        <div className='flex min-w-0 items-center gap-[1rem]'>
          <div className='bg-background h-[4rem] w-[4rem] flex-shrink-0 rounded-full object-contain' />
          <div className='flex min-w-0 flex-col gap-[0.125rem]'>
            <div className='flex w-full items-center gap-[0.75rem]'>
              <div className='text-label-sm truncate font-bold'>기업명</div>
              {showBadge && (
                <div className='text-main2 bg-default text-body-sm mb-[0.125rem] flex h-[1.625rem] w-[5.25rem] items-center justify-center rounded-[6.25rem] font-bold'>
                  #투자방식방식
                </div>
              )}
            </div>
            <div className='flex items-center gap-[0.5rem]'>
              <div className='text-body-lg flex items-center gap-[0.25rem] font-bold'>
                ₩ nn,nnn,nnn
              </div>
              <div className='bg-secondary2 flex h-[0.75rem] w-[0.0625rem]' />
              <div className='text-body-lg text-text-up font-bold'>+nn.n%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
