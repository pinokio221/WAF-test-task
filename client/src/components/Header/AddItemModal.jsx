import React from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Header.module.css'
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { Field, reduxForm } from "redux-form"
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button';
import moment from 'moment'
import { validate, asyncValidate } from '../../validators/validate'
import { RenderTextField, RenderSelectField, RenderRadioButton, RenderDatePicker } from '../FormControls/Forms'


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: 'rgb(25, 24, 27)',
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));



const AddItemForm = (props) => {
    const { handleSubmit, pristine, reset, submitting} = props
    return(
        <div>
            <center><h3 className={styles.modalTitle}>Add new item</h3></center>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
                <div className={styles.titleField}>
                    <Field name="title" component={RenderTextField} label="Show or Movie Title"/>
                </div>
                <div className={styles.typeField}>
                    <Field name="category" component={RenderRadioButton}>
                        <Radio value="show" label="show"/>
                        <Radio value="movie" label="movie"/>
                    </Field>
                </div>
                <div>
                    <Field name="year" component={RenderDatePicker} label='year'/>
                </div>
                <div className={styles.genreField}>
                    <Field name="genre" component={RenderSelectField} label="Genre">
                        <option value={'Action'}>Action</option>
                        <option value={'Drama'}>Drama</option>
                        <option value={'Horror'}>Horror</option>
                    </Field>
                </div>
                <div>
                    <Field name="rating" className={styles.ratingField} component={RenderTextField} label="Rating" type="number"/>
                    <Field name="image" component={RenderTextField} label="Image Link"/>
                </div>
                <div>
                    <Field name="link" component={RenderTextField} label="Watch online Link"/>
                </div>
                <div className={styles.modalButtons}>
                    <Button variant="contained" onClick={props.handleClose}>CANCEL</Button>
                    <Button className={styles.modalBtn} variant="contained" disabled={pristine || submitting} color="secondary" type='submit'>ADD ITEM</Button>
                </div>
            </form>
        </div>
    )
}

const ReduxAddItemForm = reduxForm({
    form: "newItem",
    validate,
    asyncValidate
})(AddItemForm);

const AddItemModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
      };

    const handleSubmit = (formData) => {
        const formatYear = moment(formData.year).format('YYYY');
        formData.year = formatYear
        props.addItem(formData);
        handleClose();
    }
    return(
        <div>
            <button onClick={handleOpen} className={styles.add_btn}>Add show or movie</button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <ReduxAddItemForm onSubmit={handleSubmit} handleClose={handleClose}/>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
    
}




export default AddItemModal;