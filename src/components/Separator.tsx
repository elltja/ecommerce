export function Separator({ text }: { text?: string }) {
  if (!text) return <hr className='h-[1px] w-full border-none bg-gray-300' />;
  return (
    <div className='flex items-center gap-3'>
      <hr className='h-[1px] w-full border-none bg-gray-300' />
      <span className='text-gray-500'>{text}</span>
      <hr className='h-[1px] w-full border-none bg-gray-300' />
    </div>
  );
}
