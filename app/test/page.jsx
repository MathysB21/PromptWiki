import { LoadingDots } from "@components/loaders/LoadingDots"
import { LoadingCircle } from "@components/loaders/LoadingCircle"
import { LoadingSpinner } from "@components/loaders/LoadingSpinner"

const page = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
        <LoadingDots />
        <LoadingCircle />
        <LoadingSpinner />
    </div>
  )
}

export default page