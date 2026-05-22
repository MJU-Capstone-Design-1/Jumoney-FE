import { MASTERS } from './portfolioSelectInformations';
import { PortfolioSelectCloseButton } from './portfolioSelectPhilosophyCloseButton';

type MasterData = (typeof MASTERS)[number];

interface PortfolioSelectInvestmentPhilosophyProps {
  master: MasterData;
  onClose: () => void;
}

export const PortfolioSelectInvestmentPhilosophy = ({
  master,
  onClose,
}: PortfolioSelectInvestmentPhilosophyProps) => {
  return (
    <div
      className={`${master.bgColor} text-secondary1 flex max-w-[21.25rem] flex-col rounded-[2.5rem] p-[1rem]`}
    >
      <PortfolioSelectCloseButton onClick={onClose} bgColor={master.bgColor} />

      <div className='flex flex-col gap-[1.75rem] py-[1rem]'>
        <div className='flex flex-col items-center gap-[1rem]'>
          <h1 className='text-label-md text-center font-extrabold break-keep whitespace-pre-wrap'>
            {master.investment_philosophy.title}
          </h1>
          <p className='text-body-md text-center leading-[120%] font-bold break-keep whitespace-pre-wrap'>
            {master.investment_philosophy.description}
          </p>
        </div>

        <div className='flex flex-col gap-[1.5rem] px-[2.25rem]'>
          {master.investment_principles.map((principle, index) => (
            <div key={index} className='flex flex-col gap-[0.5rem]'>
              <div className='flex items-center gap-[0.5rem]'>
                <div className='bg-secondary1 h-[0.625rem] w-[0.625rem] shrink-0 rounded-full' />
                <h2 className='text-body-md leading-[120%] font-extrabold break-keep whitespace-pre-wrap'>
                  {principle.title}
                </h2>
              </div>
              <div className='text-body-sm ml-[0.25rem] pl-[1rem] leading-[120%] font-bold break-keep whitespace-pre-wrap'>
                {principle.description}
                {principle.details && (
                  <ul className='mt-[0.5rem] flex list-disc flex-col gap-[0.25rem] pl-[1rem]'>
                    {principle.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
