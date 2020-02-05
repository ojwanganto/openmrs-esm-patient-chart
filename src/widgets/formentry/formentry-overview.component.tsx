import React from "react";
import dayjs from "dayjs";
import SummaryCard from "../cards/summary-card.component";
import SummaryCardRow from "../cards/summary-card-row.component";
import SummaryCardRowContent from "../cards/summary-card-row-content.component";
import { match } from "react-router";
import { fetchPatientForms } from "./formentry.resource";
import { createErrorHandler } from "@openmrs/esm-error-handling";
import HorizontalLabelValue from "../cards/horizontal-label-value.component";
import { useCurrentPatient } from "@openmrs/esm-api";
import SummaryCardFooter from "../cards/summary-card-footer.component";
import { Trans, useTranslation } from "react-i18next";

export default function PatientFormsOverview(props: PatientFormProps) {
  const [patientForms, setPatientForms] = React.useState([]);
  const [
    isLoadingPatient,
    patient,
    patientUuid,
    patientErr
  ] = useCurrentPatient();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (patientUuid) {
      const forms = [];
      forms.push({
        uuid: "12345",
        html: "<html>",
        formName: "Test Form1",
        formDesc: "Testing forms component"
      });
      forms.push({
        uuid: "45678",
        html: "<html>",
        formName: "Test Form2",
        formDesc: "Testing forms component"
      });
      const subscription = fetchPatientForms(patientUuid).subscribe(
        pForms => setPatientForms(pForms),
        createErrorHandler()
      );

      console.log(patientForms);
      return () => subscription.unsubscribe();
    }
  }, [patientUuid]);

  return (
    <SummaryCard
      name={t("Patient Forms", "Patient Forms")}
      match={props.match}
      link={`/patient/${patientUuid}/chart/forms`}
      styles={{ margin: "1.25rem, 1.5rem" }}
    >
      <SummaryCardRow>
        <SummaryCardRowContent>
          <HorizontalLabelValue
            label={t("Active Forms", "Active Forms")}
            labelStyles={{
              color: "var(--omrs-color-ink-medium-contrast)",
              fontFamily: "Work Sans"
            }}
            value=""
            valueStyles={{
              color: "var(--omrs-color-ink-medium-contrast)",
              fontFamily: "Work Sans"
            }}
          />
        </SummaryCardRowContent>
      </SummaryCardRow>
      {patientForms &&
        patientForms.map(f => {
          let fResource = `${
            new URL(window.location.href).hostname
          }/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId=${patientUuid}&visitId=839c12f2-163e-4ccd-ba6f-97446898c60f&definitionUiResource=referenceapplication:htmlforms/simpleVisitNote.xml&returnUrl=/openmrs/coreapps/patientdashboard/patientDashboard.page/patientId=eb359f72-2b2c-4a08-a5b5-cac9361dc705%26c12f2-163e-4ccd-ba6f-97446898c60f&visitId=2385`;
          return (
            <SummaryCardRow key={f.uuid} linkTo={fResource}>
              <HorizontalLabelValue
                label={f.display}
                labelStyles={{ fontWeight: 500 }}
                value={f.formName}
                valueStyles={{ fontFamily: "Work Sans" }}
              />
            </SummaryCardRow>
          );
        })}
      <SummaryCardFooter linkTo={`/patient/${patientUuid}/chart/forms`} />
    </SummaryCard>
  );
}

type PatientFormProps = {
  match: match;
};
