// Generated by Wrangler by running `wrangler types`

interface Env {
	CACHE: KVNamespace;
	PUBLIC_CDN_URL: string;
	STORAGE: R2Bucket;
	DB: D1Database;
	QUEUE: Queue;
}
