import React, { useState } from "react";
import CountriesData from "../../config/countries.json";
import StateData from "../../config/states.json";
import CitiesData from "../../config/cities.json";
import { TextField } from "../Input/TextField";
import SelectField from "../Input/SelectField";
function BackgroundInfoForm(props) {
  const {
    formField: {
      skillLevel,
      experience,
      document,
      coachingCity,
      coachingState,
      coachingCountry,
      coachingPinCode,
      coachingStreet,
    },
    setFile,
  } = props;

  const [Country, setCountry] = useState(props.values[coachingCountry.name]);
  const [State, setState] = useState(props.values[coachingState.name]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 ">
        <SelectField
          name={skillLevel.name}
          label={skillLevel.label}
          onChange={(e) => {
            props.setFieldValue(skillLevel.name, e.target.value);
          }}
        >
          <option value="">Select an level</option>
          {skillLevel.value.map((value, index) => (
            <option value={value.value} key={index}>
              {value.name}
            </option>
          ))}
        </SelectField>
        <SelectField
          value={props.values[coachingCountry.name]}
          onChange={(e) => {
            setCountry(e.target.value);
            console.log(e.target.value);
            props.setFieldValue(coachingCountry.name, e.target.value);
          }}
          name={coachingCountry.name}
          label={coachingCountry.label}
        >
          <>
            <option value="">Select an Country</option>
            {CountriesData.map((country, index) => (
              <option value={country.name} key={index}>
                {country.name}
              </option>
            ))}
          </>
        </SelectField>
        {/* //State */}
        <SelectField
          value={props.values[coachingState.name]}
          onChange={(e) => {
            setState(e.target.value);
            props.setFieldValue(coachingState.name, e.target.value);
          }}
          name={coachingState.name}
          label={coachingState.label}
        >
          <option value="">Select an State</option>
          {StateData.filter((obj) => obj.country_name === Country).map(
            (state, index) => (
              <option value={state.name} key={index}>
                {state.name}
              </option>
            )
          )}
        </SelectField>
        <SelectField
          value={props.values[coachingCity.name]}
          name={coachingCity.name}
          label={coachingCity.label}
          onChange={(e) => {
            props.setFieldValue(coachingCity.name, e.target.value);
          }}
        >
          <option value="">Select an City</option>
          {CitiesData.filter((obj) => obj.state_name === State).map(
            (city, index) => (
              <option value={city.name} key={index}>
                {city.name}
              </option>
            )
          )}
        </SelectField>
        <TextField
          name={coachingPinCode.name}
          label={coachingPinCode.label}
          placeholder={coachingPinCode.placeholder}
          htmlType="number"
        />
        <TextField
          name={coachingStreet.name}
          label={coachingStreet.label}
          placeholder={coachingStreet.placeholder}
        />
        <TextField
          name={experience.name}
          label={experience.label}
          placeholder={experience.placeholder}
          htmlType="number"
        />{" "}
        <TextField
          name={document.name}
          label={document.label}
          placeholder={document.placeholder}
          htmlType="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
}

export default BackgroundInfoForm;
