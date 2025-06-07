'use client';
import { Badge, Edit, Trash2 } from "lucide-react";
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
        <div>
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Your Interpretations</h2>
                <p className="text-slate-600 mt-1">
                  {interpretations.length} {interpretations.length === 1 ? "interpretation" : "interpretations"} total
                </p>
              </div>
            </div>
          </div>
          <div className="min-h-screen ">
            {
              interpretations?.map((interpretation, index) => (
                <div key={interpretation.term} className="p-4 my-2 rounded-md border-b leading-8 bg-white shadow-md rounded-lg p-6 mb-4">
                  <div className="card-header flex justify-between items-center">
                  <div className="flex justify-items-center content-center gap-3 ">
                    <span className="text-size-200 text-xl font-mono ">
                      #{index + 1}
                    </span>
                    <div className="text-xl font-bold text-slate-800 truncate">{interpretation.term}</div>
                  </div>
                  <div className="flex gap-4 ">
                    <Link className="flex justify-between hover:bg-blue-50 border-solid outline-1 hover:outline-2 hover:text-blue-600 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest" href={`/edit/${interpretation.term}`}>
                      <Edit className="h-4 w-4 mr-1" />Edit
                    </Link>
                    <button className="flex justify-between hover:bg-red-50 border-solid outline-1 hover:outline-2 hover:text-red-600 px-4 py-2 rounded-md uppercase text-sm font-bold  cursor-pointer" onClick={() => handleDeleteInterpretation(interpretation.term)}>
                      <Trash2 className="h-4 w-4 mr-1" />Delete
                    </button>
                  </div>
                  </div>
                  <div className="text-slate-600 leading-relaxed mt-4">
                    {interpretation.interpretation}
                  </div>
                </div>

              ))
            }
          </div>
        </div>
      ) : (
        <h3 className="text-lg font-semibold text-slate-600 mb-2">No interpretations found</h3>
      )
      }
    </div>
  );
}
