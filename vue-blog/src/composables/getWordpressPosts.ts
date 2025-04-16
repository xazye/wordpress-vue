import { ref } from 'vue';
import { fetchData } from '../utils/utils';
import type { WordPressPostData,WPMediaData } from '../types/wordpressTypes'
const WP_API_BASE_URL = '/wp-api'

export function useGetWordrpessPostsApi() {
    const posts = ref<WordPressPostData[] | null>(null);
    const loadingPosts = ref(false);
    const errorPosts = ref<Error | null>(null);

    // State for a single post
    const post = ref<WordPressPostData | null>(null);
    const loadingPost = ref(false);
    const errorPost = ref<Error | null>(null);

    // State for media item
    const media = ref<WPMediaData | null>(null);
    const loadingMedia = ref(false);
    const errorMedia = ref<Error | null>(null);

    const fetchPosts = async () => {
        loadingPosts.value = true;
        try {
            const data = await fetchData<WordPressPostData[]>(`${WP_API_BASE_URL}/posts`);
            posts.value = data;
        } catch (err) {
            console.error("Failed to fetch posts:", err);
            errorPosts.value = err instanceof Error ? err : new Error('An unknown error occurred fetching posts');
        } finally {
            loadingPosts.value = false;
        }
    }
    const fetchPostBySlug = async (slug:string)=>{
        loadingPost.value = true;
        try{
            const data = await fetchData<WordPressPostData[]>(`${WP_API_BASE_URL}/posts?slug=${slug}`)
            if (data && data.length > 0){
                post.value = data[0];
            }else {
                post.value = null
            }
        }  catch (err) {
            console.error(`Failed to fetch post with slug ${slug}:`, err);
            errorPost.value = err instanceof Error ? err : new Error(`An unknown error occurred fetching post ${slug}`);
          } finally {
            loadingPost.value = false;
          }
    }
    return {
        posts,
        loadingPosts,
        errorPosts,

        post,
        loadingPost,
        errorPost,

        media,
        loadingMedia,
        errorMedia,

        fetchPosts,
        fetchPostBySlug
    };
}