import Link from "next/link";

export default function Header() {
  return (
    <section className="bg-slate-600 py-3">
      <div className="ml-2  ">
        <Link
          className="text-white hover:no-underline hover:font-semibold hover:text-white visited:no-underline focus:no-underline focus:text-white"
          href={"/"}
        >
          Home
        </Link>
      </div>
    </section>
  );
}
