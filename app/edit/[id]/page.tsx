"use client";
import { Edit, Lightbulb, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const [formData, setFormData] = useState({ term: "", interpretation: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { id } = await params;
            try {
                const response = await fetch(`/api/interpretations/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch interpretation");
                }
                const data = await response.json();
                setFormData({ term: data.interpretation.term, interpretation: data.interpretation.interpretation });
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

    return <div className="flex flex-col shadow-md rounded-mg">
        <div className="text-2xl my-8 p-6 pb-0">
            <h2 className="flex items-center font-bold gap-2 text-2xl">
                <Lightbulb className="color-black h-6 w-6 text-blue-600" />
                Update Interpretation
            </h2>
            <div className="description text-base mt-2">Update the technical term and its interpretation</div>
        </div>
        <div className="content bg-white p-6">
            <form onSubmit={handleSubmit} className="flex gap-3 flex-col  space-y-6 bg-white">
                <input className="py-1 px-4 border rounded-md" type="text" name="term" placeholder="Term" value={formData.term} onChange={handleInputChange} />
                <textarea name="interpretation" rows={4} placeholder="Interpretation" className="py-1 px-4 border rounded-md resize-none" value={formData.interpretation} onChange={handleInputChange}></textarea>
                <button className="flex justify-center text-black hover:bg-blue-50 border-solid outline-1 hover:outline-2 hover:text-blue-600 px-4 pt-2 py-2 font-bold text-base cursor-pointer outline-1 rounded-lg" disabled={isLoading}>
                    <Edit className="h-5 w-5 mr-2" /> {isLoading ? "Updating..." : "Update Interpretation"}</button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    </div>
}