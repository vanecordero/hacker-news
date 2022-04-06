// API DATA RESPONSE CLEAN
export interface INewObj{
        author:string;
        story_title:string;
        created_at:string;
        story_url:string;
        story_id: number;
}
export interface newsContainer{
    news: INewObj[]
}
// NEWS CONTEXT TYPES
export type NewsContextState = {
    news: INewObj[];
    setNewNews: (newsObj: INewObj[]) => void;
    page: number;
    setNewPage: (page: number)=> void;
};
// FAVORITE NEWS
export interface favesNews{
    faves: INewObj | INewObj[];
}

// API DATA RESPONSE
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