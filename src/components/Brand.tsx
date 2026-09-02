import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="AIOC home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>AIOC</span>
    </Link>
  );
}
