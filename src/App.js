// feature-1
import React from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
class App extends React.Component {
  constructor(){
    super();
    this.state={
      products:data.products,
      CartItems:[],
      size:"",
      sort:"",
    };
  }

  removeFromCart=(product)=>{
    const CartItems=this.state.CartItems.slice();
    this.setState({
      CartItems: CartItems.filter((x)=>x._id!==product._id),
    });
  };
  addToCart=(product)=>{
    const CartItems=this.state.CartItems.slice();
    let alreadyInCart=false;
    CartItems.forEach((item)=>{
      if(item._id===product._id){
        item.count++;
        alreadyInCart=true;
      }
    });
    if(!alreadyInCart){
      CartItems.push({...product,count:1});
    }
    this.setState({CartItems});
  }
 sortProducts=(event)=>{
   //imple
 const sort=event.target.value;
 this.setState((state)=>({
   sort:sort,
   products : this.state.products
   .slice()
   .sort((a, b)=>
   sort==="lowest"
   ?a.price>b.price
   ? 1
   :-1
   :sort==="highest"
   ?a.price<b.price
   ? 1
   :-1
   :a._id>b._id
   ? 1
   :-1
    ),
 }));
 };
 filterProducts=(event)=>{
   //imple
   console.log(event.target.value);
   const size =event.target.value;
   if(event.target.value===""){
     this.setState({size:event.target.value,products:data.products});
   }else{
    this.setState({
      size:event.target.value,
      products:data.products.filter(
        (product)=>product.availableSizes.indexOf(size)>=0),
    });
   }
 }

  render(){
  return (
    <div className="grid-container">
     <header>
       <a href="/">React Shopping Cart</a>
     </header>
     <main>
      <div className="content">
        <div className="main">
          <Filter count={this.state.products.length}
          size={this.state.size}
          sort={this.state.sort}
          filterProducts={this.filterProducts}
          sortProducts={this.sortProducts}
          
          ></Filter>
          <Products products={this.state.products} addToCart={this.addToCart}></Products></div>
        <div className="sidebar"><Cart cartItems={this.state.CartItems} removeFromCart={this.removeFromCart}/></div>
      </div>

     </main>
     <footer>
       All right Is Reserved
     </footer>
    </div>
  );
}
}

export default App;
