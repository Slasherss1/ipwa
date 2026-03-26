export interface MenuStats {
    name: string;
    type: "soup" | "other" | "kol" | "sn" | "ob" | "cd" | "dr";
    value: {
        rating: number;
        tags: Record<string, number>;
        comments: string[];
    };
}
