import type { TutorialsState, TutorialsTags } from './tutorials.types';
import type { BlogsState, BlogsManagedTag } from './blogs.types';

export interface HomeBlogs {
    blogs: BlogsState;
    tags: BlogsManagedTag[];
}

export interface HomeTutorials {
    tutorials: TutorialsState;
    tags: TutorialsTags;
}
export interface Home {
    tutorials: HomeTutorials;
    blogs: HomeBlogs;
}
