import gsap from "gsap";
import { SplitText } from "gsap/all";

export const ElasticAnimation = (ref) => {
    gsap.fromTo(
      ref.current,
      {
        y: -10, // Start higher
        opacity: 0,
      },
      {
        y: 0, // End at position
        opacity: 1,
        duration: 0.8,
        ease: "elastic", // Bounce effect at the end
      }
    );
  };

gsap.registerPlugin(SplitText);

export const TextUptoDownAnimation = (ref) => {
  const split = new SplitText(ref.current, { type: "words" });

  gsap.fromTo(
    split.words,
    { y: -50, opacity: 0, stagger: 0.2, ease: 'power3.in' },         // FROM: move up and invisible
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' } // TO: original position
  )

  return () => split.revert(); // Optional cleanup
};

export const TextSlide = (TextRef, IconRef) => {
  gsap.fromTo(
    TextRef.current,
    { x: -50, opacity: 0 }, // Start position and opacity
    {
      x: 0, // End position
      opacity: 1, // End opacity
      duration: 0.5,
      ease: "power2.out",
    })
          gsap.fromTo(IconRef.current, {
            x: 20,
            opacity: 0,
          }, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
}

export const rotationAnimation = (ref, boolean) => {
  if (boolean) {
    gsap.fromTo(
    ref.current,
    { rotation: 0 },
    {
      rotation: 360, 
      duration: 2,
      ease: "sine.inOut",
    }
  );
  }
}

export const textAnimation = (
  textRef: React.RefObject<HTMLElement>,
  iconRef: React.RefObject<HTMLElement>
) => {
  const handleEnter = () => {
    if (!iconRef.current || !textRef.current) return;

    gsap.to(iconRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.in",
    });

    gsap.to(textRef.current, {
      x: 15, // use x instead of translateX for GSAP shorthand
      duration: 0.5,
      ease: "power1.in",
    });
  };

  const handleLeave = () => {
    if (!iconRef.current || !textRef.current) return;

    gsap.to(iconRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
    });

    gsap.to(textRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power1.out",
    });
  };

  return { handleEnter, handleLeave };
};
