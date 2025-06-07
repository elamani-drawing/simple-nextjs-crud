import { NextResponse } from "next/server";
import { db } from "./db";

async function createInterpretation(data: {
    term: string,
    interpretation: string
}) {
    try {
        // const response = await  fetch('https://api.example.com/interpretations', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // });
        console.log("Creating interpretation with data:", data);
        return db.add(data);
    } catch (error){
        console.error("Error creating interpretation:", error);
        throw new Error("Failed to create interpretation");
    }
}

async function fetchInterpretation() {
    try {
        return db.fetchAll();
    } catch (error){
        console.error("Error fetching interpretation:", error);
        throw new Error("Failed to fetch interpretation");
    }
}

export async function POST(request: Request) {
    const data   = await request.json();
    try {
        const interpretation = await createInterpretation(data);
        return NextResponse.json({messgae:"Interpretation created", status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to create interpretation", status: 500 });
    }
}

export async function GET() { 
    try {
        const interpretations = await fetchInterpretation();
        return NextResponse.json({interpretations, status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to create interpretation", status: 500 });
    }
}