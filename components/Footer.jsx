import { AiFillInstagram, AiOutlineLinkedin } from "react-icons/ai"

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>2024 Pano Store. All Rights reserved</p>
      <p className="icons">
        <AiFillInstagram/>
        <AiOutlineLinkedin/>
      </p>
    </footer>
  )
}

export default Footer