import React from 'react';
import PostingList from './PostingList';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

class Postings extends React.Component{
    render() {
        return (
            <div>
                <div>
                    <PostingList />
                </div>
                <div>
                    <CommentForm />
                </div>
                <div>
                    {/* <CommentList /> */}
                </div>
            </div>
        )
    }
}

export default Postings;