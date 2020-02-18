import React from 'react'
import { Button, Header, Image, Modal, Label, Icon } from 'semantic-ui-react'
import ImageCarousel from './ImageCarousel'
import Carousel from 'nuka-carousel'

import './Carousel.css'

interface Props {
    post: {
        p_id: 0,
        p_content: "",
        v_id: 0,
        m_id: 0,
        p_status: 0,
        files: []
    };
}


class PostDetail extends React.Component<Props, {}> {
    render() {
        // if (this.props.post.files) {
            const images = this.props.post.files.map( (file) => {
                console.log(file)
                return (
                    <img src={"http://i02a205.p.ssafy.io:8080/A205/uploads/" + file} />
                )
        })
        return (
            <div>
                <Modal trigger={<Button icon="list"></Button>}>
                    <Modal.Header>
                        m_name 자리
                    </Modal.Header>
                    <Modal.Content>
                    {/* {this.props.post.files.length > 0 ?
                        (<ImageCarousel files={this.props.post.files} />)
                    : ( )
                    } */}
                    {this.props.post.files.length > 0 ?
                        (<Carousel>
                            {images}
                        </Carousel>)
                        : (<Image>
                        <Label content='No Image' icon='warning' />
                    </Image>)
                    }
                        <Modal.Description>{this.props.post.p_content}</Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button className="ui orange">
                        참가
                    </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default PostDetail
