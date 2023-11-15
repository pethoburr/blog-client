import '../App.css'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../App'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Bottom = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const { token } = useContext(AuthContext)

    useEffect(() => {
        if (token) {
            setLoggedIn(true)
        }
    },[])

    return(
        <>
            <div className='bottomContainer'>
                <div className="apex">
                    <h5 className='x'>Apex Predators</h5>
                    <p className='copyright'>&copy; 2023 Maninder Pahal</p>
                </div>
                <div className='others'>
                    <div className='follow'>Follow us <FacebookIcon sx={{ "&:hover": { color: 'lightgreen' }, fontSize: '2.5rem'}} /><InstagramIcon sx={{ "&:hover": { color: 'lightgreen' }, fontSize: '2.5rem'}} /><LinkedInIcon sx={{ "&:hover": { color: 'lightgreen' }, fontSize: '2.5rem'}} /><TwitterIcon sx={{ "&:hover": { color: 'lightgreen' }, fontSize: '2.5rem'}} /><GitHubIcon sx={{ "&:hover": { color: 'lightgreen' }, fontSize: '2.5rem'}} /><PinterestIcon sx={{ "&:hover": { color: 'lightgreen' }, fontSize: '2.5rem'}} /><YouTubeIcon sx={{ "&:hover": { color: 'lightgreen' }, fontSize: '2.5rem'}} /></div>
                    <ul className='company'>
                        <h6>Company</h6>
                        <li className='btm'>Subscribe</li>
                        <li className='btm'>About Us</li>
                        <li className='btm'>Accessibility</li>
                        <li className='btm'>Advertise</li>
                        <li className='btm'>Shop</li>
                        <li className='btm'>Events</li>
                        <li className='btm'>Careers</li>
                        <li className='btm'>Contact Us</li>
                    </ul>
                    <ul className='legal'>
                        <h6>Legal</h6>
                        <li className='btm'>Privacy Policy</li>
                        <li className='btm'>Terms of Use</li>
                        <li className='btm'>Ad Choices</li>
                        <li className='btm'>Reprints & Permissions</li>
                    </ul>
                    <ul className='sitemap'>
                        <h6>Sitemap</h6>
                        { loggedIn ? <><Link to='/posts' className='btmLinks'>Posts</Link><Link to='/topics' className='btmLinks'>Topics</Link><Link to='/home' className='btmLinks'>Home</Link></> : <><Link to='/log-in' className='btmLinks'>Log In</Link><Link to='/sign-up' className='btmLinks'>Sign Up</Link></> }
                    </ul>
                </div>  
            </div>
        </>
    )
}

export default Bottom