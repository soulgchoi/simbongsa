import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

interface Props {
    post: {
        p_id: 0,
        p_content: "",
        v_id: 0,
        m_id: 0,
        p_status: 0,
        files?: []
    };
}

class CardComponent extends React.Component<Props, {}>{
    render() {
        return (
            <Card>
                {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
                <Card.Content>
                <Card.Description>
                    {this.props.post.p_content}
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    
                </Card.Content>
            </Card>
        )
    }
}

export default CardComponent;