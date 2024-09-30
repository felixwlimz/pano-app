'use client'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from '.'
import { useStateContext } from '@/context/StateContext'

const Navbar = () => {

  const {showCart, setShowCart, totalQuantities } = useStateContext()

  return (
    <nav className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Pano Store</Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
       <AiOutlineShopping/>
       <span className='cart-item-qty'>1</span>
      </button>

      {showCart && <Cart/>}
    </nav>
  )
}

export default Navbar