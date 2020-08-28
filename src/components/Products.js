import React, { Component } from 'react';
import formatcurrency from '../Util';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class Products extends Component {
    constructor(props){
     super(props);
     this.state={
         product: null,
     }
    }
    openModal=(product)=>{
      this.setState({product});
    };
    closeModal=(product)=>{
     this.setState({product:null}); 
    }
    render() {
        const {product}= this.state;
        return (
            <div>
            <Fade bottom>
            <ul className="products">
                {this.props.products.map(product=>(
                  <li key={product._id}>
                      <div className="product" onClick={()=>this.openModal(product)}>
                        <a href={"#"+ product._id}>
                          <img src={product.image} alt={product.title}></img>
                          <p>
                              {product.title}
                          </p>
                        </a>
                    <div className="product-price">
                        <div>
                            { formatcurrency(product.price)}
                        </div>
                    <button onClick={()=>this.props.addToCart(product)} className="button">Add To Cart</button>
                    </div>
                      </div>
                  </li>  
                ))}
            </ul>
            </Fade> 
            {product &&(
                <Modal isOpen={true} onRequestClose={this.closeModal}>
                    <Zoom>
                        <button className="close-modal" onClick={this.closeModal}>x</button>
                        <div className="product-details">
                           <img src={product.image} alt={product.title}></img>
                           <div className="product-details-description">
                         <p>
            <strong>{product.title}</strong>
                         </p>
                         <p>
                             {product.description}
                         </p>
                         <p> Available Size: {" "}
                             {product.availableSizes.map(x=>(
                                 <span>{" "} <button className="button">{x}</button></span>
                             ))}
                         </p>
                         <div className="product-price">
                         <div>
                             {formatcurrency(product.price)}
                         </div>
                         <button className="button primary" onClick={()=>{
                             this.props.addToCart(product);
                             this.closeModal();
                         }}>
                             Add to Cart
                         </button>
                         </div>
                           </div>
                        </div>
                    </Zoom>

                </Modal>
            )}  
            </div>
        )
    }
}
