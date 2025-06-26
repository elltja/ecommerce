import { Separator } from '~/components/Separator';

export default function LoadingProductPage() {
  return (
    <div className='my-10 grid grid-cols-1 md:grid-cols-2'>
      <div className='flex gap-5 p-5 lg:justify-center'>
        <div className='no-scrollbar hidden overflow-x-auto lg:block lg:h-[37vw] xl:h-[30vw]'>
          <div className='flex flex-col gap-y-5'>
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className='h-[100px] w-[100px] animate-pulse bg-gray-300'
              ></div>
            ))}
          </div>
        </div>
        <div className='aspect-square size-full bg-gray-200 p-10 lg:size-[37vw] xl:size-[30vw]'>
          <div className='relative size-full animate-pulse bg-gray-300'></div>
        </div>
      </div>

      <div className='p-5'>
        <div className='flex flex-col gap-3'>
          <h1 className='h-10 w-2/3 animate-pulse bg-gray-400'></h1>
          <div className='h-5 w-20 animate-pulse bg-gray-400'></div>
          <div className='flex flex-col gap-2'>
            <p className='h-4 w-2/3 animate-pulse rounded-sm bg-gray-300'></p>
            <p className='h-5 w-2/3 animate-pulse rounded-sm bg-gray-300'></p>
            <p className='h-4 w-2/3 animate-pulse rounded-sm bg-gray-300'></p>
          </div>
          <span className='h-7 w-20 animate-pulse bg-gray-400'></span>
        </div>
        <div className='my-5 lg:my-7 lg:max-w-5/6'>
          <Separator />
        </div>

        {
          // Button
        }
        <div className='h-13 w-2/3 animate-pulse rounded-full bg-gray-400'></div>
      </div>
    </div>
  );
}
