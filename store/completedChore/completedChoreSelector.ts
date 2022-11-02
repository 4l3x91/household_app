import {
  firstDayOfTheYear,
  getFirstDayPreviousMonth,
  getLastDayPreviousMonth,
  getLastWeeksMondayDate,
  getLastWeeksSundayDate,
  getPreviousMonday,
} from "../../utils/utils";
import { AppState } from "../store";

export const selectCompletedChores = (state: AppState) => state.completedChores;

export const selectCompletedChoresPreviousWeek = (state: AppState) =>
  state.completedChores.completedChores.filter(
    (x) =>
      x.date.toLocaleDateString() >= getLastWeeksMondayDate().toLocaleDateString() &&
      x.date.toLocaleDateString() <= getLastWeeksSundayDate().toLocaleDateString()
  );

export const selectCompletedChoresThisYear = (state: AppState) =>
  state.completedChores.completedChores.filter((x) => x.date.toLocaleDateString() >= firstDayOfTheYear.toLocaleDateString());

export const selectCompletedChoresLastMonth = (state: AppState) =>
  state.completedChores.completedChores.filter(
    (x) =>
      x.date.toLocaleDateString() >= getFirstDayPreviousMonth().toLocaleDateString() &&
      x.date.toLocaleDateString() <= getLastDayPreviousMonth().toLocaleDateString()
  );

export const selectCompletedChoresSinceLastMonday = (state: AppState) =>
  state.completedChores.completedChores.filter((x) => x.date.toLocaleDateString() >= getPreviousMonday().toLocaleDateString());
