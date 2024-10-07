/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dOGmfdOKkWP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

export default function CarousselProductHome() {
  return (
    <Carousel className="w-full max-w-screen-lg">
      <CarouselContent>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col gap-2 aspect-square items-center justify-center p-6">
                <img
                  src="/placeholder.svg"
                  alt="Product Image"
                  width={600}
                  height={600}
                  className="aspect-square object-cover w-full h-60"
                />
                <h3 className="font-semibold text-lg md:text-xl">Stylish Sunglasses</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">UV protection</p>
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
                <h4 className="font-semibold text-base md:text-lg">$29.99</h4>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col gap-2 aspect-square items-center justify-center p-6">
                <img
                  src="/placeholder.svg"
                  alt="Product Image"
                  width={600}
                  height={600}
                  className="aspect-square object-cover w-full h-60"
                />
                <h3 className="font-semibold text-lg md:text-xl">Leather Crossbody Bag</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stylish and practical</p>
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
                <h4 className="font-semibold text-base md:text-lg">$49.99</h4>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col gap-2 aspect-square items-center justify-center p-6">
                <img
                  src="/placeholder.svg"
                  alt="Product Image"
                  width={600}
                  height={600}
                  className="aspect-square object-cover w-full h-60"
                />
                <h3 className="font-semibold text-lg md:text-xl">Wireless Headphones</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">High-quality sound</p>
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
                <h4 className="font-semibold text-base md:text-lg">$79.99</h4>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}