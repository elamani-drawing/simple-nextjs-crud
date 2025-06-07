export interface Interpretation {
    term: string;
    interpretation: string;
}
// Simulating a database with an in-memory Map for demonstration purposes
export class Database {
    private data = new Map<string, Interpretation>();
    constructor() {
        // Pre-populating with some data
        this.data.set("exampleTerm", { term: "exampleTerm", interpretation: "This is an example interpretation." });
        this.data.set("anotherTerm", { term: "anotherTerm", interpretation: "This is another example interpretation." });
    }

    add(interpretation: Interpretation): void {
        this.data.set(interpretation.term, interpretation);
    }
    edit(key: string, interpretation: Interpretation): void {
        this.del(key);
        this.add(interpretation);
    }
    get(key: string): Interpretation | undefined {
        return this.data.get(key);
    }
    del(key: string): void {
        if (!this.data.delete(key)) {
            throw new Error("Interpretation not found");
        }
    }
    fetchAll(): Interpretation[] {
        return Array.from(this.data.values());
    }

}

export const db = new Database();