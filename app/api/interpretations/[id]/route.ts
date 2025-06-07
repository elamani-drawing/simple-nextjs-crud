import { NextResponse } from "next/server";
import { db, Interpretation } from "../db";

async function updateInterpretation(id: string, data: Interpretation) {
    try {
        return db.edit(id, data);
    } catch (error) {
        console.error("Error updating interpretation:", error);
        throw new Error("Failed to update interpretation");
    }
}

async function deleteInterpretation(id: string) {
    try {
        return db.del(id);
    } catch (error) {
        console.error("Error deleting interpretation:", error);
        throw new Error("Failed to delete interpretation");
    }
}

async function fetchInterpretation(id: string) {
    try {
        return db.get(id);
    } catch (error) {
        console.error("Error fetching interpretation:", error);
        throw new Error("Failed to fetch interpretation");
    }
}


export async function GET(req: Request, { params }: { params: { id: string } }) { 
    try { 
        const { id } = await params;
        const interpretation = await fetchInterpretation(id);
        return NextResponse.json( {interpretation });
    } catch (error) {
        return NextResponse.json({ message: "Failed to get interpretation by id", status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) { 
    try {
        const id = params.id;
        await deleteInterpretation(id);
        return NextResponse.json( {message : "Interpretation deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete interpretation", status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) { 
    try {
        const id = params.id;
        const interpretation: Interpretation = await req.json();
        await updateInterpretation(id, interpretation);
        return NextResponse.json( {message : "Interpretation updated" });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update interpretation", status: 500 });
    }
}