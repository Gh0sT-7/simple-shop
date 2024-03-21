import Header from './components/Header/Header.jsx';
import Shop from './components/Shop/Shop.jsx';
import Product from './components/Shop/Product.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import CartContextProvider from './store/shopping-cart-context.jsx';


function App() {

    return (
        <CartContextProvider>
            <Header />

            <Shop>
                {DUMMY_PRODUCTS.map((product) => (
                    <li key={product.id}>
                        <Product {...product} />
                    </li>
                ))}
            </Shop>
        </CartContextProvider>
    );
}

export default App;

