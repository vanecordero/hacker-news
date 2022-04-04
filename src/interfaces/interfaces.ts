export interface newObj{
    author:string;
    story_title:string;
    created_at:string;
    story_url:string;
    story_id: number;
}

export interface favesNews{
    faves: newObj | newObj[];
}

export type NewsContextState = {
    news: newObj[];
    setNewNews: (newsObj: newObj)=>{};
};