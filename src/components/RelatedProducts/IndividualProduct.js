/* eslint-disable */
import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx'
import Modal from './Modal.js';
import {
  faStar,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


//IndividualRelatedProduct should display category, picture, name, price, rating of related products
//number of related products is fixed for each product.
//onClick, it should leads to product detail page of click target

class IndividualProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    // console.log('props at individualcard', this.props);

    return (
      <div className="content">
        <img className='relatedImage' src={this.props.curCard.picUrl} onClick={() => { this.props.handleChang(this.props.curCard) }}></img>
        <h2 className='relatedCategory'>{this.props.curCard.data.category}</h2>
        <div className='relatedName' onClick={() => { this.props.handleChang(this.props.curCard) }}>{this.props.curCard.data.name}</div>
        <div className='relatedPrice'>${this.props.curCard.data.default_price}</div>
        <div className='relatedRating'>rating will go here</div>
        <br></br>
        <Modal
          show={this.state.show}
          handleClose={this.hideModal}
          curProduct={this.props.curProduct}
          curCard={this.props.curCard}
        >
          <p>{this.props.curCard.data}</p>
        </Modal>

        {/* <button type="button" className="relatedButton" onClick={this.showModal}>
          <img src='http://imgur.com/I0EwG.png' />
        </button> */}
        <FontAwesomeIcon
          icon={faStar}
          onClick={this.showModal}
          className="relatedButton"
        />
      </div>
    )
  }
}

export default IndividualProduct;