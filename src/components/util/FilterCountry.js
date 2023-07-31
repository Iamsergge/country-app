import React from 'react';
 const FilterCountry = ()=> {
    const selectHandler = (e) => {
        const regionName = e.target.value;
        onselect(regionName)
    }
    
    return (
        <select onChange={selectHandler}>
         <option></option>
         <option className='option'>Filter by Region</option> 
         <option className='option' value="Africa">Africa</option> 
         <option className='option' value="America">America</option> 
         <option className='option' value="Asia">Asia</option> 
         <option className='option' value="Europe">Europe</option> 
         <option className='option' value="Ocenia">Ocenia</option>    
        </select>


    )
 }
    export default FilterCountry;