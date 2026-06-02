import { DownBigArrowIcon } from '@/components/icons/downBigArrowIcon';
import { UpBigArrowIcon } from '@/components/icons/upBigArrowIcon';

interface QuantityButtonProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  isMaxReached?: boolean;
}

const QuantityButton = ({
  quantity,
  onIncrease,
  onDecrease,
  isMaxReached = false,
}: QuantityButtonProps) => {
  return (
    <div className='bg-default flex h-[4rem] w-[21.4375rem] items-center justify-between rounded-[1000px] px-[2rem] py-[1rem]'>
      <button
        type='button'
        onClick={onDecrease}
        disabled={quantity <= 1}
        className={`p-2 transition-opacity ${
          quantity <= 1 ? 'cursor-not-allowed opacity-30' : 'active:opacity-70'
        }`}
      >
        <DownBigArrowIcon />
      </button>

      <span className='text-secondary2 text-body-xl font-extrabold'>
        {quantity}주
      </span>

      <button
        type='button'
        onClick={onIncrease}
        disabled={isMaxReached}
        className={`p-2 transition-opacity ${
          isMaxReached ? 'cursor-not-allowed opacity-30' : 'active:opacity-70'
        }`}
      >
        <UpBigArrowIcon />
      </button>
    </div>
  );
};

export default QuantityButton;
