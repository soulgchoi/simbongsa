import React from 'react';
import './Calendar.scss';

function Calendar() {
    return (
        <div className="Calendar">
            <div className="head">
                <span className="title">December 2016</span>
            </div>
            <div className="body">
                <div className="row">
                    <div className="box">
                        <span className="text">SUN</span>
                    </div>
                    <div className="box">
                        <span className="text">MON</span>
                    </div>
                    <div className="box">
                        <span className="text">TUE</span>
                    </div>
                    <div className="box">
                        <span className="text">WED</span>
                    </div>
                    <div className="box">
                        <span className="text">THU</span>
                    </div>
                    <div className="box">
                        <span className="text">FRI</span>
                    </div>
                    <div className="box">
                        <span className="text">SAT</span>
                    </div>
                </div>

                <div className="row">
                    <div className="box grayed">
                        <span className="text">28</span>
                    </div>
                    <div className="box grayed">
                        <span className="text">29</span>
                    </div>
                    <div className="box grayed">
                        <span className="text">30</span>
                    </div>
                    <div className="box selected">
                        <span className="text">1</span>
                    </div>
                    <div className="box">
                        <span className="text">2</span>
                    </div>
                    <div className="box">
                        <span className="text">3</span>
                    </div>
                    <div className="box">
                        <span className="text">4</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Calendar;