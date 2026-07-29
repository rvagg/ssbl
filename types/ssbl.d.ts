export type PostSpec = {
    date: Date;
    draft?: boolean;
    title?: string;
    author?: string;
    name?: string;
};
export type Post = {
    /**
     * - The parsed JSON metadata
     */
    spec: PostSpec;
    /**
     * - The rendered HTML content
     */
    page: string;
};
/**
 * Load and process all markdown files from a directory
 * @param {string} postsDir - Path to directory containing markdown files
 * @returns {Promise<Post[]>} Array of posts sorted by date descending, drafts excluded
 */
export default function ssbl(postsDir: string): Promise<Post[]>;
//# sourceMappingURL=ssbl.d.ts.map