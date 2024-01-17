import Image from "next/image";

import { topics } from "../constants";
import Link from "next/link";

export default function Home() {
  let style_Link =
    "hover:no-underline hover:font-semibold hover:text-black visited:no-underline focus:no-underline focus:text-black";

  return (
    <section className="m-2">
      <h1>Drag and Drop Exercise Topics:</h1>

      {topics.map((topic: Topic, index: number) => (
        <article
          key={index}
          className="rounded bg-slate-400 p-2 my-2 w-[300px] text-black"
        >
          <Link className={style_Link} href={`/${topic.link}`}>
            {topic.topicName}
          </Link>
        </article>
      ))}
    </section>
  );
}
