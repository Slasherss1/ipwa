export interface MenuStats {
    name: string;
    type: "soup" | "other" | "kol" | "sn" | "ob" | "cd" | "dr";
    value: {
        count: number;
        rating: number;
        tags: Record<string, number>;
        comments: string[];
    };
}
