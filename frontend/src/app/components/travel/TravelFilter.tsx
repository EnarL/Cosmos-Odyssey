import React from 'react';

interface DropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    disabled?: boolean;
    placeholder: string;
}

const Dropdown: React.FC<DropdownProps> = ({
                                               value,
                                               onChange,
                                               options,
                                               disabled = false,
                                               placeholder,
                                           }) => (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full sm:w-44 border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
            transition-shadow duration-200 shadow-sm hover:shadow-md`}
    >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
            <option key={index} value={option}>
                {option}
            </option>
        ))}
    </select>
);

interface TravelFilterProps {
    searchFrom: string;
    setSearchFrom: (value: string) => void;
    searchTo: string;
    setSearchTo: (value: string) => void;
    searchCompany: string;
    setSearchCompany: (value: string) => void;
    fromOptions: string[];
    toOptions: string[];
    companyOptions: string[];
}

const TravelFilter: React.FC<TravelFilterProps> = ({
                                                       searchFrom,
                                                       setSearchFrom,
                                                       searchTo,
                                                       setSearchTo,
                                                       searchCompany,
                                                       setSearchCompany,
                                                       fromOptions,
                                                       toOptions,
                                                       companyOptions,
                                                   }) => (
    <div className="flex flex-wrap gap-5 mb-6">
        <Dropdown
            value={searchFrom}
            onChange={setSearchFrom}
            options={fromOptions}
            disabled={searchTo !== ''}
            placeholder="From..."
        />
        <Dropdown
            value={searchTo}
            onChange={setSearchTo}
            options={toOptions}
            disabled={searchFrom === ''}
            placeholder="To..."
        />
        <Dropdown
            value={searchCompany}
            onChange={setSearchCompany}
            options={companyOptions}
            placeholder="Company..."
        />
    </div>
);

export default TravelFilter;
