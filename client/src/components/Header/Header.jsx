import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom';
import AddItemModal from './AddItemModal'
import { addItem } from '../../redux/reducers'
import { connect } from 'react-redux';


class Header extends React.Component {
    addItem = (data) => {
        this.props.addItem(data);
    }
    render() {
        return(
            <div>
                <div className={styles.wrapper}>
                    <div className={styles.header_block}>
                        <img className={styles.logo} src='https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png'/>
                        <div className={styles.buttons_block}>
                            <div>
                                <NavLink to = '/' activeClassName={styles.activeLink}><button className = {styles.btn}>Home</button></NavLink>
                                <NavLink to = '/tv-shows' activeClassName={styles.activeLink}><button className = {styles.btn}>Shows</button></NavLink>
                                <NavLink to = '/movies' activeClassName={styles.activeLink}><button className = {styles.btn}>Movies</button></NavLink>
                                <NavLink to = '/settings' activeClassName={styles.activeLink}><button className = {styles.btn}>Settings</button></NavLink>
                                <NavLink to = '/' activeClassName={styles.activeLink}><button className = {styles.btn}>Logout</button></NavLink>
                            </div>
                        </div>
                    </div>
                    <AddItemModal addItem={this.addItem}/>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return null;
}

export default connect(mapStateToProps, { addItem })(Header);