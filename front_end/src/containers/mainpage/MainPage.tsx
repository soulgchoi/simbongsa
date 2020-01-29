import React, { Component } from "react";
import VolList from "./VolList";

interface Props {}
interface State {}

export default class MainPage extends Component<Props, State> {
    state = {}
    
    render() {
        return (
            <MainPage>
                <VolList />
            </MainPage>
        );
    }
}