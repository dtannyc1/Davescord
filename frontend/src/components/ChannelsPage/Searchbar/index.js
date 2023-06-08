import { useState } from 'react';
import './Searchbar.css'

const Searchbar = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="channels-searchbar">
            <input type="text"
                    placeholder='Find or start a conversation'
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}/>
        </div>
    )
}

export default Searchbar;
