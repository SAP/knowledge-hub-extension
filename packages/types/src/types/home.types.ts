import type { TutorialsState } from './tutorials.types';
import type { BlogsState } from './blogs.types';

export interface Home {
    tutorials: TutorialsState;
    blogs: BlogsState;
}
