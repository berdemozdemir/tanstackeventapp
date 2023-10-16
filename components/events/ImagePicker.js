export default function ImagePicker({ images, onSelect, selectedImage }) {
  return (
    <div>
      <p className="font-bold text-sm mt-4 mb-1 text-[#3c4249] uppercase">
        Select an image
      </p>
      <ul className="p-0 m-0 flex gap-2">
        {images.map((image) => {
          return (
            <li
              key={image.path}
              onClick={() => onSelect(image.path)}
              className={`w-16 h-12 border-2 overflow-hidden rounded ${
                selectedImage === image.path ? "border-[#e30d7c]" : ""
              }`}
            >
              <img
                className="w-full h-full object-cover"
                src={`http://localhost:3000/${image.path}`}
                alt={image.caption}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
