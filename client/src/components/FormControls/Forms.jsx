import React from "react";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export const RenderDatePicker = ({
  input: { onChange, value, setValue },
  meta: { touched, invalid, error },
}) => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            onChange={onChange}
            error={touched && invalid}
            helperText={touched && error}
            disableFuture
            defaultValue={value+'-01-01'}
            value={value+'-01-01'}
            label="Release date"
            views={["year"]}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
};

export const RenderTextField = ({
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
);

export const RenderSelectField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
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
              name: "age",
              id: "age-native-simple",
            }}
          />
        </FormControl>
      </ThemeProvider>
    </div>
  );
};

export const RenderRadioButton = ({ input, ...rest }) => (
  <ThemeProvider theme={theme}>
    <FormControl>
      <RadioGroup {...input} {...rest}>
        <FormControlLabel value="show" control={<Radio />} label="Show" />
        <FormControlLabel value="movie" control={<Radio />} label="Movie" />
      </RadioGroup>
    </FormControl>
  </ThemeProvider>
);
