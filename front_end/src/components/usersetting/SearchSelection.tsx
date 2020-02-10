import React, { ReactElement } from 'react'
import { Dropdown, DropdownItemProps } from 'semantic-ui-react'
interface IProps {
    placeholder: string
    optionlist: DropdownItemProps[]
}

const SearchSelection = ({ placeholder, optionlist }: IProps): ReactElement => {

    return (
        <Dropdown
            placeholder={placeholder}
            fluid
            search
            selection
            options={optionlist}
        />
    )
}

export default SearchSelection