import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function ResponseSection({
  el,
  chunks,
}: {
  el: { isNew: boolean; chat_response: string };
  chunks: string;
}) {
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const handleCopyClick = () => {
    try {
      if (textRef.current) {
        const range = document.createRange();
        range.selectNodeContents(textRef.current);

        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
          document.execCommand("copy");
          selection.removeAllRanges();
        }
      }
    } catch (error) {
      throw new Error(
        "Unable to copy response please you can select text and press Clt + C"
      );
    }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: "13%" },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: "easeInOut" },
          },
        }}
        className="w-[80%] m-auto bg-black text-white p-5 rounded-lg mt-5"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
        }}
      >
        <p
          className="p-3"
          ref={textRef as React.RefObject<HTMLParagraphElement>}
        >
          {!el.isNew ? el.chat_response : chunks}
        </p>

        <button
          onClick={handleCopyClick}
          className="copy absolute top-2 right-2  copy-button"
        >
          <span
            data-text-end="Copied!"
            data-text-initial="Copy to clipboard"
            className="tooltip"
          ></span>
          <span>
            <svg
              xmlSpace="preserve"
              viewBox="0 0 6.35 6.35"
              y="0"
              x="0"
              height="20"
              width="20"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="clipboard"
            >
              <g>
                <path
                  fill="currentColor"
                  d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                ></path>
              </g>
            </svg>
            <svg
              xmlSpace="preserve"
              viewBox="0 0 24 24"
              y="0"
              x="0"
              height="18"
              width="18"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="checkmark"
            >
              <g>
                <path
                  data-original="#000000"
                  fill="currentColor"
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                ></path>
              </g>
            </svg>
          </span>
        </button>
      </motion.div>
    </>
  );
}
