import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

type ImageExpandButtonProps = {
  src: string
  alt: string
}

type ImageGalleryExpandProps = {
  images: { src: string; alt: string }[]
  startIndex?: number
}

export function ImageExpandButton({ src, alt }: ImageExpandButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  return (
    <>
      <button className="image-expand-button" type="button" onClick={openDialog} aria-label={`Ampliar imagem: ${alt}`} title="Ampliar imagem">
        <Maximize2 aria-hidden="true" />
      </button>
      <dialog
        ref={dialogRef}
        className="image-lightbox"
        aria-label={`Visualização ampliada: ${alt}`}
        onClick={(event) => {
          if (event.currentTarget === event.target) closeDialog()
        }}
      >
        <div className="image-lightbox-content">
          <button className="image-lightbox-close" type="button" onClick={closeDialog} aria-label="Fechar imagem ampliada">
            <X aria-hidden="true" />
          </button>
          <img src={src} alt={alt} />
        </div>
      </dialog>
    </>
  )
}

export function ImageGalleryExpandButton({ images, startIndex = 0 }: ImageGalleryExpandProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex]

  const openDialog = () => {
    setActiveIndex(startIndex)
    dialogRef.current?.showModal()
  }
  const closeDialog = () => dialogRef.current?.close()

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length)
  }
  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length)
  }

  return (
    <>
      <button className="image-expand-button" type="button" onClick={openDialog} aria-label={`Ampliar galeria: ${activeImage.alt}`} title="Ampliar imagem">
        <Maximize2 aria-hidden="true" />
      </button>
      <dialog
        ref={dialogRef}
        className="image-lightbox"
        aria-label="Visualização ampliada da galeria"
        onClick={(event) => {
          if (event.currentTarget === event.target) closeDialog()
        }}
      >
        <div className="image-lightbox-content image-lightbox-gallery">
          <button className="image-lightbox-close" type="button" onClick={closeDialog} aria-label="Fechar imagem ampliada">
            <X aria-hidden="true" />
          </button>
          <button className="image-lightbox-nav image-lightbox-nav-prev" type="button" onClick={showPrevious} aria-label="Imagem anterior">
            <ChevronLeft aria-hidden="true" />
          </button>
          <img key={activeImage.src} src={activeImage.src} alt={activeImage.alt} />
          <button className="image-lightbox-nav image-lightbox-nav-next" type="button" onClick={showNext} aria-label="Próxima imagem">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </>
  )
}

export function ExpandableApplicationImage({ src, alt }: ImageExpandButtonProps) {
  return (
    <div className="application-image-frame">
      <img src={src} alt={alt} className="application-diagram" loading="lazy" decoding="async" />
      <ImageExpandButton src={src} alt={alt} />
    </div>
  )
}
