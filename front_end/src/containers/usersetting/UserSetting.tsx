import React, { Fragment } from 'react';
import SearchSelection from 'components/usersetting/SearchSelection';
import DropdownExampleSearchSelection from 'components/usersetting/DropdownExampleSearchSelection';
import CheckBox from '../../components/usersetting/CheckBox';

interface IProps {
    // { text: '', value: '' }
}
class UserSetting extends React.Component<any> {

    componentDidMount() {
        //this.props.changeDate(moment().add(1, 'month'))
    }
    render() {
        const { props } = this;
        const placeholder = '지역을 입력하세요.'
        const list = [{ key: 'afg', flag: 'af', value: 'a', text: 'Afghanistan' }, { key: 'af', value: 'af', flag: 'af', text: 'Aland Islands' }]
        return (
            <div>
                <SearchSelection placeholder={placeholder} optionlist={list}></SearchSelection>
                <div><CheckBox label={"오전"}></CheckBox></div>
                <div><CheckBox label={"오후"}></CheckBox></div>
            </div>
        )
    }
}

export default UserSetting 