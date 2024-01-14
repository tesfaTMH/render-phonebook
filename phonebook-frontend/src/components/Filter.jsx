export const Filter = ({newSearch, setNewSearch}) => {
    return(
      <div>
        <strong>Filter shown with</strong>: <input 
                            name="filtername"
                            type="text"
                            value={newSearch}
                            onChange={(event) => setNewSearch(event.target.value)}
                            placeholder="Type to search..."  
                          /> 
      </div>
    )
  }
  