'use client' ;
import Link from "next/link";
import { useEffect, useState } from "react";

interface Interpretation {
  term: string;
  interpretation: string;
}

export default function Home() {
  const [interpretations, setInterpretations] = useState<Interpretation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterpretations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/interpretations");
        if (!response.ok) {
          throw new Error("Failed to fetch interpretations");
        }
        const data = await response.json();
        setInterpretations(data.interpretations);
      } catch (error) {
        console.error("Failed to fetch interpretations:", error);
        setError("Failed to fetch interpretations");
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchInterpretations();
  }, []);

  const handleDeleteInterpretation = async (term: string) => {
    try {
      const response = await fetch(`/api/interpretations/${term}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete interpretation");
      }
      setInterpretations((prev) => prev?.filter(interpretation => interpretation.term !== term));
    }
    catch (error) {
      console.error("Failed to delete interpretation:", error);
      setError("Failed to delete interpretation. Please try again later.");
    }
  }

  return (
    <div>
      {error && <p className="py-4 text-red-500 ">{error}</p>}
      {isLoading ? (<p className="py-4">Loading interpretations...</p>
      ) : interpretations?.length > 0 ? (
        <div className="p-4 my-2 rounded-md border-b leading-8">
          {
            interpretations?.map(interpretation => (
              <div key={interpretation.term} className="p-4 my-2 rounded-md border-b leading-8">
                <div className="font-bold">{interpretation.term}</div>
                <div>
                  {interpretation.interpretation}
                </div>
                <div className="flex gap-4 mt-4 justify-end">
                  <Link className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest" href={`/edit/${interpretation.term}`}>Edit</Link>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest cursor-pointer" onClick={() => handleDeleteInterpretation(interpretation.term)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      ) : (
        <p>No interpretation found</p>
      )
      }
    </div>
  );
}
