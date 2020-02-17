import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ModalModalExample = () => (
  <Modal trigger={<Button>게시글 클릭하면, 아래 모달이 뜸</Button>}>
    <Modal.Header>봉사활동 이름</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='이미지들, 캐러셀' />
      <Modal.Description>
        <p>
          포스팅 내용
        </p>
        <p>현재 모집인원</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ModalModalExample
