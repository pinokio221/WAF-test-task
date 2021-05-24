import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import styles from './Content.module.css'


const options = [
    'Edit',
  ];


const ItemOptionsMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);};

    const handleClose = (option, data) => {
        if(option === 'Edit' && !props.editMode) {
            props.setEditMode(true)
            data.category = props.category;
            props.setItemData(data);
            props.setItemId(data.id);
            props.setEditedItem(data);
        }
        setAnchorEl(null);
    }
    return(
        <div className={styles.optionsMenu}>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="secondary"
                >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                style: {
                    width: '20ch',},}}>
                {options.map((option) => (
                <MenuItem key={option} onClick={() => {handleClose(option, props.data)}}>
                    {option}
                </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default ItemOptionsMenu;