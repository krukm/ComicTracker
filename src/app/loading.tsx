import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex flex-col pt-36">
      <div className="relative self-center mb-4 h-64 w-64 p-2">
        <Image
          className="animate-spin h-full w-full object-cover"
          src="/x-logo.png"
          alt="loading"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
        />
      </div>
      <div className="self-end md:pt-96 pr-4 text-xs">
        X-Men image © 2014 Marvel
      </div>
    </div>
  )
}
