"use client";

import { useState, ReactNode } from "react";
import Modal from "../../_components/Modal";
import Image from "next/image";

const gallery = ["/banner/banner1.webp", "/banner/banner2.webp", "/banner/banner3.webp", "/banner/banner4.webp"];

const GalleryPage = () => {
  const [modal, setModal] = useState(-1);

  return (
    <>
      <div className="text-4xl text-center mb-4">Galeri</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((item, index) => (
          <div key={index} onClick={() => setModal(index)} role="button" className="cursor-pointer">
            <Image
              sizes="100vw"
              width={0}
              height={0}
              style={{ height: "auto", width: "100%" }}
              className="h-auto max-w-full rounded-lg"
              src={item}
              alt=""
            />
          </div>
        ))}
        <Modal open={modal > -1} onClose={() => setModal(-1)} title="Galeri">
          {modal > -1 && (
            <Image
              width={200}
              height={100}
              sizes="100vw"
              style={{ height: "auto", width: "100%" }}
              className="h-auto max-w-full rounded-lg"
              src={gallery[modal]}
              alt=""
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default GalleryPage;
