import * as React from 'react';
import {Grid} from "@mui/material";
import Controls from "../../Controls";
import {CustomForm} from "../../Controls/CustomForm";


export function GenericForm({inputs, submitButtonLabel, onSubmit, component}) {
  return (
    <CustomForm onSubmit={onSubmit}>
        <Grid container direction={'column'} rowGap={2}>
          {inputs.map((input, key) => <Controls.CustomInput key={key} {...input}/>)}
          {component || <span/>}
          <Controls.CustomButton type={'submit'}>
            {submitButtonLabel}
          </Controls.CustomButton>
        </Grid>
      </CustomForm>
  );
};
