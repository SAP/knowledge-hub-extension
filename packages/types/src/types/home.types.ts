import type { TutorialsState } from './tutorials.types';
import type { BlogsState, BlogsManagedTag } from './blogs.types';

export interface HomeBlogs {
    blogs: BlogsState;
    tags: BlogsManagedTag[];
}

export interface Home {
    tutorials: TutorialsState;
    blogs: HomeBlogs;
}
