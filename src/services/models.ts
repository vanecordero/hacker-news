export interface Hits {
    id: number,
    created_at: string,
    author: string,
    title: string,
    url: string,
    text: string,
    points: number,
    parent_id: number,
    children: any,
    comment_text: string,
    num_comments: any,
    objectID: number,
    story_id: number,
    story_text: string,
    story_title: string,
    story_url: string
}

export interface Resp{
    hits: Hits[],
    nbHits: number,
    page: number,
    nbPages: number,
    hitsPerPage: number,
    exhaustiveNbHits: boolean,
    exhaustiveTypo: boolean,
    query: string,
    params: string,
    processingTimeMS: number
}