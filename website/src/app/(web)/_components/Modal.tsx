import { useRef, ReactNode, useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  title: string;
  children: ReactNode;
};

const Modal = ({ open, title, children, onClose }: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open, onClose]);

  return (
    <dialog className="modal" ref={ref}>
      <div className="modal-box md:w-screen md:max-w-[720px]">
        <form method="dialog" onSubmit={() => onClose?.()}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{children}</p>
      </div>
    </dialog>
  );
};

export default Modal;
