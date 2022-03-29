import react from 'react'

const Modal = ({openModal, children, hiddenModal}) => {
   return (
      openModal && (
          <div className='modalBackground' onClick={hiddenModal}>
              <div className='modalContainer'>
                {children}
              </div>
          </div>
      )
    )
}

export default Modal