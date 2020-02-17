import React from 'react'
import { Button, Header, Image, Modal, Label } from 'semantic-ui-react'
import ImageCarousel from './ImageCarousel'

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
        return (
            <div>
                <Modal trigger={<Button>상세보기</Button>}>
                    <Modal.Header>
                        m_name 자리
                    </Modal.Header>
                    <Modal.Content>
                    {this.props.post.files.length > 0 ?
                        (<ImageCarousel files={this.props.post.files} />)
                    : ( <Image>
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
