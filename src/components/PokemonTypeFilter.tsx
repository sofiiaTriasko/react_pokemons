import React from 'react';
import classNames from 'classnames';
import { FilterValue } from '../utils/FilterValue';
import '../styles/PokemonTypeFilter.scss';

type Props = {
    setFilterValue: (filterValue: FilterValue) => void;
    filterValue: FilterValue;
};

export const PokemonCardFilter: React.FC<Props> = ({ setFilterValue, filterValue}: Props) => {
    const createFilterLink = (label: string, value: FilterValue) => (
        <a
            href={`#/${value}/?limit=9&offset=9`}
            className={classNames('filter__link', `filter__link-${value}`, {
                selected: filterValue === value,
            })}
            onClick={() => setFilterValue(value)}
        >
            {label}
        </a>
    );

    return (
        <nav className="filter">
            {createFilterLink('All', FilterValue.All)}
            {createFilterLink('Water', FilterValue.Water)}
            {createFilterLink('Fire', FilterValue.Fire)}
            {createFilterLink('Grass', FilterValue.Grass)}
            {createFilterLink('Poison', FilterValue.Poison)}
            {createFilterLink('Flying', FilterValue.Flying)}
            {createFilterLink('Bug', FilterValue.Bug)}
            {createFilterLink('Normal', FilterValue.Normal)}
            {createFilterLink('Electric', FilterValue.Electric)}
            {createFilterLink('Ground', FilterValue.Ground)}
        </nav>
    );
};
