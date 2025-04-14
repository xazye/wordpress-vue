// Define an interface for the Page structure (adjust based on actual API response)
export interface WPPageData {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    featured_media?: number; // Optional featured media ID
    excerpt?: { rendered: string }; // Optional excerpt
    _embedded?: {
        'wp:featuredmedia'?: WPMediaData[]; 
    };
}

export interface WPMediaData {
    id: number;
    source_url: string; // URL of the image
    alt_text: string; 
    description?: { rendered: string }; 
}
export interface WordPressPostData {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
      rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
      protected: boolean;
    };
    excerpt: {
      rendered: string;
      protected: boolean;
    };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: {
      footnotes: string;
      [key: string]: any;
    };
    categories: number[];
    tags: number[];
    class_list: string[];
    _links: {
      self: Array<{
        href: string;
        targetHints?: {
          allow: string[];
        };
      }>;
      collection: Array<{
        href: string;
      }>;
      about: Array<{
        href: string;
      }>;
      author: Array<{
        embeddable: boolean;
        href: string;
      }>;
      replies?: Array<{
        embeddable: boolean;
        href: string;
      }>;
      "version-history"?: Array<{
        count: number;
        href: string;
      }>;
      "predecessor-version"?: Array<{
        id: number;
        href: string;
      }>;
      "wp:attachment": Array<{
        href: string;
      }>;
      "wp:term": Array<{
        taxonomy: string;
        embeddable: boolean;
        href: string;
      }>;
      curies: Array<{
        name: string;
        href: string;
        templated: boolean;
      }>;
      [key: string]: any;
    };
  }
  