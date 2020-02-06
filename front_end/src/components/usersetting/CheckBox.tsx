import React from 'react'
import { Checkbox } from 'semantic-ui-react'

interface IProps {
    label: string
}




const CheckBox = ({ label }: IProps) => (
    <Checkbox label={label} />
)

export default CheckBox