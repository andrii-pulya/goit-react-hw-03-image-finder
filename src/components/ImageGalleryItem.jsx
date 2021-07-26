export default function ImageGalleryItem({ pictures }) {
  return (
    <>
      {pictures.map((picture) => (
        <li key={picture.id} className="ImageGalleryItem">
          <img
            src={picture.webformatURL}
            alt={picture.tags}
            className="ImageGalleryItem-image"
          />
        </li>
      ))}
    </>
  )
}
