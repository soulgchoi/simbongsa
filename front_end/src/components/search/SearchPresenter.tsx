import React, { Fragment } from 'react';
import styled from "styled-components"
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import SearchInput from 'components/input/SearchInput'
import ActionButton from 'components/button/ActionButton'
const Container = styled.div`
    padding:0px 20px;
`;

const Form = styled.form`
    margin-bottom: 50px;
    width:100%;
`;
// const Input = styled.input`

//     all: unset;
//     font-size: 18px;
//     width:100%;
// `;
// const Button = styled.button`
//     color:red;
// `
interface Iprops {
    volResults: any,
    input: string,
    loading: boolean,
    error: any,
    handleSubmit: any,
    updateTerm: any
}

const SearchPresenter = ({ volResults, input, loading, error, handleSubmit, updateTerm }: Iprops) => <Fragment>
    <Form onSubmit={handleSubmit} >
        <SearchInput id="search" type="text" placeholder="지역 또는 봉사를 입력하세요." value={input} onChange={updateTerm} nametag="지역 / 봉사"></SearchInput>

    </Form>

    {loading ? <Loader
        type="TailSpin"
        color="#FFA263"
        height={50}
        width={50}
        timeout={1000} //1 secs

    /> : <>
            {volResults && volResults.length > 0}
            <Loader
                type="TailSpin"
                color="#FFA263"
                height={50}
                width={50}
                timeout={1000} //1 secs

            />
        </>}
</Fragment>

export default SearchPresenter;