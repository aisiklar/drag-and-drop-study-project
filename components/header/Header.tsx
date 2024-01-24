import Link from "next/link";

export default function Header() {
  return (
    <section className="w-full bg-slate-600 py-5 ">
      <Link
        className="text-white hover:no-underline hover:font-semibold hover:text-white visited:no-underline focus:no-underline focus:text-white"
        href={"/"}
      >
        Home
      </Link>
    </section>
  );
}
