import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageGalleryExpandButton } from './ImageExpand'

type GalleryImage = {
  src: string
  alt: string
  caption: string
}

type ProjectGalleryProps = {
  images: readonly GalleryImage[]
  label: string
}

export function ProjectGallery({ images, label }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex]

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length)
  }

  return (
    <div className="project-gallery" aria-label={label}>
      <figure className="project-gallery-stage">
        <img
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          width="1040"
          height="600"
          loading="lazy"
          decoding="async"
        />
        <button
          className="project-gallery-arrow project-gallery-previous"
          type="button"
          onClick={showPrevious}
          aria-label="Mostrar imagem anterior"
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          className="project-gallery-arrow project-gallery-next"
          type="button"
          onClick={showNext}
          aria-label="Mostrar próxima imagem"
        >
          <ChevronRight aria-hidden="true" />
        </button>
        <ImageGalleryExpandButton
          images={images.map((image) => ({ src: image.src, alt: image.alt }))}
          startIndex={activeIndex}
        />
        <figcaption className="project-gallery-live" aria-live="polite">
          Imagem {activeIndex + 1} de {images.length}. {activeImage.caption}
        </figcaption>
      </figure>
    </div>
  )
}
