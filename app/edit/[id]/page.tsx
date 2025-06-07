"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
export default function EditPage({ params }: { params: Promise<{ id: string }> }) { 
    const [formData, setFormData] = useState({ term: "", interpretation: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async() => {
            const { id } = await params; 
            try {
                const response = await fetch(`/api/interpretations/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch interpretation");
                }
                const data = await response.json();
                setFormData({term : data.interpretation.term, interpretation: data.interpretation.interpretation});
            } catch (error) {
                console.error("Failed to fetch interpretation:", error);
                setError("Failed to fetch interpretation. Please try again later.");
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        })); 
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.term || !formData.interpretation) {
            setError("Please fill in all fields.");
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const { id } = await params;
            const response = await fetch(`/api/interpretations/${id}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Failed to update interpretation");
            }
            router.push("/"); 
        } catch (error) {
            console.error("Failed to update interpretation:", error);
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    return <div>
        <h2 className="text-2xl font-bold my-8">
            Edit Interpretation
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
            <input className="py-1 px-4 border rounded-md" type="text" name="term" placeholder="Term" value={formData.term} onChange={handleInputChange} />
            <textarea name="interpretation" rows={4} placeholder="Interpretation" className="py-1 px-4 border rounded-md resize-none" value={formData.interpretation} onChange={handleInputChange}></textarea>
            <button className="bg-black text-white"  disabled={isLoading}> {isLoading ? "Updating..." : "Update Interpretation"}</button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
}