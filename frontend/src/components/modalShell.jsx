import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/* Dialog frame shared by the health-information pages.
   - rendered in <body> (a portal) so page animations can never trap or hide it
   - closes on Escape or when the dark backdrop is clicked
   - locks page scrolling while open
   - moves focus into the dialog when it opens */
function ModalShell({ onClose, label, width = 880, className = '', children }) {
  const boxRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') closeRef.current(); };
    document.addEventListener('keydown', onKey);
    if (boxRef.current) boxRef.current.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return createPortal(
    <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        ref={boxRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={'lm-box ' + className}
        style={{ maxWidth: width }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export default ModalShell;
