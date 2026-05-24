export const PortfolioPagination = ({
  activeIndex,
}: {
  activeIndex: number;
}) => {
  const totalDots = 4;
  return (
    <div className='flex items-center justify-center gap-[0.5rem]'>
      {Array.from({ length: totalDots }).map((_, index) => (
        <div
          key={index}
          className={`h-[0.5rem] w-[0.5rem] rounded-full transition-colors duration-300 ${
            index === activeIndex ? 'bg-secondary2' : 'bg-default'
          }`}
        />
      ))}
    </div>
  );
};
