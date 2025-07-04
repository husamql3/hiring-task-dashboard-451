import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getCamera } from '@/lib/api'
import type { Metadata } from 'next'
import { CameraDetailSkeleton } from '@/components/cameras/camera-list-skeleton'
import { CameraDetail } from '@/components/cameras/camera-detail'

type CameraDetailPageProps = {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: CameraDetailPageProps): Promise<Metadata> => {
  const resolvedParams = await params
  const camera = await getCamera(resolvedParams?.id)
  if (!camera) {
    notFound()
  }

  return {
    title: `${camera?.name} | Camera Management System`,
    description: `Details for camera ${camera?.name}`,
  }
}

const Page = async ({ params }: CameraDetailPageProps) => {
  const resolvedParams = await params
  const camera = await getCamera(resolvedParams.id)
  if (!camera) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<CameraDetailSkeleton />}>
        <CameraDetail camera={camera} />
      </Suspense>
    </main>
  )
}

export default Page
