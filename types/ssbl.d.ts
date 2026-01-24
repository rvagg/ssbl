/**
 * Load and process all markdown files from a directory
 * @param {string} postsDir - Path to directory containing markdown files
 * @returns {Promise<Post[]>} Array of posts sorted by date descending, drafts excluded
 */
export default function ssbl(postsDir: string): Promise<Post[]>;
export type PostSpec = {
    date: Date;
    draft?: boolean | undefined;
    title?: string | undefined;
    author?: string | undefined;
    name?: string | undefined;
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
//# sourceMappingURL=ssbl.d.ts.map