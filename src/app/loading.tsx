import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        className="rounded-full"
        src="/loading.gif"
        alt="loading"
        width="300"
        height="500"
      ></Image>
    </div>
  )
}
