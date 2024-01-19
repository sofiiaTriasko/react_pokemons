import React, { useState } from 'react';
import classNames from 'classnames';
import { FilterValue } from '../utils/FilterValue';

type Props = {
    setFilterValue: (filterValue: FilterValue) => void;
    filterValue: FilterValue;
};

export const PokemonTypeFilter: React.FC<Props> = ({ setFilterValue, filterValue }: Props) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const createFilterLink = (label: string, value: FilterValue) => (
        <a
            href={`#/${value}/?limit=9&offset=9`}
            className={classNames('filter__link', `filter__link-${value}`, {
                selected: filterValue === value,
            })}
            onClick={() => {
                setFilterValue(value);
                setDropdownVisible(false); // Close the dropdown when a filter link is clicked
            }}
        >
            {label}
        </a>
    );

    return (
        <>
            <nav className={`filter ${dropdownVisible ? 'mobile-hide' : ''}`}>
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

            <div className={`dropdown ${dropdownVisible ? 'mobile-show' : 'mobile-hide'}`}>
                <button onClick={toggleDropdown} className="dropdown__button">
                    Filter
                </button>
                <div className={`dropdown__content ${dropdownVisible ? 'mobile-show' : ''}`}>
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
                </div>
            </div>
        </>
    );
};
