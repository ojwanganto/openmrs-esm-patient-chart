import { openmrsObservableFetch } from "@openmrs/esm-api";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

export function fetchPatientForms(
  patientID: string
): Observable<PatientForm[]> {
  return openmrsObservableFetch(`/ws/rest/v1/form`).pipe(
    map(({ data }) => data["results"]),
    take(5)
  );
}

type PatientForm = {
  uuid: String;
  display: String;
  links: [];
};
