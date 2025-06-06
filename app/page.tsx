import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="p-4 my-2 rounded-md border-b leading-8">
        <div className="font-bold">Natural Language Processing (NLP)</div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores incidunt asperiores omnis inventore deleniti fugit est unde suscipit maxime sint perspiciatis natus corrupti architecto, ducimus eos porro provident nemo hic?
        </div>
        <div className="flex gap-4 mt-4 justify-end">
          <Link className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest" href={"/edit/2"}>Edit</Link>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
