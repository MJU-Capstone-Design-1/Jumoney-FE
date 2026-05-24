interface PencilIconProps {
  size?: number | string;
  viewBox?: string;
}

export const PencilIcon = ({
  size = 32,
  viewBox = '0 0 32 32',
}: PencilIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox={viewBox}
      fill='none'
    >
      <path
        d='M26.5049 6.50523L25.4951 5.49542C23.933 3.93332 21.4003 3.93332 19.8382 5.49542L5.17157 20.1621C4.42143 20.9122 4 21.9296 4 22.9905V28.0003H9.00981C10.0707 28.0003 11.0881 27.5789 11.8382 26.8288L26.5049 12.1621C28.067 10.6 28.067 8.06733 26.5049 6.50523Z'
        stroke='#4B3425'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path
        d='M26 6.00033C24.159 4.15938 21.1743 4.15938 19.3333 6.00033C17.4924 7.84127 17.4924 10.826 19.3333 12.667C21.1743 14.5079 24.159 14.5079 26 12.667C27.8409 10.826 27.8409 7.84127 26 6.00033Z'
        stroke='#4B3425'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  );
};
