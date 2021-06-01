import { React, useState } from "react";
import styles from "./Content.module.css";
import ItemOptionsMenu from "./ItemOptionsMenu";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  RenderDatePicker,
  RenderTextField,
  RenderSelectField,
} from "../FormControls/Forms";
import { Field, reduxForm } from "redux-form";
import { validate, asyncValidate } from "../../validators/validate";
import moment from "moment";
import { connect } from "react-redux";
import { RiMovieLine } from "react-icons/ri";

let EditModeForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const removeItem = (id, category) => {
    props.removeItem(id, category);
    props.setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.editCard}>
        <div className={styles.cardHeader}>
          <span className={styles.itemTitle}>
            <div className={styles.editTitleField}>
              <Field
                type="text"
                name="title"
                component={RenderTextField}
                label="Show or Movie title"
              />
            </div>
          </span>
        </div>
        <div className={styles.editImageField}>
          <Field name="image" component={RenderTextField} label="Image link" />
        </div>
        <div className={styles.editYearField}>
          <Field name="year" component={RenderDatePicker} label="year" />
        </div>
        <div className={styles.editGenreField}>
          <Field name="genre" component={RenderSelectField}>
            <option value={"Action"}>Action</option>
            <option value={"Drama"}>Drama</option>
            <option value={"Horror"}>Horror</option>
            <option value={"Comedy"}>Comedy</option>
            <option value={"Fantasy"}>Fantasy</option>
            <option value={"Mystery"}>Mystery</option>
            <option value={"Thriller"}>Thriller</option>
            <option value={"Western"}>Western</option>
            <option value={"Adventures"}>Adventures</option>
          </Field>
        </div>
        <div>
          <Field
            type="number"
            name="rating"
            component={RenderTextField}
            label="Rating"
          />
        </div>
        <div className={styles.editLinkField}>
          <Field
            type="link"
            name="link"
            component={RenderTextField}
            label="Watch online link"
          />
        </div>
        <div className={styles.editModeButtons}>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              removeItem(props.itemData.id, "show");
            }}
            className={styles.modalBtn}
          >
            DELETE
          </Button>
          <Button
            className={styles.editBtn}
            size="small"
            color="primary"
            variant="contained"
            type="submit"
          >
            UPDATE ITEM
          </Button>
        </div>
      </div>
    </form>
  );
};

EditModeForm = reduxForm({
  form: "showEdit",
  validate,
  asyncValidate,
  enableReinitialize: true,
})(EditModeForm);

EditModeForm = connect((state) => ({
  initialValues: state.content.editedItem,
}))(EditModeForm);

const Shows = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [itemId, setItemId] = useState(null);

  const submitEditMode = (data) => {
    if (editMode) {
      setEditMode(false);
      const formatYear = moment(data.year).format("YYYY");
      data.year = formatYear.toString();
      data.category = "show";
      data.id = itemId;
      setItemData(data);
      props.updateItem(data);
    } else {
      setEditMode(true);
    }
  };

  let shows = props.showsList.map((s) => (
    <div>
      {editMode && itemData.id == s.id ? (
        <EditModeForm
          itemData={itemData}
          onSubmit={submitEditMode}
          removeItem={props.removeItem}
          setEditMode={setEditMode}
        />
      ) : (
        <div className={styles.contentCard}>
          <div className={styles.cardHeader}>
            <span className={styles.itemTitle}>{s.title}</span>
            <ItemOptionsMenu
              editMode={editMode}
              setEditMode={setEditMode}
              setEditedItem={props.setEditedItem}
              setItemId={setItemId}
              setItemData={setItemData}
              category={"show"}
              data={s}
            />
          </div>
          <img className={styles.contentPhoto} src={s.image} />
          <span>Year: {s.year}</span>
          <span>Genre: {s.genre}</span>
          <span>Rating: {s.rating}</span>
          <div className={styles.watchBlock}>
            <a href={s.link} target="_blank">
              WATCH ONLINE <RiMovieLine />
            </a>
          </div>
        </div>
      )}
    </div>
  ));
  return (
    <div>
      <div className={styles.typeText}>TV SHOWS</div>
      <div className={styles.content_wrapper}>{shows}</div>
    </div>
  );
};

export default Shows;
