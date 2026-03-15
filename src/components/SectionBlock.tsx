import type { CSSProperties, ReactNode, Ref } from "react";
import BlobBackground from "../BlobBackground";

type BlobConfig = {
  backgroundColor: string;
  blobColor: string;
  blobCount: number;
  blobSize: number;
  blobComplexity: number;
  blobSpeed: number;
  strokeOpacity: number;
};

type SectionBlockProps = {
  id: string;
  sectionRef?: Ref<HTMLElement>;
  className?: string;
  style?: CSSProperties;
  blob: BlobConfig;
  children: ReactNode;
};

export default function SectionBlock({
  id,
  sectionRef,
  className,
  style,
  blob,
  children,
}: SectionBlockProps) {
  return (
    <section
      id={id}
      ref={sectionRef}
      className={className ? `content-section ${className}` : "content-section"}
      style={{ position: "relative", zIndex: 1, ...style }}
    >
      <BlobBackground
        backgroundColor={blob.backgroundColor}
        blobColor={blob.blobColor}
        blobCount={blob.blobCount}
        blobSize={blob.blobSize}
        blobComplexity={blob.blobComplexity}
        blobSpeed={blob.blobSpeed}
        strokeOpacity={blob.strokeOpacity}
      />
      {children}
    </section>
  );
}
