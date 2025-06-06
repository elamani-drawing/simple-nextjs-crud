export default function CreatePage() {
    return <div>
        <h2 className="text-2xl font-bold my-8">
            Add New Interpretation
        </h2>
        <form action="" className="flex gap-3 flex-col">
            <input className="py-1 px-4 border rounded-md" type="text" name="term" placeholder="Term" />
            <textarea name="interpretation" rows={4} placeholder="Interpretation" className="py-1 px-4 border rounded-md resize-none"></textarea>
            <button className="bg-black text-white"> Add Interpretation</button>
        </form>
    </div>
}