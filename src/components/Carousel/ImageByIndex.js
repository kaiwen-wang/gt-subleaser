import image1 from '@/components/Carousel/images/slide-1.jpg'
import image2 from '@/components/Carousel/images/slide-2.jpg'
import image3 from '@/components/Carousel/images/slide-3.jpg'
import image4 from '@/components/Carousel/images/slide-4.jpg'

export const images = [image1, image2, image3, image4]
const ImageByIndex = (index) => images[index % images.length]

export default ImageByIndex
