import React from 'react'

interface Props {
    weekday: any;
}

class VolWeekday extends React.Component<Props, {}>{
    state= {
        weekday: this.props.weekday.toString()
    }
    render() {
        return (
            <div>
                <p>월 </p>
                <p>화 </p>
                <p>수 </p>
                <p>목 </p>
                <p>금 </p>
                <p>토 </p>
                <p>일 </p>
            </div>
        )
    }
}

export default VolWeekday