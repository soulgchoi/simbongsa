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
        const list = [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }, { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' }]
        return (
            <Fragment>
                <SearchSelection placeholder={placeholder} optionlist={list}></SearchSelection>
                <div><CheckBox label={"안녕하세요"}></CheckBox></div>
            </Fragment>
        )
    }
}

export default UserSetting 