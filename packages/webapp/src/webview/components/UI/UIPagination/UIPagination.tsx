import React from 'react';
import type { ReactPaginateProps } from 'react-paginate';
import ReactPaginate from 'react-paginate';

import './UIPagination.scss';

export { ReactPaginateProps as UIPaginationProps };

export interface UIPaginationSelected {
    selected: number;
}
/**
 * UIPagination component
 * based on https://github.com/AdeleD/react-paginate
 *
 * @class UIPagination
 * @extends {React.Component<ReactPaginateProps, {}>}
 */
export class UIPagination extends React.Component<ReactPaginateProps> {
    /**
     * Initializes component properties.
     *
     * @param {ReactPaginateProps} props The props
     */
    public constructor(props: ReactPaginateProps) {
        super(props);
    }

    /**
     * Render the coomponent.
     *
     * @returns {JSX.Element} return a rendered component
     */
    render(): JSX.Element {
        return (
            <ReactPaginate
                {...this.props}
                hrefAllControls={true}
                breakLabel="&#8230;"
                containerClassName="ui-pagination"
                breakClassName="ui-pagination-page__break"
                breakLinkClassName="ui-pagination-page__break__anchor"
                pageClassName="ui-pagination-page__li"
                pageLinkClassName="ui-pagination-page__li__anchor"
                activeClassName="ui-pagination-page__active"
                activeLinkClassName="ui-pagination-page__active__anchor"
                previousClassName="ui-pagination-page__li"
                nextClassName="ui-pagination-page__li"
                previousLinkClassName="ui-pagination-page__li__anchor"
                nextLinkClassName="ui-pagination-page__li__anchor"
                disabledClassName="ui-pagination-page__disabled"
                disabledLinkClassName="ui-pagination-page__disabled__anchor"
            />
        );
    }
}
