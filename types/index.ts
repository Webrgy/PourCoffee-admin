export {}

declare global {
    type AdminRole = "moderator" | "director" | ""

    interface Admin {
        first_name: String,
        last_name: String,
        email: String,
        password: String
    }

    interface MetaPages {
        current_page: number;
        next_page: number;
        last_page: number,
        total_count: number
    }
}
