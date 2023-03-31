import type { TutorialsState, TutorialsTags } from './tutorials.types';
import type { BlogsState } from './blogs.types';
import type { Tag } from './tags.types';

export interface HomeBlogs {
    blogs: BlogsState;
    tags: Tag[];
}

export interface HomeTutorials {
    tutorials: TutorialsState;
    tags: TutorialsTags;
}
export interface Home {
    tutorials: HomeTutorials;
    blogs: HomeBlogs;
}
