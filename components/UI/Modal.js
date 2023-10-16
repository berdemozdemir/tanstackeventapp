export default function Modal({ children, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-20">
      <div
        className="bg-black bg-opacity-50 w-full h-full z-[9]"
        onClick={onClose}
      ></div>

      <dialog open className="w-[30rem] z-10 rounded">
        {children}
      </dialog>
    </div>
  );
}
