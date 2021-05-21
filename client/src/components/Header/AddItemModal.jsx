import React from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Header.module.css'
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { Field, reduxForm } from "redux-form"
import TextField from '@material-ui/core/TextField'
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button';
import moment from 'moment'


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

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

const RenderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <ThemeProvider theme={theme}>
        <TextField 
        variant="outlined" 
        label={label} 
        placeholder={label} 
        error={touched && invalid} 
        size="small" 
        helperText={touched && error}
        {...input}
        {...custom}
         />
    </ThemeProvider>
)


const RenderSelectField = ({label, input, meta: { touched, invalid, error }, ...custom}) => {
    return (
        <div>
            <ThemeProvider theme={theme}>
            <FormControl error={touched && error}>
            <InputLabel htmlFor="age-native-simple">Genre</InputLabel>
            <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: 'age',
                id: 'age-native-simple'
            }}
            />
            </FormControl>
            </ThemeProvider>
        </div>
    )

}

const RenderRadioButton = ({ input, ...rest }) => (
    <ThemeProvider theme={theme}>
        <FormControl>
            <RadioGroup {...input} {...rest}>
                <FormControlLabel value="show" control={<Radio />} label="Show" />
                <FormControlLabel value="movie" control={<Radio />} label="Movie" />
            </RadioGroup>
        </FormControl>
    </ThemeProvider>
  )

const RenderDatePicker = ({ input: { onChange, value }, meta: {touched, invalid, error} }) => {
    return (
        <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
            onChange={onChange}
            error={touched && invalid}
            helperText={touched && error}
            value={value}
            disableFuture
            label='Release date'
            views={["year"]}/>
        </MuiPickersUtilsProvider>
    </ThemeProvider>
    )
    
}

const AddItemForm = (props) => {
    const { handleSubmit, pristine, reset, submitting} = props
    return(
        <div>
            <h3>Add new item</h3>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
                <div className={styles.titleField}>
                    <Field name="title" component={RenderTextField} label="Show or Movie Title"/>
                </div>
                <div className={styles.typeField}>
                    <Field name="type" component={RenderRadioButton}>
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
                    <Field name="rating" component={RenderTextField} label="Rating"/>
                </div>
                <div>
                    <Field name="image" component={RenderTextField} label="Image Link"/>
                </div>
                <div>
                    <Field name="link" component={RenderTextField} label="Watch online Link"/>
                </div>
                <div className={styles.modalButtons}>
                    <Button variant="contained" className={styles.modalBtn}>CANCEL</Button>
                    <Button variant="contained" color="secondary" type='submit'>ADD ITEM</Button>
                </div>
            </form>
        </div>
    )
}

const ReduxAddItemForm = reduxForm({
    form: "newItem"
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
                        <ReduxAddItemForm onSubmit={handleSubmit}/>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
    
}




export default AddItemModal;