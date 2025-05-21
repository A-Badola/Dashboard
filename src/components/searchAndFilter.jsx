import { useState } from "react";
import { searchConstants } from "../constants/dashboardConstants";

export default function SearchAndFilter({
    filterChange,
    activeFilters,
    handleSearchConditionsChange
}) {

    const [searchOption, setSearchOption] = useState(searchConstants.KEYWORD);
    const [searchInput, setSearchInput] = useState('');
    
    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    }

    const handleOptionChange = (e) => {
        console.log(18, e.target.value);
        setSearchOption(Number(e.target.value));
        setSearchInput('');
        handleSearchConditionsChange({
            searchKeyword: '',
            searchAuthorName: ''
        });
    }


    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search triggered!');
        if(searchOption === searchConstants.KEYWORD){
            handleSearchConditionsChange({
                searchKeyword: searchInput,
                searchAuthorName: ''
            });
        } else {
            handleSearchConditionsChange({
                searchKeyword: '',
                searchAuthorName: searchInput
            });
        }
    };

    return (
        <div className="col-12">
            <form className="row g-2 align-items-center" onSubmit={handleSearch}>
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Search posts..." value={searchInput} onChange={handleInputChange} />
                </div>
                <div className="col-md-3">
                <select className="form-select" onChange={handleOptionChange} value={searchOption}>
                    <option value={searchConstants.KEYWORD}>By Keyword</option>
                    <option value={searchConstants.AUTHOR_NAME}>By Author Name</option>
                </select>
                </div>
                <div className="col-md-3">
                    <button type="submit" className="btn btn-success w-100">Search</button>
                </div>
            </form>

            <div className="mt-3 d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm" 
                    style={{ backgroundColor: activeFilters[0] ? 'grey': '', color: activeFilters[0] ? 'white': ''}} onClick={() => filterChange(0)}>Original</button>
                <button className="btn btn-outline-secondary btn-sm" 
                    style={{ backgroundColor: activeFilters[1] ? 'grey': '', color: activeFilters[1] ? 'white': '' }} onClick={() => filterChange(1)}>Reshared</button>
                <button className="btn btn-outline-secondary btn-sm" style={{ backgroundColor: activeFilters[2] ? 'grey': '',  color: activeFilters[2] ? 'white': ''}} onClick={() => filterChange(2)}>With Video</button>
            </div>
        </div>
    )
}