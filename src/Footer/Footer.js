import React from 'react';
import {Link} from "react-router-dom";


class Footer extends React.Component{
    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <nav>
                        <ul className="footer-menu">
                            <li>
                                <a href="/#">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/#">
                                    Company
                                </a>
                            </li>
                            <li>
                                <a href="/#">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="/#">
                                    Blog
                                </a>
                            </li>
                        </ul>
                        <p className="copyright text-center">
                            ©
                            <script>
                                document.write(new Date().getFullYear())
                            </script>
                            <a href="https://www.linkedin.com/in/shafikte/" target="_blank" rel="noopener noreferrer">MSI Shafik</a>, made with love for a better web
                        </p>
                    </nav>
                </div>
            </footer>
        )
    }
}

export default Footer;