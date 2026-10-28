import { useEffect, useRef } from 'react';
import media from './media.js';

function CaseScreen({ screen, title }) {
  const image = media[screen.img];
  if (!image) return null;

  return (
    <figure className={`case-screen case-screen-${screen.type}`}>
      <img
        src={image.src}
        width={image.w}
        height={image.h}
        alt={`${title}: ${screen.cap}`}
        loading="lazy"
        decoding="async"
      />
      <figcaption>{screen.cap}</figcaption>
    </figure>
  );
}

export default function CaseDialog({ study, onClose }) {
  const dialogRef = useRef(null);
  const backdropPressRef = useRef(false);

  useEffect(() => {
    if (!study) return;

    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector('.case-dialog-close').focus({ preventScroll: true });

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      // History traversal can apply fragment focus after popstate. Restore on
      // the next frame so that browser default cannot clear the trigger focus.
      requestAnimationFrame(() => {
        if (dialog.open) return;
        const fallback = document.querySelector('#work h2');
        if (trigger instanceof HTMLElement && trigger !== document.body && trigger.isConnected) {
          trigger.focus({ preventScroll: true });
        } else {
          fallback?.focus({ preventScroll: true });
        }
      });
    };
  }, [study]);

  const isOutsidePanel = (event) => {
    if (event.target !== event.currentTarget) return false;
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom;
  };

  const trapFocus = (event) => {
    if (event.key !== 'Tab') return;
    const controls = Array.from(dialogRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex="0"]',
    ));
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="case-dialog"
      aria-labelledby={study ? `${study.id}-case-title` : undefined}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={trapFocus}
      onPointerDown={(event) => { backdropPressRef.current = isOutsidePanel(event); }}
      onClick={(event) => {
        if (backdropPressRef.current && isOutsidePanel(event)) onClose();
        backdropPressRef.current = false;
      }}
    >
      {study && (
        <>
          <header className="case-dialog-header">
            <div>
              <span className="eyebrow">Selected Shopify work</span>
              <h2 id={`${study.id}-case-title`}>{study.title}</h2>
            </div>
            <button type="button" className="case-dialog-close" aria-label={`Close ${study.title} case study`} onClick={onClose}>
              <span aria-hidden="true">×</span><span>Close</span>
            </button>
          </header>
          <div className="case-dialog-body">
            <ul className="tags" aria-label="Capabilities">
              {study.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <section className="case-section">
              <h3>Context</h3>
              <p>{study.context}</p>
            </section>
            {study.role && (
              <section className="case-section">
                <h3>My role</h3>
                <p>{study.role}</p>
              </section>
            )}
            <section className="case-section">
              <h3>What I built</h3>
              <ul className="case-built-list">
                {study.built.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
            {study.research && <p className="research-callout">{study.research}</p>}
            {study.gallery.length > 0 && (
              <section className="case-section case-gallery-section">
                <h3>Selected screens</h3>
                <div className="case-gallery">
                  {study.gallery.map((screen) => <CaseScreen key={screen.img} screen={screen} title={study.title} />)}
                </div>
              </section>
            )}
          </div>
        </>
      )}
    </dialog>
  );
}
