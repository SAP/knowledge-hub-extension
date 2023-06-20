import type { Memento } from 'vscode';
import type {
    StorageSettings,
    AppFilters,
    BlogFiltersEntry,
    TutorialsTagWithTitle
} from '@sap/knowledge-hub-extension-types';

/**
 * Storage class is a wrapper for VSCode storage.
 */
export class Storage implements StorageSettings {
    private readonly storage: Memento;

    // Storage key
    private readonly key: string;

    // Settings object from storage
    private readonly data: StorageSettings;

    /**
     * Initializes class properties.
     *
     * @param {Memento} storage - VSCode storage
     * @param {string} subPath - Storage key
     */
    constructor(storage: Memento, subPath: string) {
        this.storage = storage;
        this.key = subPath;
        this.data = this.storage.get(this.key) ?? {};
    }

    /**
     * Private method which updates storage wwith latest values.
     */
    private async updateSettings(): Promise<void> {
        await this.storage.update(this.key, this.data);
    }

    /**
     * Getter for property 'appFilters'.
     *
     * @returns {AppFilters} Value of 'AppFilters' property.
     */
    public get appFilters(): AppFilters {
        const filters: AppFilters | undefined = this.data.appFilters;
        return {
            blogs: filters?.blogs !== undefined ? filters.blogs : [],
            tutorials: filters?.tutorials !== undefined ? filters.tutorials : []
        };
    }

    /**
     * Setter for property 'AppFilters'.
     *
     * @param {string} name Sidebar name.
     * @param {BlogFiltersEntry[] | TutorialsTagWithTitle []} entry AppFilters value.
     */
    public async setFilters(
        name: keyof AppFilters,
        entry: BlogFiltersEntry[] | TutorialsTagWithTitle[]
    ): Promise<void> {
        this.data.appFilters = {
            ...this.appFilters,
            [name]: entry
        };
        await this.updateSettings();
    }

    /**
     * Getter for property 'blogs AppFilters'.
     *
     * @returns {BlogFiltersEntry[]} Value of AppFilters 'blogs' property.
     */
    public getBlogsFilters(): BlogFiltersEntry[] {
        const filters: AppFilters | undefined = this.data.appFilters;
        return filters?.blogs !== undefined ? filters.blogs : [];
    }

    /**
     * Getter for property 'tutorials AppFilters'.
     *
     * @returns {TutorialsTagWithTitle[]} Value of AppFilters 'tutorials' property.
     */
    public getTutorialsFilters(): TutorialsTagWithTitle[] {
        const filters: AppFilters | undefined = this.data.appFilters;
        return filters?.tutorials !== undefined ? filters.tutorials : [];
    }
}
