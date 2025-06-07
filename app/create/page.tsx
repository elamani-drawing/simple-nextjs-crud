'use client';
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function CreatePage() {
    const [formData, setFormData] = useState({ term: "", interpretation: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

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
            const response = await fetch("/api/interpretations", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Failed to create interpretation");
            }
            router.push("/"); 
        } catch (error) {
            console.error("Failed to add interpretation:", error);
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    return <div>
        <h2 className="text-2xl font-bold my-8">
            Add New Interpretation
        </h2>
        <form className="flex gap-3 flex-col" onSubmit={handleSubmit}>
            <input className="py-1 px-4 border rounded-md" type="text" name="term" placeholder="Term" value={formData.term}
                onChange={handleInputChange} />
            <textarea name="interpretation" rows={4} placeholder="Interpretation" className="py-1 px-4 border rounded-md resize-none"
                value={formData.interpretation}
                onChange={handleInputChange}
            ></textarea>
            <button className="bg-black text-white"  disabled={isLoading}> {isLoading ? "Adding..." : "Add Interpretation"}</button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
}